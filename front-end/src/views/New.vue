<template>
    <div class="new-word-container">
        <h1 class="new-word-title">New Word</h1>
        <word-form @createOrUpdate="createOrUpdate"></word-form>
    </div>
</template>

<script>
import WordForm from '../components/WordForm.vue';
import { api } from '../helpers/helpers';

export default {
    name: 'new-word',
    components: {
        'word-form': WordForm
    },
    methods: {
        createOrUpdate: async function (word) {
            const res = await api.createWord(word);
            this.flash('Word created', 'success');
            this.$router.push(`/words/${res._id}`);
        }
    }
};
</script>

<style scoped>
.new-word-container {
  margin: 2rem auto;
  padding: 1rem;
  max-width: 800px;
  background: #ffffff;
}

.new-word-title {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    color: #2575fc;
    margin-bottom: 1rem;
}
</style>