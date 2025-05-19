import { Recipe } from './types';

export function getStoredRecipes(): Recipe[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('customRecipes');
  return stored ? JSON.parse(stored) : [];
}