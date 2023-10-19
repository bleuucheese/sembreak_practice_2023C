"use client";
import { useEdgeStore } from "@/lib/edgestore";
import React, { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
type Props = {};

function Addproductpage({}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    title: "",
    price: "",
    imageUrl: "",
    category: "CPUs",
  });  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data.title || !data.price || !data.imageUrl) {
      toast.error("Please fill in all the blank");
      return;
    }
    setIsLoading(true);
    const res = await fetch("/api/product", {
      body: JSON.stringify(data),
      method: "POST",
    });

    if (!res.ok) {
      toast.error("Something went wrong.");
      setIsLoading(false);
      return;
    }

    toast.success("Product created.");
    setIsLoading(false);
    setData({ title: "", imageUrl: "", price: "", category: "CPUs" });
    setFile(undefined);
  };
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  console.log(data)
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 w-[90%] sm:w-[70%] md:w-[50%] mx-auto p-3 mt-5 rounded-lg shadow-md border border-gray-200"
    >
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center">
        Add Product
      </h1>
      <label htmlFor="title">Title</label>
      <input
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
        type="title"
        name="text"
        id=""
        className="border border-red-400 rounded-lg p-3"
        placeholder="Enter Title"
      />
      <label htmlFor="price">Price</label>
      <input
        value={data.price}
        onChange={(e) => setData({ ...data, price: e.target.value })}
        type="text"
        name="price"
        id=""
        className="border border-red-400 rounded-lg p-3"
        placeholder="Enter Price"
      />
      <select
        name="category"
        onChange={(e) => setData({ ...data, category: e.target.value })}
      >
        <option value="CPUs">CPUs</option>
        <option value="GPUs">GPUs</option>
        <option value="MONITOR">MONITOR</option>
        <option value="KEYBOARD">KEYBOARD</option>
        <option value="PHONE">PHONE</option>
        <option value="TABLET">TABLET</option>
      </select>
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
        </>
      ) : (
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files?.[0]);
          }}
        />
      )}

      <button
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
        {isUploading ? (
          <div role="status" className="flex justify-center">
            <svg
              aria-hidden="true"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          "Upload"
        )}
      </button>

      <button disabled={isLoading} className="bg-orange-400 p-3" type="submit">
        {isLoading ? "Loading..." : "Create"}
      </button>
    </form>
  );
}

export default Addproductpage;
