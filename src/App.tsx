import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { fetchProducts } from './redux/reducers/productSlice';
import { AppDispatch, RootState } from './redux/store';
import ProductList from './components/ProductList';
import Header from './components/Header';
import Basket from './components/Basket';

import './style.scss';
import { Product } from './types';
import ProductItem from './components/ProductItem';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.products.status);
  const error = useSelector((state: RootState) => state.products.error);
  const products = useSelector((state: RootState) => state.products.items);
  const searchTerm = useSelector((state: RootState) => state.searchTerm);

  const filteredProducts = useMemo(() => {
    return products.filter((product: Product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, products]);
  console.log(filteredProducts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {status === 'loading' && <p>Loading...</p>}
                {status === 'failed' && <p>Error: {error}</p>}
                {status === 'succeeded' && (
                  <ProductList>
                    <>
                      {filteredProducts.map((product: Product) => (
                        <ProductItem key={product.id} product={product} showButton={true} />
                      ))}
                    </>
                  </ProductList>
                )}
              </>
            }
          />
          <Route path="/basket" element={<Basket />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
