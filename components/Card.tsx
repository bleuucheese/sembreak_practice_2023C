import prisma from "@/app/db";
import React from "react";
import Image from "next/image";
type Props = {
  productId: string;
};

async function Card({ productId }: Props) {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  return (
    <div className="flex gap-2">
      <Image
        width={200}
        height={200}
        className="w-20 h-20"
        alt={product?.title as string}
        src={product?.imageUrl as string}
      />
      <div className="flex flex-col">
        <p className="text-lg font-medium">{product?.title}</p>
        <p className="text-base text-gray-500 ">{product?.price}$</p>
      </div>
    </div>
  );
}

export default Card;
