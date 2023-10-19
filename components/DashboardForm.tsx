"use client";
import { User } from "@prisma/client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
type Props = {
  user: User;
};

function DashboardForm({ user }: Props) {
  const router = useRouter();
  const [data, setData] = useState({
    name: user.name,
    email: user.email,
    image: user.image,
  });
    console.log(data.image);
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("/api/updateAccount", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      toast.error("Something went wrong.");
      setIsLoading(false);
      return;
    }
    toast.success("Account updated.");
    setIsLoading(false);
    router.refresh();
  };
  return (
    <form onSubmit={updateUser} className="flex flex-col gap-2">
      {data.image ? (
        <div className="relative w-32 h-32 mx-auto mt-4">
          <Image
            fill
            alt={data.name as string}
            src={data.image as string}
            className="rounded-full"
          />
          <span
            onClick={() =>
              setData({
                ...data,
                image: "",
              })
            }
            className="w-6 h-6 rounded-full absolute top-0 right-0 cursor-pointer bg-white flex items-center justify-center"
          >
            <X className=" w-4 h-4 text-black" />
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 mt-4">
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

          <Button
            disabled={isUploading}
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
                setData({ ...data, image: res.url });
                setIsUploading(false);
                toast.success("Image uploaded.");
              }
            }}
          >
            {isUploading ? "Loading..." : "Upload"}
          </Button>
        </div>
      )}
      <Button disabled={isLoading} type="submit" className="mx-auto">
        {isLoading ? "Loading..." : "Save"}
      </Button>
    </form>
  );
}

export default DashboardForm;
