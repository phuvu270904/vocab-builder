<template>
  <div id="app">
    <div v-if="showNav" class="ui inverted segment navbar">
      <div class="ui center aligned container">
        <div class="ui massive secondary inverted pointing menu compact">
          <router-link to="/words" exact class="item">
            <i class="comment outline icon"></i> Words
          </router-link>
          <router-link v-if="isLoggedIn" to="/words/new" class="item">
            <i class="plus circle icon"></i> New
          </router-link>
          <router-link v-if="isLoggedIn" to="/test" class="item">
            <i class="graduation cap icon"></i> Test
          </router-link>
        </div>
        <div class="ui large secondary inverted pointing menu compact ui right floated">
          <router-link v-if="!isLoggedIn" to="/login" class="ui simple dropdown item ui massive menu">
            <i class="sign in icon"></i> Login
          </router-link>
          <div v-else class="ui simple dropdown item ui massive menu">
            <i class="user icon"></i>
            <div class="ui massive">
              {{ user.username }}
            </div>
            <i class="dropdown icon"></i>
            <div class="menu">
              <router-link to="/profile" class="item">
                <i class="user icon"></i> Profile
              </router-link>
              <div class="divider"></div>
              <div class="item" @click="handleLogout()">
                <i class="sign out icon"></i> Logout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div :class="profileRoute ? '' : 'ui text container'">
      <flash-message class="myFlash"></flash-message>
      <div>
        <div>
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import {api} from './helpers/helpers';

export default {
  name: 'app',
  data() {
    return {
      showNav: true
    };
  },
  async mounted() {
    this.updateShowNav();
    if (localStorage.getItem('token')) {
      this.setLoginStatus(true);
      const userInfo = await api.profile();
      this.setUser({
        email: userInfo.user.email,
        username: userInfo.user.username,
        phone: userInfo.user.phone
      });
    }
  },
  watch: {
    '$route': async function () {
      this.updateShowNav();
    },
    isLoggedIn() {
      if (localStorage.getItem('token')) {
        this.setLoginStatus(true);
      }
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'user']),
    profileRoute() {
      return this.$route.path == '/profile' || this.$route.path == '/changePassword' ? true : false
    }
  },
  methods: {
    ...mapMutations(['setLoginStatus', 'setUser']),

    updateShowNav() {
      const hiddenPaths = ['/login', '/register'];
      this.showNav = !hiddenPaths.includes(this.$route.path);
    },
    async handleLogout() {
      await api.logout(localStorage.getItem('refreshToken'));
      this.setLoginStatus(false);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      if (this.$route.path !== '/words') {
        this.$router.push('/');
      }
      window.location.reload();
    }
  }
};
</script>

<style>
#app>div.navbar {
  margin-bottom: 1.5em;
}

.myFlash {
  width: 250px;
  margin: 10px;
  position: absolute;
  top: 50;
  right: 0;
}

input {
  width: 300px;
}

div.label {
  width: 120px;
}

div.input {
  margin-bottom: 10px;
}

button.ui.button {
  margin-top: 15px;
  display: block;
}

.ui.simple.dropdown .menu {
  margin-top: 0 !important;
}
</style>