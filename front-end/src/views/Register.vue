<template>
  <div class="register-page">
    <div class="register-card">
      <div class="register-header">
        <h1>Sign Up</h1>
        <p>Create your account</p>
      </div>
      <form @submit.prevent="handleSubmit" class="register-form" autocomplete="off">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="form.username" placeholder="Enter your username" />
        </div>
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" v-model="form.email" placeholder="Enter your email" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="form.password" placeholder="Create a password" />
        </div>
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input type="text" id="phone" v-model="form.phone" placeholder="Enter your phone number" />
        </div>
        <div v-if="hasError" class="form-error">
          <ul>
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
        </div>
        <button type="submit" class="register-button">Sign Up</button>
      </form>
      <div class="login-message">
        Already have an account? <router-link to="/login">Sign in</router-link>
      </div>
    </div>
  </div>
</template>


<script>
import { api } from '@/helpers/helpers';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Register",
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
    async validateForm() {
      try {
        this.errors = [];
        this.hasError = false;

        if (!this.form.username) {
          this.errors.push("Please enter your username.");
        }

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

        if (!this.form.phone) {
          this.errors.push("Please enter your phone number.");
        } else if (!this.validatePhone(this.form.phone)) {
          this.errors.push("Please enter a valid phone number.");
        }

        if (this.errors.length > 0) {
          this.hasError = true;
        } else {
          this.hasError = false;
          await api.register(this.form);
          this.submitForm();
          this.$router.push("/login");
        }
      } catch (error) {
        console.error(error);
      }
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    validatePhone(phone) {
      const re = /^\d{10}$/;
      return re.test(phone);
    },
    handleSubmit() {
      this.validateForm();
    },
    submitForm() {
      this.flash('Created account successfully!', 'success');
    },
  },
};
</script>

<style scoped>
/* Global Reset */
body,
html {
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

/* Center the register page */
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

/* Card Styles */
.register-card {
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  text-align: center;
  color: #333;
  width: 100%;
}

.register-header h1 {
  font-size: 1.8rem;
  margin-bottom: 5px;
  color: #2575fc;
}

.register-header p {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 20px;
}

/* Form Styles */
.register-form .form-group {
  margin-bottom: 20px;
  text-align: left;
}

.register-form label {
  font-size: 0.9rem;
  color: #2575fc;
  display: block;
  margin-bottom: 8px;
}

.register-form input {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.register-form input:focus {
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

/* Register Button */
.register-button {
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

.register-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

/* Footer Message */
.login-message {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #333;
}

.login-message a {
  color: #2575fc;
  text-decoration: none;
  font-weight: 600;
}

.login-message a:hover {
  text-decoration: underline;
}
</style>
