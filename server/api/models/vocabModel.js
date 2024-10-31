import mongoose from "mongoose";

const VocabSchema = new mongoose.Schema(
    {
        english: {
            type: String,
            required: "English word is required"
        },
        german: {
            type: String,
            required: "German word is required"
        },
    },
    {
        collection: "vocab"
    }
);

export default mongoose.model("Vocab", VocabSchema);