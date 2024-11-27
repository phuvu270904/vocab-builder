<!-- eslint-disable vue/no-mutating-props -->
<template>
    <form>
        <p v-if="errorsPresent" class="error">Please fill out both fields!</p>

        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="united kingdom flag"></i> English
            </div>
            <input type="text" placeholder="Enter word..." v-model="word.english" />
        </div>

        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="germany flag"></i> German
            </div>
            <input type="text" placeholder="Enter word..." v-model="word.german" />
        </div>

        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="france flag"></i> French
            </div>
            <input type="text" placeholder="Enter word..." v-model="word.french" />
        </div>
        <div style="display: flex; flex-direction: column; width: 20%; height: 90px; justify-content: space-around;">
            <button class="primary ui button" :disabled="disabledTranslate" @click.prevent="handleTranslate">{{ loading ? "Translating..." : "Auto Translate"}}</button>
            <button class="positive ui button" :disabled="disabled" @click.prevent="onSubmit">Submit</button>
        </div>
    </form>
</template>

<script>
import { api } from '../helpers/helpers.js';

export default {
    name: 'word-form',
    props: {
        word: {
            type: Object,
            required: false,
            default: function () {
                return {
                    english: '',
                    german: '',
                    french: ''
                };
            }
        }
    },
    data() {
        return {
            errorsPresent: false,
            loading: false
        };
    },
    computed: {
        disabled() {
            return this.word.english === '' || this.word.german === '' || this.word.french === '';
        },
        disabledTranslate() {
            return this.word.english === '';
        }
    },
    methods: {
        onSubmit: function () {
            if (this.word.english === '' || this.word.german === '' || this.word.french === '') {
                this.errorsPresent = true;
            } else {
                this.$emit('createOrUpdate', this.word);
            }
        },
        handleTranslate: async function () {
            try {
                this.loading = true;
                const response = await api.translateWord({word: this.word.english});
                // eslint-disable-next-line vue/no-mutating-props
                this.word.german = response.german;
                // eslint-disable-next-line vue/no-mutating-props
                this.word.french = response.french;
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }

            
        }
    }
};
</script>

<style scoped>
.error {
    color: red;
}
.ui.label {
    width: 150px;
}
</style>