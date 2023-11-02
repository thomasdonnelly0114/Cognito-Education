import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { setSearchTerm } from '../../redux/reducers/searchSlice';
import './style.scss';
import { RootState } from '../../redux/store';
function Header() {
  const dispatch = useDispatch();
  const basketItems = useSelector((state: RootState) => state.basket.items);

  const [term, setTerm] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  const performSearch = (searchTerm: string) => {
    dispatch(setSearchTerm(searchTerm));
  };

  const debouncedSearch = useCallback(
    _.debounce((searchTerm: string) => performSearch(searchTerm), 300),
    []
  );

  return (
    <header className="header px-50">
      <h1 className="header__title me-50">
        <Link to={'/'}>Supermarket</Link>
      </h1>
      <div className="header__search__container">
        <input
          type="text"
          className="header__search__input"
          value={term}
          onChange={handleChange}
          placeholder="Search..."
        />
        <div className="header__cart">
          <Link to="/basket">
            <img src={`/assets/add.png`} alt={'basket'} />
            {!!basketItems.length && <span className='header__cart__badge'>{basketItems.length}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
