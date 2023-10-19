'use client'
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
type Props = {};

function AuthMenu({}: Props) {
  const authOption = ["Login", "Register"];
  const { onOpen } = useModal();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Get Started</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-28">
        <DropdownMenuItem
          onClick={() => onOpen("Login")}
          className="cursor-pointer"
        >
          Login
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onOpen("Register")}
          className="cursor-pointer"
        >
          Register
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AuthMenu;
