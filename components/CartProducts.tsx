"use client";
import { Product } from "@prisma/client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CheckoutButton from "./CheckoutButton";
type Props = {
  products: Product[];
};

function CartProducts({ products }: Props) {
  const [attributes, setAttributes] = useState(
    Object.fromEntries(products.map((product) => [product.id, 1]))
  );
  const allIdsAndQuantities = Object.entries(attributes);
  const router = useRouter();
  const removeFromCart = async (productId: string) => {
    const res = await fetch("/api/removeFromCart", {
      method: "PATCH",
      body: JSON.stringify(productId),
    });
    if (!res.ok) {
      toast.error("Something went wrong.");
      return;
    }
    toast.success("Product removed your cart.");
    router.refresh();
  };
  return (
    <div className="flex flex-col gap-3 items-center justify-center p-3">
      {products.map((product) => (
        <div key={product.id} className="flex items-center">
          <Image
            width={250}
            height={150}
            alt={product.title as string}
            src={product.imageUrl as string}
            className="w-40 h-44"
          />
          <h1 className="w-32 text-center font-bold">{product.title}</h1>
          <div className="flex items-center gap-2 my-2">
            <Minus
              className="cursor-pointer w-4 h-4"
              onClick={() => {
                if (attributes[product.id] === 1) {
                  return;
                }
                const newAttributes = { ...attributes };
                newAttributes[product.id] -= 1;
                setAttributes(newAttributes);
              }}
            />
            {attributes[product.id]}
            <Plus
              className="cursor-pointer w-4 h-4"
              onClick={() => {
                const newAttributes = { ...attributes };
                newAttributes[product.id] += 1;
                setAttributes(newAttributes);
              }}
            />
          </div>
          <Button
            onClick={() => removeFromCart(product.id)}
            variant={"destructive"}
            className="ml-3"
          >
            Delete
          </Button>
          <p className="ml-3">
            {" "}
            Price: {parseInt(product?.price) * attributes[product.id]}$
          </p>
        </div>
      ))}
      <CheckoutButton allIdsAndQuantities={allIdsAndQuantities} />
    </div>
  );
}

export default CartProducts;
