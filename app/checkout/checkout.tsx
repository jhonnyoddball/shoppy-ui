"use client"

import { Button } from "@mui/material";
import checkout from "./actions/checkout";
import { useState } from "react";

interface CheckoutProps {
  productId: number;
}

export default function Checkout({ productId }: CheckoutProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const response = await checkout(productId);
      
      if (response.error) {
        console.error('Checkout error:', response.error);
        alert('Failed to create checkout session: ' + response.error);
        return;
      }

      // Modern Stripe approach: redirect directly to session.url
      if (response.data?.url) {
        window.location.href = response.data.url;
      } else {
        console.error('No checkout URL received');
        alert('Failed to get checkout URL');
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('An error occurred during checkout');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button 
      variant="contained" 
      className="max-w-[25%]" 
      onClick={handleCheckout}
      disabled={loading}
    >
      {loading ? 'Processing...' : 'Buy Now'}
    </Button>
  );
}
