class AuthenticationService {
    saveToken(jwtToken) {
        sessionStorage.setItem("token", jwtToken);
    }
}

export default new AuthenticationService();