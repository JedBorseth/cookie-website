import { useRouter } from "next/router";

const Product = () => {
  const router = useRouter();
  const { product } = router.query;

  return <p>Product: {product}</p>;
};

export default Product;
