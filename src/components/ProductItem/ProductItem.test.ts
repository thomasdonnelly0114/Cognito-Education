import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AnyAction } from 'redux';
import '@testing-library/jest-dom/extend-expect';
import ProductItem from '.';
import { addToBasket } from '../../redux/reducers/backetSlice';
import { Product } from '../../types';
import { RootState } from '../../redux/store';

type State = RootState
const middlewares: never[] = [];
const mockStore = configureStore<State, AnyAction>(middlewares);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
}));

describe('<ProductItem />', () => {
  const product: Product = {
    id: 1,
    name: 'Test Product',
    price: 100,
    description: 'Test Description'
  };

  it('renders with product data', () => {
    const store = mockStore();
    render(
      <Provider store={store}>
        <ProductItem product={product} showButton={true} />
      </Provider>
    );

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByAltText(product.name)).toHaveAttribute('src', '/assets/back.jpg');
  });

  it('conditionally renders the "Add to Basket" button based on showButton prop', () => {
    const store = mockStore();
    const { rerender } = render(
      <Provider store={store}>
        <ProductItem product={product} showButton={true} />
      </Provider>
    );

    expect(screen.getByRole('button', { name: 'Add to Basket' })).toBeInTheDocument();

    rerender(
      <Provider store={store}>
        <ProductItem product={product} showButton={false} />
      </Provider>
    );

    expect(screen.queryByRole('button', { name: 'Add to Basket' })).not.toBeInTheDocument();
  });

  it('dispatches addToBasket action when "Add to Basket" button is clicked', () => {
    const store = mockStore();
    render(
      <Provider store={store}>
        <ProductItem product={product} showButton={true} />
      </Provider>
    );

    fireEvent.click(screen.getByText('Add to Basket'));

    const actions = store.getActions();
    expect(actions[0]).toEqual(addToBasket(product));
  });
});
