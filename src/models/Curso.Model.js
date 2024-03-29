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
  cadeiraIngresso: {
    type: [String],
    required: true
  },
  percentagemExame: {
    type: Number,
    required: true
  },
  examesObrigatorio: {
    type: Boolean,
    required: true
  },
});

export default mongoose.model('Curso', cursoSchema);
