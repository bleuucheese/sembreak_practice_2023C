import Image from "next/image";
import React from "react";
import prisma from "./db";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getCurrentUser } from "@/lib/getCurrentuser";
type Props = {};

async function HomePage({}: Props) {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  const user = await getCurrentUser();
  if (user) {
    return (
      <div className="flex items-center flex-wrap p-3 gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} user={user} />
        ))}
      </div>
    );
  }
  return (
    <div className="flex items-center flex-wrap p-3 gap-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default HomePage;
