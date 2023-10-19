import React from "react";
import prisma from "../db";
import { getCurrentUser } from "@/lib/getCurrentuser";
import Link from "next/link";
import Image from "next/image";
import ProductList from "@/components/ProductList";
type Props = {};

async function MyProductPage({}: Props) {
  const currentUser = await getCurrentUser();
  const products = await prisma.product.findMany({
    where: {
      userId: currentUser?.id,
    },
  });
  return (
    <>
      <div>MyProductPage</div>
      <div className="flex items-center flex-wrap p-3 gap-3">
        {products.map((product) => (
          <ProductList userId={currentUser?.id as string} product={product} />
        ))}
      </div>
    </>
  );
}

export default MyProductPage;
