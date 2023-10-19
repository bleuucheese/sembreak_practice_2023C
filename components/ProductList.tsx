"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@prisma/client";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
type Props = {
  product: Product;
  userId: string;
};

function ProductList({ product, userId }: Props) {
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const router = useRouter();
  const [data, setData] = useState({
    title: product.title,
    id: product.id,
    imageUrl: product.imageUrl,
    price: product.price,
    userId: userId,
    category: product.category,
  });
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const updateProduct = async () => {
    const res = await fetch("/api/product", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    setIsUpdating(true);
    if (!res.ok) {
      toast.error("Something went wrong.");
      setIsUpdating(false);
      return;
    }
    console.log(res);
    toast.success("Product updated successfully");
    setIsUpdating(false);
    setIsOpenUpdateModal(false);
    router.refresh();
  };
  const deleteProduct = async () => {
    const res = await fetch("/api/product", {
      method: "DELETE",
      body: JSON.stringify(data.id),
    });
    if (!res.ok) {
      toast.error("Something went wrong.");
      setIsUpdating(false);
      return;
    }
    console.log(res);
    toast.success("Product deleted successfully");
    setIsOpenUpdateModal(false);
    router.refresh();
  };
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      {isOpenUpdateModal ? (
        <div className="shadow-md flex flex-col items-center justify-center p-3 rounded-lg space-y-3 border border-gray-200 relative">
          {data.imageUrl ? (
            <div className="relative">
              <Image
                alt={data.title}
                width={200}
                height={300}
                className="object-contain rounded-md w-48 h-60"
                src={data.imageUrl!}
              />
              <span
                className="absolute top-10 -right-3 cursor-pointer"
                onClick={() => setData({ ...data, imageUrl: "" })}
              >
                X
              </span>
            </div>
          ) : (
            <>
              {file ? (
                <>
                  <Image
                    alt="Product image"
                    width={200}
                    height={150}
                    src={URL.createObjectURL(file)}
                  />
                  <div className="h-2 border-2 w-[200px] rounded-lg">
                    <div
                      className="h-2 bg-black transition-all duration-300 rounded-lg"
                      style={{ width: `${currentProgress}%` }}
                    />
                  </div>
                  <button
                    className="bg-black text-white p-2 rounded-lg"
                    type="button"
                    onClick={async () => {
                      if (file) {
                        setIsUploading(true);
                        const res = await edgestore.publicImages.upload({
                          file,
                          onProgressChange: (progress) => {
                            setCurrentProgress(progress);
                          },
                        });
                        console.log(res);
                        setData({ ...data, imageUrl: res.url });
                        toast.success("Image Uploaded.");
                        setIsUploading(false);
                      }
                    }}
                  >
                    {isUploading ? "Loading..." : "Upload"}
                  </button>
                </>
              ) : (
                <input
                  type="file"
                  onChange={(e) => {
                    setFile(e.target.files?.[0]);
                  }}
                />
              )}
            </>
          )}
          <input
            type="text"
            name=""
            id=""
            value={data.price}
            className="border p-2"
            onChange={(e) => setData({ ...data, price: e.target.value })}
          />
          <input
            type="text"
            name=""
            id=""
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="border p-2"
          />
        </div>
      ) : (
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
      )}
      <div className="flex items-center gap-2">
        {isOpenUpdateModal ? (
          <>
            <button
              className="bg-red-500 text-white p-2 rounded-md"
              onClick={() => setIsOpenUpdateModal(false)}
            >
              Cancel
            </button>
            <button
              onClick={updateProduct}
              disabled={isUpdating}
              className="bg-green-500 text-white p-2 rounded-md"
            >
              {isUpdating ? "Loading..." : "Save"}
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-green-500 text-white p-2 rounded-md"
              onClick={() => setIsOpenUpdateModal(true)}
            >
              Update
            </button>
            <button
              onClick={deleteProduct}
              className="bg-red-500 text-white p-2 rounded-md"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductList;
