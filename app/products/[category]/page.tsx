import prisma from "@/app/db";
import { Category } from "@prisma/client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import CategoryProduct from "@/components/CategoryProduct";
type Props = {
  params: {
    category: Category;
  };
};

async function CategoryProductPage({ params: { category } }: Props) {
  const products = await prisma.product.findMany({
    where: {
      category,
    },
  });

  if (!products) {
    return <div>Product not Found</div>;
  }
  return <CategoryProduct products={products} />;
}

export default CategoryProductPage;
