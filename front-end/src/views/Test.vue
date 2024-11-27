<template>
  <div class="test-container">
    <h1 class="test-title">Test</h1>

    <div v-if="words.length < 5">
      <p>You need to enter at least five words to begin the test</p>
    </div>
    <div v-else>
      <vocab-test :words="words"></vocab-test>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';
import VocabTest from '../components/VocabTest.vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Test',
  components: {
    'vocab-test': VocabTest
  },
  data() {
    return {
      words: []
    };
  },
  async mounted() {
    this.words = await api.getWords();
  }
};
</script>

  <style scoped>
.test-container {
  margin: 2rem auto;
  padding: 1rem;
  max-width: 800px;
  background: #ffffff;
}

.test-title {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    color: #2575fc;
    margin-bottom: 1rem;
}
</style>