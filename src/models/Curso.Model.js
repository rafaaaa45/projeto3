// models/user.js
import mongoose from 'mongoose';

const cursoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true
  },
  media: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  cadeirasIngresso: {
    type: [String],
    required: true
  },
  percentagemExame: {
    type: Number,
    required: true
  },
});

export default mongoose.model('Curso', cursoSchema);
