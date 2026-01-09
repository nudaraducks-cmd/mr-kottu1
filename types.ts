
export interface DishInfo {
  id: string;
  name: string;
  description: string;
  price: string;
  calories?: string;
  ingredients: string[];
  allergens: string[];
  pairing?: string;
}

export interface MenuAnalysis {
  restaurantName: string;
  dishes: DishInfo[];
  summary: string;
}

export enum AppMode {
  HOME = 'HOME',
  SCANNER = 'SCANNER',
  PRINT = 'PRINT'
}
