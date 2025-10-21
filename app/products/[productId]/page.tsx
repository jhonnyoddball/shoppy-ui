import { Box } from "@mui/material";
import getProduct from "./get-product";
import Image from "next/image";
import { getProductImage } from "../product-image";
import Checkout from "@/app/checkout/checkout";

interface SingleProductProps {
  params: { productId: number };
}

export default async function SingleProduct({ params }: SingleProductProps) {
  const product = await getProduct(Number(params.productId));
  console.log(product);
  return (
    <Box
      component="section"
      sx={{
        display: 'grid',
        gap: 4,
        gridTemplateColumns: {
          xs: '1fr',
          md: 'repeat(2, 1fr)'
        }
      }}
    >
      {
        product.imageExists && (
          <Box>
            <Image
              src={getProductImage(+product.id)}
              alt={product.name}
              width="0"
              height="0"
              className="w-full sm:w-3/4 h-auto"
              sizes="100vw"
            />
          </Box>
        )
      }

      <Box>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <h2>${product.price.toFixed(2)}</h2>
        <Checkout productId={+product.id} />
      </Box>
    </Box>
  );
}
