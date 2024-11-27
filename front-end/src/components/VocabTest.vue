<template>
  <div>
    <h2>Progress: {{ currentProgress }}/{{ words.length }}</h2>
    <h2>Score: {{ score }} out of {{ words.length }}</h2>

    <form action="#" @submit.prevent="onSubmit">
      <div class="ui labeled input fluid">
        <div v-if="questionType === 'text'" class="ui label">
          <i :class="languageFlags[promptLanguage]"></i> {{ capitalize(promptLanguage) }}
        </div>
        <input
          v-if="questionType === 'text'"
          type="text"
          readonly
          :disabled="testOver"
          autocomplete="off"
          :value="currWord[promptLanguage]"
        />
        <button
          v-else
          type="button"
          class="ui labeled icon button"
          @click="playAudio"
        >
          <i class="volume up icon"></i> Listen
        </button>
      </div>

      <!-- Answer input -->
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i :class="languageFlags[answerLanguage]"></i> {{ capitalize(answerLanguage) }}
        </div>
        <input
          type="text"
          placeholder="Enter word..."
          v-model="answer"
          :disabled="testOver"
          autocomplete="off"
        />
      </div>

      <button class="positive ui button" :disabled="testOver">Submit</button>
    </form>

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
</style>
