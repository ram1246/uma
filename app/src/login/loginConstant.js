define(function() {
    return {
        "USER_ROLES": {
            all: '*',
            admin: 'admin',
            editor: 'editor',
            guest: 'guest',
            contributor: 'Contributor',
            initial: 'initial'
        },
        "AUTH_EVENTS": {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized'
        }
    };
});