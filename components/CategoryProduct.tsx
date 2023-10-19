"use client";
import { Product } from "@prisma/client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
type Props = { products: Product[] };

function CategoryProduct({ products }: Props) {
  const [title, setTitle] = useState("");
  return (
    <div className="flex items-center p-3 gap-3 flex-col">
      <div className="relative">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          id="floating_outlined"
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border border-red-400 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer"
          placeholder=" "
        />
        <label
          htmlFor="floating_outlined"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          Seach Product
        </label>
      </div>
      <div className="flex flex-wrap p-3 gap-3">
        {products
          .filter((product) => product.title.toLowerCase().includes(title.toLowerCase()))
          .map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="shadow-md flex flex-col items-center justify-center p-3 rounded-lg space-y-3 border border-gray-200 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <Image
                alt={product.title}
                width={200}
                height={300}
                className="object-contain rounded-md w-48 h-60"
                src={product.imageUrl!}
              />
              <p className="text-sm font-light">${product.price}</p>
              <h1 className="text-lg font-semibold">{product.title}</h1>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default CategoryProduct;
