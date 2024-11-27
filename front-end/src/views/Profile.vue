<template>
  <div class="profile-page">
    <!-- User Info Section -->
    <div class="profile-header">
      <i class="user circle icon"></i>
      <h2 class="username">{{ user.username }}</h2>
    </div>

    <!-- Profile Form Section -->
    <div class="profile-form-container">
      <h3 class="section-title">Profile Details</h3>
      <form class="profile-form">
        <div class="form-group">
          <label for="username">Name:</label>
          <input v-model="form.username" id="username" type="text" placeholder="Enter your name" />
        </div>

        <div class="form-group">
          <label for="phone">Mobile:</label>
          <input v-model="form.phone" id="phone" type="text" placeholder="Enter your mobile number" />
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="form.email" id="email" type="email" placeholder="Enter your email" />
        </div>

        <div class="form-actions">
          <button class="ui button primary update-btn" :disabled="disableUpdate" @click.prevent="handleUpdateProfile">
            Update Profile
          </button>
          <router-link to="/changePassword" class="ui button secondary change-password-btn">Change
            Password</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { api } from '../helpers/helpers.js';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Profile",
  data() {
    return {
      form: {
        username: '',
        email: '',
        phone: ''
      },
    };
  },
  computed: {
    ...mapGetters(['user']),
    disableUpdate() {
      return !this.form.username || !this.form.email || !this.form.phone;
    }
  },
  watch: {
    user: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.form.username = newValue.username || '';
          this.form.email = newValue.email || '';
          this.form.phone = newValue.phone || '';
        }
      }
    }
  },
  methods: {
    validatePhone(phone) {
      const re = /^\d{10}$/;
      return re.test(phone);
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    async handleUpdateProfile() {
      if (!this.validateEmail(this.form.email)) {
        this.flash('Please enter a valid email', 'error');
        return;
      }
      if (!this.validatePhone(this.form.phone)) {
        this.flash('Please enter a valid phone number', 'error');
        return;
      }
      const res = await api.updateProfile(this.form);
      if (res.status === 500) {
        this.flash('Duplicate Email!', 'error');
        return;
      }
      if (res.data.username) {
        window.location.reload();
        this.flash('Profile updated successfully', 'success');
      } else {
        this.flash('Profile updated failed', 'error');
      }
    }
  }
};
</script>

<style scoped>
/* General Layout */
.profile-page {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
}

/* Profile Header */
.profile-header {
  text-align: center;
  margin-bottom: 2rem;
}

.user.icon {
  font-size: 100px
}

.username {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333333;
}

/* Section Title */
.section-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #555555;
  margin-bottom: 1rem;
  text-align: center;
}

/* Form Styles */
.profile-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #666666;
}

input {
  padding: 0.75rem;
  border: 1px solid #cccccc;
  border-radius: 5px;
  font-size: 1rem;
  color: #333333;
}

input:focus {
  outline: none;
  border-color: #6c63ff;
  box-shadow: 0 0 4px rgba(108, 99, 255, 0.4);
}

/* Actions */
.form-actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.btn {
  flex: 1;
  padding: 0.75rem;
  font-size: 1rem;
  text-align: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.update-btn {
  background: #6c63ff;
  color: #ffffff;
}

.update-btn:hover {
  background: #594fbc;
  transform: translateY(-2px);
}

.change-password-btn {
  background: #f0f0f0;
  color: #6c63ff;
  text-align: center;
}

.change-password-btn:hover {
  background: #e5e5e5;
  color: #594fbc;
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 480px) {
  .form-actions {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
