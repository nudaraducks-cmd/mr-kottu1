
import React from 'react';
import { DishInfo } from './types';

export const SAMPLE_DISHES: DishInfo[] = [
  {
    id: 'dish_1',
    name: 'Truffle Ribeye Steak',
    description: 'Prime cut ribeye aged for 28 days, served with black truffle butter and roasted asparagus.',
    price: '$42.00',
    calories: '850 kcal',
    ingredients: ['Prime Ribeye', 'Black Truffle', 'Butter', 'Asparagus', 'Sea Salt'],
    allergens: ['Dairy'],
    pairing: 'Cabernet Sauvignon'
  },
  {
    id: 'dish_2',
    name: 'Lobster Risotto',
    description: 'Creamy Arborio rice with fresh Atlantic lobster chunks, saffron, and aged parmesan.',
    price: '$38.00',
    calories: '620 kcal',
    ingredients: ['Arborio Rice', 'Lobster', 'Saffron', 'Parmesan', 'Shallots'],
    allergens: ['Shellfish', 'Dairy'],
    pairing: 'Chardonnay'
  }
];

export const SYSTEM_PROMPT = `You are a high-end restaurant AI concierge. 
Analyze the image provided (which is a restaurant menu). 
Identify the dish the user is pointing at. 
Provide a rich, appetizing description, nutritional info, and a wine pairing suggestion.
Respond in a JSON format matching the DishInfo structure.`;
