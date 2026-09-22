const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  calories: { type: Number, required: true },
  proteinGrams: { type: Number, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: [{ type: String, required: true }],
  isFunRecipe: { type: Boolean, default: true } // Ej: Jamón de beterraga
});

module.exports = mongoose.model('Recipe', RecipeSchema);