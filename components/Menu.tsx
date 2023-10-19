"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { User } from "@prisma/client";
type Props = {
  user: User;
};

function Menu({ user }: Props) {
  const dropdownMenu = [
    {
      href: "/addProduct",
      title: "Add Product",
    },
    {
      href: "/myProduct",
      title: "My Product",
    },
    {
      href: "/dashboard",
      title: "Dashboard",
    },
    {
      href: "/collection",
      title: "Collection",
    },
    { href: "/cart", title: "Cart" },
    {
      href: "/orders",
      title: "Orders",
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src={user.image as string}
          alt={user.name as string}
          width={70}
          height={50}
          className="w-10 h-10 rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {dropdownMenu.map((item) => (
          <DropdownMenuItem key={item.title}>
            <Link href={item.href}>{item.title}</Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button onClick={() => signOut()} className="mx-auto">
            Sign Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Menu;
