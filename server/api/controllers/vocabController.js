import Vocab from "../models/vocabModel.js";

export const list_all_words = async (req, res) => {
    try {
        const vocabs = await Vocab.find({});
        res.json(vocabs);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const create_a_word = async (req, res) => {
    const new_word = new Vocab(req.body);
    try {
        new_word.save();
        res.json(new_word);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const read_a_word = async (req, res) => {
    try {
        const word = await Vocab.findById(req.params.wordId);
        res.json(word);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const update_a_word = async (req, res) => {
    try {
        const word = await Vocab.findByIdAndUpdate(req.params.wordId, req.body, { new: true });
        res.json(word);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const delete_a_word = async (req, res) => {
    try {
        await Vocab.deleteOne({ _id: req.params.wordId });
        res.json({ message: "Word successfully deleted" });
    } catch (err) {
        res.status(500).send(err);
    }
}