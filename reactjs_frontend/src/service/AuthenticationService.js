class AuthenticationService {

    constructor() {
        sessionStorage.setItem('token', null);
        sessionStorage.setItem('authorities', null);
        sessionStorage.setItem('account', null);
    }

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
        sessionStorage.setItem('token', null);
        sessionStorage.setItem('authorities', null);
        sessionStorage.setItem('account', null);
    }
}

const authService = new AuthenticationService()

export default authService;