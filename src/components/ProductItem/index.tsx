import React from 'react';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../../redux/reducers/backetSlice';
import { Product } from '../../types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './style.scss';

function ProductItem({
  product,
  showButton = true,
}: {
  product: Product;
  showButton: boolean;
}) {
  const dispatch = useDispatch();

  const handleAddToBasket = () => {
    dispatch(addToBasket(product));
  };

  return (
    <div className="product-item">
      <div className="product-item__image">
        <LazyLoadImage
          alt={product.name}
          src={`/assets/back.jpg`}
          effect="blur"
        />

        <div className="thumbnail-detail">{product.description}</div>
      </div>
      <h3 className="product-item__title">{product.name}</h3>
      <span className="product-item__price mb-20"> ${product.price}</span>
      {!!showButton && (
        <button onClick={handleAddToBasket} className="product-item__add">
          Add to Basket
        </button>
      )}
    </div>
  );
}

export default ProductItem;
