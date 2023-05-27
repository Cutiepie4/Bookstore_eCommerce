class AuthenticationService {

    getToken() {
        return sessionStorage.getItem('token');
    }

    getRole() {
        const authorities = JSON.parse(sessionStorage.getItem('authorities'));
        if (authorities != null) {
            if (authorities.some(item => item.authority === 'ROLE_ADMIN'))
                return 'ADMIN';
            else
                if (authorities.some(item => item.authority === 'ROLE_USER'))
                    return 'USER';
        }
        return 'GUEST';
    }

    getUsername() {
        return sessionStorage.getItem('username');
    }

    saveCredentail(credentail, account) {
        sessionStorage.setItem("token", credentail.token);
        sessionStorage.setItem("authorities", JSON.stringify(credentail.authorities));
        sessionStorage.setItem('username', account.username);
    }

    clearCredentail() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('authorities');
        sessionStorage.removeItem('username');
    }
}

const authService = new AuthenticationService()

export default authService;