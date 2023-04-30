class AuthenticationService {

    getToken() {
        return sessionStorage.getItem('token');
    }

    getAuthority() {
        const authorities = JSON.parse(sessionStorage.getItem('authorities'));
        if (authorities.some(item => item.authority === 'ROLE_ADMIN'))
            return 'ADMIN';
        else
            if (authorities.some(item => item.authority === 'ROLE_USER'))
                return 'USER';
        return 'GUEST';
    }

    saveSession(data) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("authorities", JSON.stringify(data.authorities));
    }

    clearSession() {
        sessionStorage.setItem('token', null);
        sessionStorage.setItem('authorities', null);
    }
}

const authService = new AuthenticationService()

export default authService;