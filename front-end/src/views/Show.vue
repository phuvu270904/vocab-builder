<template>
    <div>
        <h1>Show Word</h1>

        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="united kingdom flag"></i> English
            </div>
            <input type="text" readonly :value="word.english" />
            <i class="volume up icon speech-synthe" @click="speak('en', word.english)"></i>
        </div>

        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="germany flag"></i> German
            </div>
            <input type="text" readonly :value="word.german" />
            <i class="volume up icon speech-synthe" @click="speak('de', word.german)"></i>
        </div>
        
        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="france flag"></i> French
            </div>
            <input type="text" readonly :value="word.french" />
            <i class="volume up icon speech-synthe" @click="speak('fr', word.french)"></i>
        </div>
        <div v-if="isLoggedIn" class="actions">
            <router-link :to="{ name: 'edit', params: { wordId: this.$route.params.wordId } }">
                Edit word
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
        speak: function(lang, text) {
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
</style>