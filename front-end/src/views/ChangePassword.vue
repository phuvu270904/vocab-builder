<template>
    <div class="change-password-page">
        <!-- Title Section -->
        <div class="header">
            <h2>Change Password</h2>
        </div>

        <!-- Form Section -->
        <form class="password-form" @submit.prevent="handleResetPassword">
            <div class="form-group">
                <label for="oldPassword">Old Password:</label>
                <input v-model="form.oldPassword" id="oldPassword" type="password" placeholder="Enter old password"
                    autocomplete="current-password" />
            </div>

            <div class="form-group">
                <label for="newPassword">New Password:</label>
                <input v-model="form.newPassword" id="newPassword" type="password" placeholder="Enter new password"
                    autocomplete="new-password" />
            </div>

            <div class="form-group">
                <label for="confirmNewPassword">Confirm New Password:</label>
                <input v-model="form.confirmNewPassword" id="confirmNewPassword" type="password"
                    placeholder="Confirm new password" autocomplete="new-password" />
            </div>

            <div class="form-actions">
                <button type="submit" class="ui button primary submit-btn" :disabled="disableChangePassword">
                    Change Password
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { api } from '../helpers/helpers.js';

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "ChangePassword",
    data() {
        return {
            form: {
                oldPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            },
        };
    },
    computed: {
        ...mapGetters(['user']),
        disableChangePassword() {
            return !this.form.oldPassword || !this.form.newPassword || !this.form.confirmNewPassword;
        }
    },
    methods: {
        async handleResetPassword() {
            if (this.form.newPassword !== this.form.confirmNewPassword) {
                this.flash('Password does not match', 'error');
            }
            const response = await api.changePassword({
                oldPassword: this.form.oldPassword,
                newPassword: this.form.newPassword
            });
            if (response.status === 200) {
                this.flash('Password changed successfully', 'success');
            } else {
                this.flash(response.data, 'error');
            }
        }
    }
};
</script>

<style scoped>
/* General Layout */
.change-password-page {
    max-width: 500px;
    margin: 2rem auto;
    padding: 2rem;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    font-family: "Arial", sans-serif;
}

/* Header */
.header {
    text-align: center;
    margin-bottom: 2rem;
}

.header h2 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333333;
}

/* Form Styles */
.password-form {
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
  text-align: center;
  margin-top: 1.5rem;
}


.submit-btn:hover {
  background: #594fbc;
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 480px) {
  .password-form {
    gap: 0.5rem;
  }
}
</style>