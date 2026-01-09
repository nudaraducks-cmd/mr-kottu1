
export interface DishInfo {
  id: string;
  name: string;
  description: string;
  price: string;
  calories: string;
  ingredients: string[];
  allergens: string[];
  pairing?: string;
}

export interface ARState {
  isActive: boolean;
  detectedDish: DishInfo | null;
  isScanning: boolean;
  error: string | null;
}

export enum AppMode {
  HOME = 'HOME',
  SCANNER = 'SCANNER',
  PRINT = 'PRINT'
}
