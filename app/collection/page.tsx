import { getCurrentUser } from "@/lib/getCurrentuser";
import React from "react";
import prisma from "../db";
import ProductCard from "@/components/ProductCard";

type Props = {};

async function CollectionPage({}: Props) {
  const user = await getCurrentUser();

  const products = await prisma.product.findMany({
    where: {
      collection: {
        has: user?.collectionId,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  return (
    <div className="flex items-center flex-wrap p-3 gap-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} user={user!} />
      ))}
    </div>
  );
}

export default CollectionPage;
