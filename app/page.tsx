import CreateProductFav from "./products/create-product/create-product-fav";
import Products from "./products/products";

export default async function Home() {

  return (
    <>
      <Products />
      <CreateProductFav />
    </>
  );
}
