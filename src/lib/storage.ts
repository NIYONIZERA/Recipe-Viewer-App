// Utility to manage recipes in localStorage
import { Recipe } from './types';

export function getStoredRecipes(): Recipe[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('customRecipes');
  return stored ? JSON.parse(stored) : [];
}

export function addStoredRecipe(recipe: Recipe) {
  const storedRecipes = getStoredRecipes();
  localStorage.setItem('customRecipes', JSON.stringify([...storedRecipes, recipe]));
}