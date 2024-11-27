<template>
    <div class="show-word-container">
        <h1 class="show-word-title">Word Details</h1>

        <!-- English Word -->
        <div class="word-entry">
            <div class="word-label">
                <i class="united kingdom flag"></i> English
            </div>
            <div class="word-value">
                <input type="text" readonly :value="word.english" />
                <i class="volume up icon speech-synthe" @click="speak('en', word.english)"></i>
            </div>
        </div>

        <!-- German Word -->
        <div class="word-entry">
            <div class="word-label">
                <i class="germany flag"></i> German
            </div>
            <div class="word-value">
                <input type="text" readonly :value="word.german" />
                <i class="volume up icon speech-synthe" @click="speak('de', word.german)"></i>
            </div>
        </div>

        <!-- French Word -->
        <div class="word-entry">
            <div class="word-label">
                <i class="france flag"></i> French
            </div>
            <div class="word-value">
                <input type="text" readonly :value="word.french" />
                <i class="volume up icon speech-synthe" @click="speak('fr', word.french)"></i>
            </div>
        </div>

        <!-- Edit Action -->
        <div v-if="isLoggedIn && $store.state.isAdmin" class="word-actions">
            <router-link class="edit-link" :to="{ name: 'edit', params: { wordId: this.$route.params.wordId } }">
                Edit Word
            </router-link>
        </div>
    </div>
</template>

<script>
import { api } from '../helpers/helpers.js';

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Show',
    data() {
        return {
            word: ''
        };
    },
    async mounted() {
        this.word = await api.getWord(this.$route.params.wordId);
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn;
        }
    },
    methods: {
        speak: function (lang, text) {
            const msg = new SpeechSynthesisUtterance();
            msg.text = text;
            msg.lang = lang;
            window.speechSynthesis.speak(msg);
        }
    }
}
</script>

<style scoped>
.actions a {
    display: block;
    text-decoration: underline;
    margin: 20px 10px;
}

.speech-synthe {
    color: #2185d0;
    margin-left: 20px;
    margin-top: 10px;
    cursor: pointer;
}

.ui.label {
    width: 150px;
}
/* Container Styling */
.show-word-container {
  margin: 2rem auto;
  max-width: 600px;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

/* Title Styling */
.show-word-title {
  text-align: center;
  font-size: 2rem;
  color: #2575fc;
  margin-bottom: 1.5rem;
  font-weight: bold;
}

/* Word Entry Styling */
.word-entry {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.word-label {
  flex-shrink: 0;
  width: 100px;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
}

.word-value {
  display: flex;
  align-items: center;
  flex: 1;
  position: relative;
}

.word-value input {
  flex: 1;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  color: #333;
  margin-right: 10px;
}

.word-value input:focus {
  outline: none;
  border-color: #2575fc;
  box-shadow: 0 0 4px rgba(37, 117, 252, 0.4);
}

.word-value .speech-synthe {
  color: #6a11cb;
  cursor: pointer;
  transition: color 0.3s;
}

.word-value .speech-synthe:hover {
  color: #2575fc;
}

/* Edit Link Styling */
.word-actions {
  text-align: center;
  margin-top: 1.5rem;
}

.edit-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: white;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s;
}

.edit-link:hover {
  background: linear-gradient(135deg, #2575fc 0%, #6a11cb 100%);
}
</style>