export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

export interface ProductState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
