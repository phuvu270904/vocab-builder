<!-- eslint-disable vue/no-mutating-props -->
<template>
    <form class="word-form">
        <!-- Error Message -->
        <p v-if="errorsPresent" class="form-error">
            Please fill out both fields!
        </p>

        <!-- English Input -->
        <div class="form-group">
            <div class="form-label">
                <i class="united kingdom flag"></i> English
            </div>
            <input type="text" placeholder="Enter word..." class="form-input" v-model="word.english" />
        </div>

        <!-- German Input -->
        <div class="form-group">
            <div class="form-label">
                <i class="germany flag"></i> German
            </div>
            <input type="text" placeholder="Enter word..." class="form-input" v-model="word.german" />
        </div>

        <!-- French Input -->
        <div class="form-group">
            <div class="form-label">
                <i class="france flag"></i> French
            </div>
            <input type="text" placeholder="Enter word..." class="form-input" v-model="word.french" />
        </div>

        <!-- Buttons -->
        <div class="form-actions">
            <button class="ui button primary gradient-button" :disabled="disabledTranslate"
                @click.prevent="handleTranslate">
                {{ loading ? "Translating..." : "Auto Translate" }}
            </button>
            <button class="ui button green positive-button" :disabled="disabled" @click.prevent="onSubmit">
                Submit
            </button>
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
            loading: false,
            initialWord: null
        };
    },
    watch: {
        word: {
            immediate: true,
            handler(newWord) {
                this.initialWord = JSON.parse(JSON.stringify(newWord));
            }
        }
    },
    computed: {
        disabled() {
            const hasEmptyField = this.word.english?.trim() === '' || this.word.german?.trim() === '' || this.word.french?.trim() === '';
            const isUnchanged = JSON.stringify(this.word) === JSON.stringify(this.initialWord);

            return hasEmptyField || isUnchanged;
        },
        disabledTranslate() {
            const hasEmptyField = this.word.english?.trim() === '';
            const isUnchanged = JSON.stringify(this.word) === JSON.stringify(this.initialWord);
            return hasEmptyField || isUnchanged;
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
                const response = await api.translateWord({ word: this.word.english });
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
/* Form Container */
.word-form {
    width: 100%;
    max-width: 600px;
    margin: 2rem auto;
    padding: 1.5rem;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
}

/* Error Message */
.form-error {
    color: #d9534f;
    background: #f8d7da;
    border: 1px solid #f5c2c7;
    border-radius: 5px;
    padding: 0.75rem;
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
}

/* Form Group */
.form-group {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
}

.form-label {
    flex-shrink: 0;
    width: 100px;
    font-weight: 600;
    font-size: 1rem;
    display: flex;
    align-items: center;
    color: #333;
}

.form-input {
    flex: 1;
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: #f9f9f9;
    color: #333;
}

.form-input:focus {
    outline: none;
    border-color: #2575fc;
    box-shadow: 0 0 4px rgba(37, 117, 252, 0.4);
}

/* Form Actions */
.form-actions {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-top: 1.5rem;
}

.ui.button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.2s ease, background 0.3s ease;
}

.ui.button:disabled {
    background: #ccc;
    cursor: not-allowed;
}

/* Gradient Button */
.gradient-button {
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
    color: white;
}

.gradient-button:hover {
    background: linear-gradient(135deg, #2575fc 0%, #6a11cb 100%);
    transform: scale(1.05);
}

/* Positive Button */
.positive-button {
    background: #28a745;
    color: white;
}

.positive-button:hover {
    background: #218838;
    transform: scale(1.05);
}
</style>