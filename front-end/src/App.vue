<template>
  <div id="app">
    <div v-if="showNav" class="navbar">
      <div class="navbar-container">
        <router-link to="/words" class="logo">
          <img src="./assets/futionary-white-logo.png" alt="logo" />
        </router-link>

        <div class="menu">
          <router-link to="/words" exact class="menu-item">
            <i class="comment outline icon"></i> Words
          </router-link>
          <router-link v-if="isLoggedIn && $store.state.isAdmin" to="/words/new" class="menu-item">
            <i class="plus circle icon"></i> New
          </router-link>
          <router-link v-if="isLoggedIn" to="/test" class="menu-item">
            <i class="graduation cap icon"></i> Test
          </router-link>
        </div>
        <div class="user-menu">
          <router-link v-if="!isLoggedIn" to="/login" class="menu-item">
            <i class="sign in icon"></i> Login
          </router-link>
          <div v-else class="dropdown">
            <button class="dropdown-toggle">
              <i class="user icon"></i>
              <span>{{ user.username }}</span>
              <i class="caret-down icon"></i>
            </button>
            <div class="dropdown-menu">
              <router-link to="/profile" class="dropdown-item">
                <i class="user icon"></i> Profile
              </router-link>
              <div class="dropdown-divider"></div>
              <button class="dropdown-item" @click="handleLogout">
                <i class="sign out icon"></i> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class='ui text container'>
      <flash-message class="myFlash"></flash-message>
      <div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { api } from './helpers/helpers';

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
      if (userInfo.user.role === 'admin') {
        this.$store.commit('setAdmin', true);
      } else {
        this.$store.commit('setAdmin', false);
      }
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
    ...mapGetters(['isLoggedIn', 'user'])
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

<style scoped>
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

/* Global Styles */
.navbar {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  padding: 15px 20px;
  color: white;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* Navbar Container */
.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

/* Logo Section */
.logo img {
  max-width: 150px;
  height: auto;
}

/* Menu */
.menu {
  display: flex;
  gap: 15px;
  margin-right: 80px;
}

.menu-item {
  color: white;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
}

.menu-item:hover {
  color: #ffdd57;
}

/* User Menu */
.user-menu {
  display: flex;
  align-items: center;
}

.dropdown {
  position: relative;
}

.dropdown-toggle {
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  color: #333;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 10px;
  display: none;
  flex-direction: column;
  min-width: 150px;
}

.dropdown-menu .dropdown-item {
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  color: #333;
  font-size: 0.9rem;
  border-radius: 5px;
  transition: background 0.3s ease;
  cursor: pointer;
}

.dropdown-menu .dropdown-item:hover {
  background: #f0f0f0;
}.dropdown-menu .dropdown-divider {
  height: 1px;
  background: #ddd;
  margin: 8px 0;
}

.dropdown:hover .dropdown-menu {
  display: flex;
}

/* Responsive Design */
@media (max-width: 768px) {
  .navbar-container {
    flex-direction: column;
    gap: 10px;
  }

  .menu {
    justify-content: center;
    flex-wrap: wrap;
  }

  .menu-item {
    font-size: 0.9rem;
  }

  .logo img {
    max-width: 100px;
  }
}
</style>