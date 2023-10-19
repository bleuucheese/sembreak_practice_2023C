"use client";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/useModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
type Props = {};

function RegisterModal({}: Props) {
  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === "Register";
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const router = useRouter();
  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data.username || !data.password || !data.email) {
      toast.error("Please fill in all the blank");
      return;
    }
    setIsLoading(true);
    const res = await fetch("/api/register", {
      body: JSON.stringify(data),
      method: "POST",
    });

    if (!res.ok) {
      toast.error("Account already existed.");
      setIsLoading(false);
      return;
    }

    toast.success("Account created.");
    setIsLoading(false);
    setData({ username: "", password: "", email: "" });
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>Create Your Own Account</DialogDescription>
        </DialogHeader>
        <form onSubmit={register} className="flex flex-col gap-3">
          <div className="relative">
            <input
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              type="text"
              id="floating_outlined"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border border-red-400 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_outlined"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Email
            </label>
          </div>
          <div className="relative">
            <input
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              type="text"
              id="floating_outlined"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border border-red-400 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_outlined"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Username
            </label>
          </div>
          <div className="relative">
            <input
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              type="password"
              id="floating_outlined"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border border-red-400 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_outlined"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Password
            </label>
          </div>
          <Button
            disabled={isLoading}
            className="bg-orange-400 p-3"
            type="submit"
          >
            {isLoading ? "Loading..." : "Register"}
          </Button>
          <div className="flex items-center my-3">
            <hr className="h-0.5 bg-black w-full" />
            <p className="px-2">OR</p>
            <hr className="h-0.5 bg-black w-full" />
          </div>
          <Button
            className="bg-orange-400 p-3"
            onClick={() => signIn("google")}
            type="button"
          >
            Sign In with Google
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default RegisterModal;
