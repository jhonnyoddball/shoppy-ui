"use client";

import { Card, CardActionArea, Stack, Typography } from "@mui/material";
import { Product as Iprod } from "./interfaces/product.interface";
import Image from "next/image";
import { getProductImage } from "./product-image";
import { useRouter } from "next/navigation";

interface ProductProps {
  product: Iprod;
}

export default function Product({ product }: ProductProps) {
  const router = useRouter();

  return (
    <CardActionArea onClick={() => router.push(`/products/${product.id}`)}>
      <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Stack gap={3}>
          <Typography variant="h4" sx={{ mb: 1 }}>{product.name}</Typography>
          {
            product.imageExists && (
              <Image
                src={getProductImage(product.id)}
                alt={product.name}
                width="0"
                height="0"
                className="w-full h-auto"
                sizes="100vw"
              />
            )
          }
          <Typography variant="body1" sx={{ flex: 1 }}>{product.description}</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>${product.price}</Typography>
        </Stack>
      </Card>
    </CardActionArea>
  );
}
