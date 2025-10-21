"use client";

import { Box } from "@mui/material";
import { Product as IProd } from "./interfaces/product.interface";
import Product from "./product";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { API_URL } from "../common/constants/api";
import revalidateProducts from "./actions/revalidate-products";
import getAuthentication from "../auth/actions/get-authentication";

interface ProductsGridProps {
  products: IProd[];
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  useEffect(() => {
    let socket: Socket | null = null;

    const createSocket = async () => {
      socket = io(API_URL!, {
        auth: {
          Authentication: await getAuthentication(),
        },
      });

      socket.on("productUpdated", () => {
        console.log("Product updated");
        revalidateProducts();
      });
    }
    createSocket();

    return () => {
      socket?.disconnect();
    }
  }, []);

  return (
    <Box
      component="section"
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)'
        }
      }}
    >
      {products.map((product) => (
        <Box key={product.id} sx={{ display: 'flex' }}>
          <Product product={product} />
        </Box>
      ))}
    </Box>
  );
}
