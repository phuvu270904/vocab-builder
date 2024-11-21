<template>
    <div class="card">
        <div class="right-container">
            <h1 class="gradienttext" style="margin-top: 30px; margin-bottom: 10px;">Change Password</h1>
            <div style="display: flex">
                <table style="flex: 1">
                    <tr>
                        <td>Old Password :</td>
                        <td>
                            <div class="ui inverted input">
                                <input v-model="form.oldPassword" id="oldPassword" name="oldPassword" type="password" placeholder="Old Password..." autocomplete="new-password">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>New Password :</td>
                        <td>
                            <div class="ui inverted input">
                                <input v-model="form.newPassword" id="newPassword" name="newPassword" type="password" placeholder="New Password..." autocomplete="new-password">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Confirm new password :</td>
                        <td>
                            <div class="ui inverted input">
                                <input v-model="form.confirmNewPassword" id="confirmNewPassword" name="confirmNewPassword" type="password" placeholder="Confirm new password..." autocomplete="new-password">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button class="ui inverted grey button" style="font-size: 20px;" :disabled="disableChangePassword"
                                @click="handleResetPassword()">Change password</button>
                        </td>
                    </tr>
                </table>
            </div>

        </div>
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
body {
    font-family: Arial, sans-serif;
    padding: 20px;
    background: #180835;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

html,
body {
    height: 100%;
}

.card {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    padding: 10px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 800px;
}

.left-container {
    background: #000000;
    background: -webkit-linear-gradient(to right, #434343, #000000);
    background: linear-gradient(to right, #434343, #000000);
    flex: 1;
    max-width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 500px;
    padding: 10px;
    margin: 30px;
    border-radius: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.right-container {
    background: #000000;
    background: -webkit-linear-gradient(to left, #434343, #000000);
    background: linear-gradient(to left, #434343, #000000);
    flex: 1;
    max-width: 70%;
    height: 500px;
    padding: 10px;
    margin: 20px;
    border-radius: 30px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

@media only screen and (max-width: 860px) {
    .card {
        flex-direction: column;
        margin: 10px;
        height: auto;
        width: 90%;
    }

    .left-container {
        flex: 1;
        max-width: 100%;
    }
}

@media only screen and (max-width: 600px) {
    .card {
        flex-direction: column;
        margin: 10px;
    }

    .left-container {
        flex: 1;
        max-width: 100%;
    }
}

img {
    width: 200px;
    height: 200px;
    max-width: 200px;
    border-radius: 50%;
    margin: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

h1 {
    text-align: center;
    font-size: 50px;
    margin-bottom: 5px;
}

.gradienttext {
    color: white
}

p {
    font-size: 18px;
    margin-bottom: 20px;
    color: aliceblue
}

table {
    width: 100%;
    height: 280px;
}

td {

    padding: 10px;
    border: none;
    border-radius: 20px;
    color: white;
}

td:first-child {
    font-weight: bold;
    text-align: end;
}

.credit a {
    text-decoration: none;
    color: #fff;
    font-weight: 800;
}

.credit {
    color: #fff;
    text-align: center;
    margin-top: 10px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.left-container i {
    font-size: 150px;
    color: white;
    margin-top: 150px;
    margin-bottom: -65px;
}

.right-container table {
    font-size: 25px;
}
</style>