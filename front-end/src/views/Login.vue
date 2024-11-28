<template>
    <div class="login-page">
      <div class="login-card">
        <div>
          <img src="../assets/futionary-logo.png" alt="logo" style="width: 40%; margin: 10px"/>
        </div>
        <div class="login-header">
          <h1>Welcome Back</h1>
          <p>Please log in to continue</p>
        </div>
        <form @submit.prevent="handleSubmit" class="login-form">
          <div class="form-group">
            <label for="email">E-mail Address</label>
            <input type="text" id="email" v-model="form.email" placeholder="Enter your email" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="form.password" placeholder="Enter your password" />
          </div>
          <div class="form-footer">
            <button class="login-button">Login</button>
          </div>
          <div class="form-error" v-if="hasError">
            <ul>
              <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
          </div>
        </form>
        <div class="register-message">
          <p>
            Don't have an account? <router-link to="/register">Sign Up</router-link>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  

<script>
import { api } from "../helpers/helpers";
import { mapMutations } from "vuex";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Login",
    data() {
        return {
            form: {
                email: "",
                password: "",
            },
            errors: [],
            hasError: false,
        };
    },
    methods: {
        ...mapMutations(["setUser", "setLoginStatus"]),

        async validateForm() {
            try {
                this.errors = [];
                this.hasError = false;

                if (!this.form.email) {
                    this.errors.push("Please enter your e-mail.");
                } else if (!this.validateEmail(this.form.email)) {
                    this.errors.push("Please enter a valid e-mail.");
                }

                if (!this.form.password) {
                    this.errors.push("Please enter your password.");
                } else if (this.form.password.length < 6) {
                    this.errors.push("Your password must be at least 6 characters.");
                }
                
                if (this.errors.length > 0) {
                    this.hasError = true;
                } else {
                    this.hasError = false;
                    const res = await api.login(this.form);
                    if (res.status === 200) {
                        this.setUser({
                            email: res.data.email,
                            username: res.data.username,
                        });
                        this.submitForm();
                        this.setLoginStatus(true);
                        this.$router.push("/");
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("refreshToken", res.data.refreshToken);   
                    } else {
                        this.flash(res.data, "error");
                    }
                }
            } catch (error) {
                this.flash("Login failed!", "error");
            }
        },
        validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },
        handleSubmit() {
            this.validateForm();
        },
        submitForm() {
            this.flash('Login successfully!', 'success'); 
        },
    },
};
</script>

<style scoped>
/* Global Reset */
body, html {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}

/* Center the login page */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

/* Card Styles */
.login-card {
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  text-align: center;
  width: 100%;
  color: #333;
}

.login-header h1 {
  font-size: 1.8rem;
  margin-bottom: 5px;
  color: #4a90e2;
}

.login-header p {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 20px;
}

/* Form Styles */
.login-form .form-group {
  margin-bottom: 20px;
  text-align: left;
}

.login-form label {
  font-size: 0.9rem;
  color: #4a90e2;
  display: block;
  margin-bottom: 8px;
}

.login-form input {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.login-form input:focus {
  border-color: #4a90e2;
  outline: none;
}

/* Error Messages */
.form-error {
  background-color: #ffe5e5;
  padding: 10px;
  border-radius: 8px;
  color: #d9534f;
  margin-top: 10px;
  font-size: 0.85rem;
}

.form-error ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.form-error li {
  margin-bottom: 5px;
}

/* Login Button */
.login-button {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.login-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

/* Footer Message */
.register-message {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #333;
}

.register-message a {
  color: #2575fc;
  text-decoration: none;
  font-weight: 600;
}

.register-message a:hover {
  text-decoration: underline;
}
</style>


