import './style.scss';

const ProductList = ({
  children,
}: {
  children: React.PropsWithChildren<React.ReactNode>;
}) => {
  return <div className="products-container mx-50 my-30">{children}</div>;
};

export default ProductList;
