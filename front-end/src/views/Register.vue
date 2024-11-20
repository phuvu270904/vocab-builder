<template>
    <div class="ui middle aligned center aligned grid page-login">
        <div class="column">
            <h1 class="ui image header">
                Sign up
            </h1>
            <form @submit.prevent="handleSubmit" class="ui large form" :class="{ error: hasError }" autocomplete="off">
                <div class="ui stacked secondary segment">
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="envelope icon"></i>
                            <input type="text" v-model="form.username" placeholder="Username" autocomplete="off" />
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="user icon"></i>
                            <input type="text" v-model="form.email" placeholder="E-mail address" autocomplete="off" />
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="lock icon"></i>
                            <input type="password" v-model="form.password" placeholder="Password" autocomplete="new-password" />
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="phone icon"></i>
                            <input type="text" v-model="form.phone" placeholder="Phone Number" autocomplete="off" />
                        </div>
                    </div>
                    <div class="ui fluid large primary submit button" @click="validateForm">
                        Sign up
                    </div>
                </div>
                <div class="ui error message" v-if="hasError">
                    <ul style="list-style: none;">
                        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                    </ul>
                </div>
            </form>
            <div class="ui message">
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
body {
    background-color: #ECF0F1;
}

.page-login {
    height: 100vh;
}

.error.message {
  color: red;
}
</style>
