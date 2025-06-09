import mongoose from 'mongoose';

const SynonymSchema = new mongoose.Schema({
  key: { type: String, required: true },
  synonyms: { type: [String], required: true },
});

export default mongoose.model('Synonym', SynonymSchema);
