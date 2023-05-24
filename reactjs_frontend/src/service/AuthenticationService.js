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

    getAccount() {
        const account = JSON.parse(sessionStorage.getItem('account'));
        return account;
    }

    saveCredentail(credentail, account) {
        sessionStorage.setItem("token", credentail.token);
        sessionStorage.setItem("authorities", JSON.stringify(credentail.authorities));
        sessionStorage.setItem('account', JSON.stringify(account));
    }

    clearCredentail() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('authorities');
        sessionStorage.removeItem('account');
    }
}

const authService = new AuthenticationService()

export default authService;