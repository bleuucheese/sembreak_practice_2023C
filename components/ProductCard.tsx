"use client";
import { Product, User } from "@prisma/client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { ShoppingCart, Trash } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
type Props = {
  product: Product;
  user?: User;
};

function ProductCard({ product, user }: Props) {
  const router = useRouter();
  const addToCollection = async () => {
    const res = await fetch("/api/addToCollection", {
      method: "PATCH",
      body: JSON.stringify(product.id),
    });
    if (!res.ok) {
      toast.error("Something went wrong.");
      return;
    }
    toast.success("Product added to your collection.");
    router.refresh();
  };
  const removeFromCollection = async () => {
    const res = await fetch("/api/removeFromCollection", {
      method: "PATCH",
      body: JSON.stringify(product.id),
    });
    if (!res.ok) {
      toast.error("Something went wrong.");
      return;
    }
    toast.success("Product removed from your collection.");
    router.refresh();
  };
  const addToCart = async () => {
    const res = await fetch("/api/addToCart", {
      method: "PATCH",
      body: JSON.stringify(product.id),
    });
    if (!res.ok) {
      toast.error("Something went wrong.");
      return;
    }
    toast.success("Product added to your cart.");
    router.refresh();
  };
  const removeFromCart = async () => {
    const res = await fetch("/api/removeFromCart", {
      method: "PATCH",
      body: JSON.stringify(product.id),
    });
    if (!res.ok) {
      toast.error("Something went wrong.");
      return;
    }
    toast.success("Product removed your cart.");
    router.refresh();
  };
  return (
    <div
      key={product.id}
      className="shadow-md flex flex-col items-center justify-center p-3 rounded-lg space-y-3 border border-gray-200 relative"
    >
      <div className="flex items-center justify-between w-full">
        {product.cart.includes(user?.cartId as string) ? (
          <Trash className="cursor-pointer w-6 h-6" onClick={removeFromCart} />
        ) : (
          <ShoppingCart
            className="cursor-pointer w-6 h-6"
            onClick={addToCart}
          />
        )}
        {product.collection.includes(user?.collectionId as string) ? (
          <svg
            onClick={removeFromCollection}
            className=" cursor-pointer w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        ) : (
          <svg
            onClick={addToCollection}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="cursor-pointer w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        )}
      </div>

      <Image
        alt={product.title}
        width={200}
        height={300}
        className="object-contain rounded-md w-48 h-60"
        src={product.imageUrl!}
      />
      <p className="text-sm font-light">${product.price}</p>
      <h1 className="text-lg font-semibold">{product.title}</h1>
      <Link href={`/product/${product.id}`}>
        <Button>Read more</Button>
      </Link>
    </div>
  );
}

export default ProductCard;
