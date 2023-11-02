import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Product } from '../../types';
import { RootState } from '../../redux/store';
import ProductItem from '../ProductItem';
import './style.scss'

function Basket() {
  const items = useSelector((state: RootState) => state.basket.items);
  const searchTerm = useSelector((state: RootState) => state.searchTerm);

  const filteredItems = useMemo(() => {
    return items.filter((item: Product) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);
  
  return (
    <div className="basket-container px-50 py-50">
      {filteredItems.map((item: Product, index) => (
        <ProductItem key={item.id} product={item} showButton={false} />
      ))}
    </div>
  );
}

export default Basket;
