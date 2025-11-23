import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth",{
    state: () =>({
        user: null,
        userID: null,
        token: null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token, 
        isAdmin: (s) => s.user?.VaiTro === "Admin",
        isUser: (s) => s.user?.VaiTro === "User",
        getUserID: (state) => state.userID
  },

  actions:{
  initializeAuth() {
    this.userID = localStorage.getItem("userID") || null;
    this.token = localStorage.getItem("token") || null;
    this.user = JSON.parse(localStorage.getItem("user")) || null;
  },

  //REGISTER
    async register(userData) {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", userData);
      console.log('data:', userData);
      alert("Đăng ký thành công!")
      return true;

    } catch (error) {
      alert("Email đã tồn tại!");
      console.error("Đăng ký thất bại",error.response.data);
      return false;
    }
  },


   async login(credentials) {
    try {
      console.log('data', credentials)
      const response = await axios.post("http://localhost:3000/api/auth/login", credentials,
        {
          headers: { "Content-Type": "application/json" },
        });
        
        this.user = response.data.user;
        this.token = response.data.token;
        this.userID = response.data.user.id;
        localStorage.setItem("token", this.token);
        localStorage.setItem("userID", this.userID);       
        // save to localStorage
        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("role", this.user.VaiTro);

      return true;

    } catch (error) {
      console.log("Login failed:", error.response?.data || error.message);
      return false;
    }
  },

 async UpdateProfile(updatedUser) {
    try {

      const response = await axios.put(`http://localhost:3000/api/user/${updatedUser._id}`,updatedUser,  {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      this.user = response.data.user;
      //alert("Cập nhật Profile thành công!");
    } catch (error) {
          window.location.reload();
      console.error("Lỗi cập nhật Profile:", error.response?.data || error.message);
    }
  },

    //Logout
  logout() {
    this.user = null;
    this.token = null;
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    localStorage.removeItem("user");
  },
  adminlogout() {
    this.user = null;
    this.token = null;
    localStorage.removeItem("token");
  },
},
 persist: {
        enabled: true,
        strategies: [
            {
                key: 'auth',
                storage: localStorage,
            }
        ]
    }
    
})

