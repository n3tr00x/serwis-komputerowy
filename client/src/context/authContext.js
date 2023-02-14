import React from 'react';

const AuthContext = React.createContext({
	isAuthenticated: false,
	userCredentials: {},
	login: () => {},
	logout: () => {},
});

export default AuthContext;
