
import { DishInfo } from './types';

export const SYSTEM_PROMPT = `You are an AR Menu Specialist. 
Analyze the provided image of a restaurant menu page. 
1. Identify the Restaurant Name.
2. Extract EVERY dish/item listed on this page.
3. For each item, provide a rich description, price, ingredients, and potential wine/drink pairings.
4. Provide a short, welcoming summary of this menu section.
Respond ONLY in a JSON format matching the MenuAnalysis structure.`;

// Fix: Added SAMPLE_DISHES export to resolve the module error in PrintableMenu.tsx
export const SAMPLE_DISHES: DishInfo[] = [
  {
    id: '1',
    name: 'Wild Mushroom Risotto',
    description: 'Creamy Arborio rice slow-cooked with a medley of forest mushrooms, finished with truffle oil and aged parmesan.',
    price: '$28',
    calories: '520 kcal',
    ingredients: ['Arborio Rice', 'Mushrooms', 'Truffle Oil', 'Parmesan', 'Shallots'],
    allergens: ['Dairy'],
    pairing: 'Chardonnay or Earthy Pinot Noir'
  },
  {
    id: '2',
    name: 'Pan-Seared Scallops',
    description: 'Jumbo sea scallops served over a velvet parsnip purée with crispy pancetta and a lemon-herb gremolata.',
    price: '$34',
    calories: '380 kcal',
    ingredients: ['Sea Scallops', 'Parsnip', 'Pancetta', 'Lemon', 'Parsley'],
    allergens: ['Shellfish'],
    pairing: 'Sauvignon Blanc or Sparkling Wine'
  },
  {
    id: '3',
    name: 'Herb-Crusted Rack of Lamb',
    description: 'Tender lamb rack with a dijon and herb crust, served with roasted root vegetables and a rosemary reduction.',
    price: '$42',
    calories: '740 kcal',
    ingredients: ['Lamb', 'Rosemary', 'Dijon Mustard', 'Breadcrumbs', 'Root Vegetables'],
    allergens: ['Gluten'],
    pairing: 'Cabernet Sauvignon or Syrah'
  }
];
