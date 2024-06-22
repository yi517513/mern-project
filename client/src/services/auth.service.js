import axios from "axios";
const API_URL = "https://mern-server-0nfh.onrender.com/api/user";

class AuthService {
  login(email, password) {
    console.log("In AuthService.login()");
    return axios.post(API_URL + "/login", { email, password });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password, role) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      role,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
