const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
	user: 'hwio2023',
	host: 'db4free.net',
	port: '3306',
	password: 'qwertyuiop',
	database: 'serwis_reparex',
	multipleStatements: true,
});

app.post('/login', (req, res) => {
	const { username, password } = req.body;

	const query = `SELECT * FROM tbl_users 
	WHERE login = ? AND password = md5(?);`;

	db.query(query, [username, password], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			if (result.length > 0) {
				const data = result[0];

				res.send({
					info: true,
					username: data.login,
					type: data.id_employee_type,
					employee: data.id_employee,
				});
			} else {
				res.send({ info: false });
			}
		}
	});
});

app.get('/repairs', (req, res) => {
	const query = `SELECT id_repair, t.name, u.login, d.name, CONCAT(c.name," ",c.surname) AS "customer_name", status FROM tbl_repairs s
	inner join tbl_users u on u.id_employee = s.id_employee
	inner join tbl_devices d on s.id_device = d.id_device
	inner join tbl_device_type t on d.id_device_type = t.id_device_type
	inner join tbl_customers c on c.id_customer = s.id_customer;`;

	db.query(query, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.get('/repairs/:id', (req, res) => {
	const id = req.params.id;
	const query = `SELECT id_repair,d.name,dt.name AS "type",p.producer,d.serial_number,
	r.description,r.repair_date,r.price,r.comment,CONCAT(c.name," ",c.surname) AS "name_and_surname",u.login AS "worker",r.status, r.id_employee, r.id_customer, d.id_producer, r.id_device, d.id_device_type, r.end_repair_date FROM tbl_repairs r 
	INNER JOIN tbl_devices d ON d.id_device = r.id_device
	INNER JOIN tbl_device_type dt ON dt.id_device_type = d.id_device_type
	INNER JOIN tbl_producers p ON p.id_producers = d.id_producer
	INNER JOIN tbl_users u ON u.id_employee = r.id_employee
	INNER JOIN tbl_customers c ON c.id_customer = r.id_customer WHERE id_repair = ${id};`;

	db.query(query, (err, result) => {
		if (err) console.error(err);
		else res.send(result);
	});
});

app.post('/repairs', (req, res) => {
	const idDeviceType = +req.body.id_device_type;
	const idProducer = +req.body.id_producer;
	const idCustomer = +req.body.id_customer;

	const {
		name,
		serial_number,
		description,
		repair_date,
		price,
		comment,
		idEmployee,
	} = req.body;

	const query = `START TRANSACTION; INSERT INTO serwis_reparex.tbl_devices(id_device_type, name, id_producer, serial_number) VALUES(?, ?, ?, ?); SET @DeviceId = (SELECT LAST_INSERT_ID()); SET @CustomerId = (SELECT id_customer FROM tbl_customers WHERE id_customer = ?); SET @EmployeeId = (SELECT id_employee FROM tbl_employees WHERE id_employee = ?); INSERT INTO serwis_reparex.tbl_repairs (id_device, id_employee, id_customer, description, repair_date, end_repair_date, price, comment, status) VALUES (@DeviceId, @EmployeeId, @CustomerId, ?, ?, NULL, ?, ?, 'przyjęty'); COMMIT;`;

	db.query(
		query,
		[
			idDeviceType,
			name,
			idProducer,
			serial_number,
			idCustomer,
			idEmployee,
			description,
			new Date(repair_date).toJSON().slice(0, 19).replace('T', ' '),
			parseFloat(price).toFixed(2),
			comment,
		],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

app.put('/repairs/:id', (req, res) => {
	const id = req.params.id;
	const idDeviceType = +req.body.id_device_type;
	const idProducer = +req.body.id_producer;
	const idCustomer = +req.body.id_customer;

	const {
		name,
		serial_number,
		description,
		repair_date,
		end_repair_date,
		price,
		comment,
		status,
	} = req.body;

	const query = `START TRANSACTION; UPDATE tbl_devices SET id_device_type=?, name=?, id_producer=?, serial_number=? WHERE id_device = (SELECT id_device FROM tbl_repairs WHERE id_repair = ${id}); UPDATE tbl_repairs SET id_customer = ?, id_employee = 1, description = ?, repair_date = ?, end_repair_date = ?, price = ?, comment = ?, status = ? WHERE id_repair = ${id}; COMMIT;`;

	db.query(
		query,
		[
			idDeviceType,
			name,
			idProducer,
			serial_number,
			idCustomer,
			description,
			new Date(repair_date).toJSON().slice(0, 19).replace('T', ' '),
			new Date(end_repair_date).toJSON().slice(0, 19).replace('T', ' '),
			parseFloat(price).toFixed(2),
			comment,
			status,
		],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

app.delete('/repairs/:id', (req, res) => {
	const id = req.params.id;
	const query = `DELETE FROM tbl_repairs WHERE id_repair = ${id};`;

	db.query(query, (err, result) => {
		if (err) console.error(err);
		else res.send(result);
	});
});

app.get('/customers', (req, res) => {
	const query = `SELECT id_customer, name, surname, personal_id_number,phone_number,email,street,city,post_code,g.symbol,r.region
	FROM tbl_customers c
	inner join tbl_genders g on g.id_gender = c.id_gender
	inner join tbl_region r on r.id_region = c.id_region `;

	db.query(query, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.get('/customers-base', (req, res) => {
	const query = `SELECT id_customer, name, surname FROM tbl_customers`;

	db.query(query, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.get('/customers/:id', (req, res) => {
	const id = req.params.id;
	const query = `SELECT id_customer, name, surname, personal_id_number,phone_number,email,street,city,post_code,g.gender,r.region, g.id_gender, r.id_region
	FROM tbl_customers c
	inner join tbl_genders g on g.id_gender = c.id_gender
	inner join tbl_region r on r.id_region = c.id_region WHERE id_customer = ${id}`;

	db.query(query, (err, result) => {
		if (err) console.error(err);
		else res.send(result);
	});
});

app.post('/customers', (req, res) => {
	const idGender = +req.body.id_gender;
	const idRegion = +req.body.id_region;

	const {
		name,
		surname,
		personal_id_number,
		phone_number,
		email,
		street,
		city,
		post_code,
	} = req.body;

	db.query(
		'INSERT INTO tbl_customers(name, surname, personal_id_number, phone_number, email, street, city, post_code,id_gender, id_region) VALUES(?,?,?,?,?,?,?,?,?,?)',
		[
			name,
			surname,
			personal_id_number,
			phone_number,
			email,
			street,
			city,
			post_code,
			idGender,
			idRegion,
		],
		(error, result) => {
			if (error) console.log(error);
			else res.send(result);
		}
	);
});

app.put('/customer/:id', (req, res) => {
	const id = req.params.id;

	const idGender = +req.body.id_gender;
	const idRegion = +req.body.id_region;

	const {
		name,
		surname,
		personal_id_number,
		phone_number,
		email,
		street,
		city,
		post_code,
	} = req.body;

	const query = `UPDATE tbl_customers SET name=?, surname=?, personal_id_number=?, phone_number=?, email=?, street=?, city=?, post_code=?, id_gender=?, id_region=?  WHERE id_customer = ${id}`;

	db.query(
		query,
		[
			name,
			surname,
			personal_id_number,
			phone_number,
			email,
			street,
			city,
			post_code,
			idGender,
			idRegion,
		],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

app.delete('/customer/:id', (req, res) => {
	const id = req.params.id;
	const query = `DELETE FROM tbl_customers WHERE id_customer = ${id};`;

	db.query(query, (err, result) => {
		if (err) console.error(err);
		else res.send(result);
	});
});

app.get('/spare-parts', (req, res) => {
	const query = `SELECT sp.id_spare_parts,sp.name,dt.name as "type",serial_number FROM tbl_spare_parts sp
	INNER JOIN tbl_device_type dt ON sp.id_device_type = dt.id_device_type
	INNER JOIN tbl_producers p ON sp.id_producers = p.id_producers;`;

	db.query(query, (err, result) => {
		if (err) console.error(err);
		else res.send(result);
	});
});

app.get('/spare-parts/:id', (req, res) => {
	const id = req.params.id;
	const query = `SELECT sp.id_spare_parts,sp.name,dt.name as "type", serial_number, p.producer, sp.id_device_type, sp.id_producers FROM tbl_spare_parts sp
	INNER JOIN tbl_device_type dt ON sp.id_device_type = dt.id_device_type
	INNER JOIN tbl_producers p ON sp.id_producers = p.id_producers WHERE sp.id_spare_parts = ${id};`;

	db.query(query, (err, result) => {
		if (err) console.error(err);
		else res.send(result);
	});
});

app.post('/spare-parts', (req, res) => {
	const idDevice = +req.body.type;
	const idProducer = +req.body.producer;
	const { name, serialNumber } = req.body;

	const query =
		'INSERT INTO tbl_spare_parts(name, id_device_type, id_producers, serial_number) VALUES(?,?,?,?);';

	db.query(
		query,
		[name, idDevice, idProducer, serialNumber],
		(error, result) => {
			if (error) console.log(error);
			else res.send(result);
		}
	);
});

app.put('/spare-parts/:id', (req, res) => {
	const id = req.params.id;

	const idDevice = +req.body.id_device_type;
	const idProducer = +req.body.id_producers;
	const { name, serial_number } = req.body;

	const query = `UPDATE tbl_spare_parts SET name=? ,id_device_type=?, id_producers=?, serial_number=? WHERE id_spare_parts = ${id};`;

	db.query(
		query,
		[name, idDevice, idProducent, serial_number],
		(error, result) => {
			if (error) console.log(error);
			else res.send(result);
		}
	);
});

app.delete('/spare-parts/:id', (req, res) => {
	const id = req.params.id;
	const query = `DELETE FROM tbl_spare_parts WHERE id_spare_parts = ${id};`;

	db.query(query, (err, result) => {
		if (err) console.error(err);
		else res.send(result);
	});
});

app.get('/employees', (req, res) => {
	const query = `SELECT id_user, login,u.email,CONCAT(e.name,' ',e.surname) AS "name_and_surname", et.employee_type FROM tbl_users u
	INNER JOIN tbl_employees e ON u.id_employee = e.id_employee
	INNER JOIN tbl_employee_type et ON u.id_employee_type = et.id_employee_type;`;

	db.query(query, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.get('/employees/:id', (req, res) => {
	const id = req.params.id;
	const query = `SELECT login, u.email, u.password, u.id_employee_type, et.employee_type FROM tbl_users u
	INNER JOIN tbl_employees e ON u.id_employee = e.id_employee
	INNER JOIN tbl_employee_type et ON u.id_employee_type = et.id_employee_type
	WHERE u.id_employee = ${id};`;

	db.query(query, (err, result) => {
		if (err) console.error(err);
		else res.send(result);
	});
});

app.post('/employees', (req, res) => {
	const idGender = +req.body.id_gender;
	const idRegion = +req.body.id_region;
	const idEmployee = +req.body.id_employee_type;

	const {
		name,
		surname,
		personal_id_number,
		phone_number,
		email,
		street,
		city,
		post_code,
	} = req.body;

	const query = `START TRANSACTION;
		INSERT INTO tbl_employees(name,surname,personal_id_number,phone_number,email,street,city,post_code,id_gender,id_region, id_employee_type)
		VALUES(?, ?, ?, ?, ?, ?, ?, ?,
		(SELECT id_gender FROM tbl_genders WHERE id_gender=? ),? ,?);
		SET @EmployeeId = (SELECT LAST_INSERT_ID());
		SET @EmployeeType = (SELECT id_employee_type FROM tbl_employees WHERE id_employee = @EmployeeId);
		SET @GeneratedLogin = (SELECT CONCAT(SUBSTRING(name,1,2),SUBSTRING(surname,1,3),SUBSTRING(personal_id_number,-3)) FROM tbl_employees WHERE id_employee=@EmployeeId);
		SET @Email = (SELECT email FROM tbl_employees WHERE id_employee = @EmployeeId);
		INSERT INTO tbl_users(id_employee,login,password,email,id_employee_type)
			VALUES(@EmployeeId, @GeneratedLogin, md5('test'), @Email, @EmployeeType);
		COMMIT;`;

	db.query(
		query,
		[
			name,
			surname,
			personal_id_number,
			phone_number,
			email,
			street,
			city,
			post_code,
			idGender,
			idRegion,
			idEmployee,
		],
		(err, result) => {
			if (err) console.log(err);
			else res.send(result);
		}
	);
});

app.put('/employees/:id', (req, res) => {
	const id = req.params.id;
	const { login, email, password } = req.body;

	const idDevice = +req.body.id_employee_type;

	const query = `UPDATE tbl_users
	SET login = ?, password = md5(?), email = ?, id_employee_type=?
	WHERE id_user = ${id}`;

	db.query(query, [login, password, email, idDevice], (error, result) => {
		if (error) console.log(error);
		else res.send(result);
	});
});

app.delete('/employees/:id', (req, res) => {
	const id = req.params.id;
	const query = `DELETE FROM tbl_users WHERE id_user = ${id};`;

	db.query(query, (err, result) => {
		if (err) console.error(err);
		else res.send(result);
	});
});

app.get('/payments', (req, res) => {
	const query = `SELECT id_payment, payment, CONCAT(c.name," ",c.surname) AS "name_and_surname",c.personal_id_number, pt.payment_type AS "payment_type"
	FROM tbl_payments p
	INNER JOIN tbl_customers c ON c.id_customer = p.id_customer
	INNER JOIN tbl_payment_type pt ON pt.id_payment_type = p.id_payment_type;`;

	db.query(query, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.post('/payments', (req, res) => {
	const idRepair = +req.body.id_repair;
	const idPaymentType = +req.body.payments;
	const idCustomer = +req.body.id_customer;

	const query = `START TRANSACTION;
	SET @RepairId = (SELECT id_repair FROM tbl_repairs WHERE id_repair = ?);
	SET @CustomerId = (SELECT id_customer FROM tbl_repairs WHERE id_customer = ? AND id_repair = @RepairId);
	SET @Price = (SELECT price FROM tbl_repairs WHERE id_repair=@RepairId);
	INSERT INTO tbl_payments(payment, id_customer, id_payment_type)
		VALUES(@Price,@CustomerId,?);
	UPDATE tbl_repairs
	SET status = 4
	WHERE id_repair = @RepairId;
	COMMIT;`;

	db.query(query, [idRepair, idCustomer, idPaymentType], (err, result) => {
		if (err) console.log(err);
		else res.send(result);
	});
});

app.listen(3001, () => {
	console.log('Your server is running!');
});
