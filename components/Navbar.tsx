import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import AuthMenu from "./AuthMenu";
import Menu from "./Menu";
import { getCurrentUser } from "@/lib/getCurrentuser";
type Props = {};

async function Navbar({}: Props) {
  const user = await getCurrentUser();
  const navigation = ["CPUs", "GPUs", "MONITOR", "KEYBOARD", "PHONE", "TABLET"];
  return (
    <div>
      <nav className="bg-pink-200 text-blue-950 flex items-center justify-between px-3">
        <Link href={"/"} className="flex items-center justify-between gap-1">
          <Image
            src={
              "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/f081e7c8-7545-4f4a-96b9-270911e16d4d/d997zkf-fcd32da5-f6b1-4525-9299-38ef093a283f.png"
            }
            alt="Logo"
            width={50}
            height={75}
            className="w-15 h15"
          />
          <p className="font-semibold text-2xl">JOJO</p>
        </Link>
        {user ? <Menu user={user} /> : <AuthMenu />}
      </nav>
      <nav className="bg-black text-cyan-200 font-semibold w-screen overflow-auto">
        <div className="flex gap-2 justify-between items-center">
          {navigation.map((navigation) => (
            <Link
              key={navigation}
              href={`/products/${navigation}`}
              className="uppercase"
            >
              {navigation}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
