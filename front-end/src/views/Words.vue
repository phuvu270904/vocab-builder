<template>
    <div class="table-container">
        <h1 class="table-title">Words</h1>
        <table class="custom-table">
            <thead>
                <tr>
                    <th>English</th>
                    <th>German</th>
                    <th>French</th>
                    <th colspan="3" class="actions-header"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(word, i) in words" :key="i">
                    <td>{{ word.english }}</td>
                    <td>{{ word.german }}</td>
                    <td>{{ word.french }}</td>
                    <td width="75" class="action-cell">
                        <router-link class="action-link"
                            :to="{ name: 'show', params: { wordId: word._id } }">Show</router-link>
                    </td>
                    <td v-if="isLoggedIn && $store.state.isAdmin" width="75" class="action-cell">
                        <router-link class="action-link"
                            :to="{ name: 'edit', params: { wordId: word._id } }">Edit</router-link>
                    </td>
                    <td v-if="isLoggedIn && $store.state.isAdmin" width="75" class="action-cell">
                        <a class="action-link delete-link" @click.prevent="onDestroy(word._id)">Destroy</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { api } from '../helpers/helpers.js';

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Words',
    data() {
        return {
            words: []
        };
    },
    async mounted() {
        this.words = await api.getWords();
        if (this.isLoggedIn) {
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
    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn;
        }
    },
    methods: {
        ...mapMutations(['setUser']),
        async onDestroy(id) {
            const sure = window.confirm('Are you sure?');
            if (!sure) return;
            await api.deleteWord(id);
            this.flash('Word deleted', 'success');
            const newWords = this.words.filter(word => word._id !== id);
            this.words = newWords;
        }
    }
}
</script>

<style scoped>
/* Table Container */
.table-container {
  margin: 2rem auto;
  padding: 1rem;
  max-width: 800px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Table Title */
.table-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #2575fc;
  margin-bottom: 1rem;
}

/* Table Styling */
.custom-table {
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  font-family: Arial, sans-serif;
  border-radius: 8px;
}

/* Header Styling */
.custom-table thead {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
}

.custom-table th {
  text-align: left;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
}

/* Body Styling */
.custom-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.custom-table tbody tr:nth-child(odd) {
  background-color: #ffffff;
}

.custom-table td {
  padding: 0.75rem;
  font-size: 0.95rem;
  color: #333;
}

/* Action Cells */
.action-cell {
  text-align: center;
}

/* Action Links */
.action-link {
  color: #2575fc;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;
}

.action-link:hover {
  color: #6a11cb;
}

.delete-link {
    cursor: pointer;
  color: #ff5a5f;
}

.delete-link:hover {
  color: #e53935;
}

/* Table Hover Effects */
.custom-table tbody tr:hover {
  background-color: #eaf4ff;
}

</style>