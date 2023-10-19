"use client";
import React from "react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
type Props = { allIdsAndQuantities: any };

function CheckoutButton({ allIdsAndQuantities }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const checkout = async (allIdsAndQuantities: any) => {
    setIsLoading(true);
    const res = await fetch("/api/checkout", {
      body: JSON.stringify({ allIdsAndQuantities }),
      method: "POST",
    });
    if (!res.ok) {
      setIsLoading(false);
      toast.error("Something went wrong.");
      return;
    }
    const checkoutUrl = await res.json();
    router.push(checkoutUrl);
  };
  return (
    <Button disabled={isLoading} onClick={() => checkout(allIdsAndQuantities)}>
      {isLoading ? "Loading..." : "Checkout"}
    </Button>
  );
}

export default CheckoutButton;
