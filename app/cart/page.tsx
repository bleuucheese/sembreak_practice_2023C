import { getCurrentUser } from "@/lib/getCurrentuser";
import React from "react";
import prisma from "../db";
import Image from "next/image";
import CartProducts from "@/components/CartProducts";
type Props = {};

async function CartPage({}: Props) {
  const user = await getCurrentUser();
  const products = await prisma.product.findMany({
    where: {
      cart: {
        has: user?.cartId,
      },
    },
  });
  if (products.length === 0) {
    return <div>Cart is Empty</div>;
  }
  return <CartProducts products={products} />;
}

export default CartPage;
