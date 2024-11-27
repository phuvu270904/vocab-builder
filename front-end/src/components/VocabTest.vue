<template>
  <div class="quiz-container">
    <!-- Progress and Score -->
    <div class="quiz-stats">
      <h2 class="progress-text">
        Progress: <span class="highlight">{{ currentProgress }}</span>/<span class="highlight">{{ words.length }}</span>
      </h2>
      <h2 class="score-text">
        Score: <span class="highlight">{{ score }}</span> out of <span class="highlight">{{ words.length }}</span>
      </h2>
    </div>

    <!-- Question Form -->
    <form action="#" @submit.prevent="onSubmit" class="quiz-form">
      <!-- Question -->
      <div class="form-group">
        <div v-if="questionType === 'text'" class="question-label">
          <i :class="languageFlags[promptLanguage]"></i> {{ capitalize(promptLanguage) }}
        </div>
        <input v-if="questionType === 'text'" type="text" class="form-input question-input" readonly
          :disabled="testOver" autocomplete="off" :value="currWord[promptLanguage]" />
        <button v-else type="button" class="ui button primary play-audio-button" @click="playAudio">
          <i class="volume up icon"></i> Listen
        </button>
      </div>

      <!-- Answer -->
      <div class="form-group">
        <div class="answer-label">
          <i :class="languageFlags[answerLanguage]"></i> {{ capitalize(answerLanguage) }}
        </div>
        <input type="text" placeholder="Enter word..." class="form-input answer-input" v-model="answer"
          :disabled="testOver" autocomplete="off" />
      </div>

      <!-- Submit Button -->
      <button class="ui button green positive-button" :disabled="testOver">
        Submit
      </button>
    </form>

    <!-- Results -->
    <p :class="['results', resultClass]">
      <span v-html="result"></span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'vocab-test',
  props: {
    words: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      // eslint-disable-next-line vue/no-mutating-props
      randWords: [...this.words.sort(() => 0.5 - Math.random())],
      incorrectGuesses: [],
      result: '',
      resultClass: '',
      answer: '',
      score: 0,
      currentProgress: 0,
      testOver: false,
      questionType: 'text', // Can be 'text' or 'audio'
      promptLanguage: 'english',
      answerLanguage: 'german',
      languageFlags: {
        english: 'united kingdom flag',
        german: 'germany flag',
        french: 'france flag',
      },
    };
  },
  computed: {
    currWord() {
      return this.randWords.length ? this.randWords[0] : '';
    },
  },
  methods: {
    onSubmit() {
      if (this.answer.toLowerCase() === this.currWord[this.answerLanguage].toLowerCase()) {
        this.flash('Correct!', 'success', { timeout: 1000 });
        this.score += 1;
      } else {
        this.flash('Wrong!', 'error', { timeout: 1000 });
        this.incorrectGuesses.push(`${this.currWord[this.promptLanguage]} (${this.currWord[this.answerLanguage]})`);
      }

      this.currentProgress += 1;
      this.answer = '';
      this.randWords.shift();

      if (this.randWords.length === 0) {
        this.testOver = true;
        this.displayResults();
      } else {
        this.pickQuestionType();
        this.pickLanguages();
      }
    },
    pickQuestionType() {
      // Randomly decide if the question will be "text" or "audio"
      this.questionType = Math.random() < 0.5 ? 'text' : 'audio';
    },
    pickLanguages() {
      // Randomly pick a prompt and answer language
      const languages = ['english', 'german', 'french'];
      const shuffled = [...languages.sort(() => 0.5 - Math.random())];
      this.promptLanguage = shuffled[0];
      this.answerLanguage = shuffled[1];
    },
    playAudio() {
      if (this.questionType === 'audio') {
        this.speak(this.promptLanguage, this.currWord[this.promptLanguage]);
      }
    },
    speak(lang, text) {
      const msg = new SpeechSynthesisUtterance();
      msg.text = text;
      msg.lang = lang;
      window.speechSynthesis.speak(msg);
    },
    displayResults() {
      if (this.incorrectGuesses.length === 0) {
        this.result = 'You got everything correct. Well done!';
        this.resultClass = 'success';
      } else {
        const incorrect = this.incorrectGuesses.join(', ');
        this.result = `<strong>You got the following wrong:</strong> ${incorrect}`;
        this.resultClass = 'error';
      }
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
  mounted() {
    this.pickQuestionType();
    this.pickLanguages();
  },
};
</script>

<style scoped>
.results {
  margin: 25px auto;
  padding: 15px;
  border-radius: 5px;
}

.error {
  border: 1px solid #ebccd1;
  color: #a94442;
  background-color: #f2dede;
}

.success {
  border: 1px solid #d6e9c6;
  color: #3c763d;
  background-color: #dff0d8;
}

.ui.label {
  width: 150px;
}
/* Quiz Container */
.quiz-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

/* Progress and Score */
.quiz-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.progress-text,
.score-text {
  font-size: 1.25rem;
  font-weight: bold;
  color: #444;
}

.highlight {
  color: #2575fc;
  font-weight: bold;
}

/* Form Styling */
.quiz-form .form-group {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.question-label,
.answer-label {
  flex-shrink: 0;
  width: 100px;
  font-size: 1rem;
  font-weight: bold;
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

.play-audio-button {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
}

.play-audio-button:hover {
  background: linear-gradient(135deg, #2575fc 0%, #6a11cb 100%);
  transform: scale(1.05);
}

/* Submit Button */
.positive-button {
  margin-top: 1rem;
  width: 100%;
  background: #28a745;
  color: white;
}

.positive-button:hover {
  background: #218838;
  transform: scale(1.05);
}

.positive-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* Results */
.results {
  margin-top: 1.5rem;
  padding: 1rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;
}

.results.success {
  color: #28a745;
}

.results.error {
  color: #d9534f;
}
</style>
