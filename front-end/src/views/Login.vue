<template>
    <div class="ui middle aligned center aligned grid page-login">
        <div class="column">
            <h1 class="ui image header">
                Login to your account
            </h1>
            <form @submit.prevent="handleSubmit" class="ui large form" :class="{ error: hasError }">
                <div class="ui stacked secondary segment">
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="envelope icon"></i>
                            <input type="text" v-model="form.email" placeholder="E-mail address" />
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="lock icon"></i>
                            <input type="password" v-model="form.password" placeholder="Password" />
                        </div>
                    </div>
                    <div class="ui fluid large primary submit button" @click="validateForm">
                        Login
                    </div>
                </div>
                <div class="ui error message" v-if="hasError">
                    <ul style="list-style: none;">
                        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                    </ul>
                </div>
            </form>
            <div class="ui message">
                Don't have an account yet? <router-link to="/register">Create Account</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { api } from "../helpers/helpers";

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
        async validateForm() {
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

            const res = await api.login(this.form);
            console.log(res);
            if (res.status) {
                this.errors.push(res.data);
            }


            if (this.errors.length > 0) {
                this.hasError = true;
            } else {
                this.hasError = false;
                this.submitForm();
                this.$router.push("/");
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
