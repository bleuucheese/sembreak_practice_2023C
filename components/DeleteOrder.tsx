"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Props = { orderId: string };

function DeleteOrder({ orderId }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const deleteOrder = async () => {
    setIsLoading(true);
    const res = await fetch("/api/deleteOrder", {
      method: "DELETE",
      body: JSON.stringify(orderId),
    });

    if (!res.ok) {
      toast.error("Error deleting order.");
      setIsLoading(false);
      return;
    }
    toast.success("Error deleting order.");
    setIsLoading(false);
    router.refresh();
  };
  return (
    <Button variant={"destructive"} onClick={deleteOrder} disabled={isLoading} className="mt-4">
      {isLoading ? "Loading..." : "Delete"}
    </Button>
  );
}

export default DeleteOrder;
