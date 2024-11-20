<template>
  <div class="card">
    <div class="left-container">
      <i class="user circle outline icon"></i>
      <h2 class="gradienttext">{{ user.username }}</h2>
    </div>
    <div class="right-container">
      <h1 class="gradienttext" style="margin-top: 30px; margin-bottom: 10px;">Profile Details</h1>
      <div style="display: flex">
        <table style="flex: 1">
          <tr>
            <td>Name :</td>
            <td>
              <div class="ui inverted input">
                <input v-model="form.username" type="text" placeholder="Name...">
              </div>
            </td>
          </tr>
          <tr>
            <td>Mobile :</td>
            <td>
              <div class="ui inverted input">
                <input v-model="form.phone" type="text" placeholder="Mobile...">
              </div>
            </td>
          </tr>
          <tr>
            <td>Email :</td>
            <td>
              <div class="ui inverted input">
                <input v-model="form.email" type="text" placeholder="Email...">
              </div>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
            <button class="ui inverted grey button" style="font-size: 20px;" :disabled="disableUpdate" @click="handleUpdateProfile()">Update Profile</button>
            </td>
          </tr>
        </table>

        <div style="flex: 1; display: flex; align-items: center; justify-content: center; margin-bottom: 100px;">
          <router-link to="/changePassword">
            <div class="ui animated button black" tabindex="0" style="font-size: 30px;">
              <div class="visible content">Change password?</div>
              <div class="hidden content">
                <i class="right arrow icon"></i>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {api} from '../helpers/helpers.js';

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
    async handleUpdateProfile() {
      const res = await api.updateProfile(this.form);
      if (res.username) {
        window.location.reload();
        this.flash('Profile updated successfully', 'success');
      } else {
        this.$store.dispatch('flashMessage', {
          message: 'Profile update failed',
          type: 'error'
        });
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
  justify-content: space-between;
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
