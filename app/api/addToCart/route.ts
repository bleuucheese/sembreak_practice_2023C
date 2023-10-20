import prisma from "@/app/db";
import { getCurrentUser } from "@/lib/getCurrentuser";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const id = await req.json();

  const user = await getCurrentUser();

  if (!user) {
   return NextResponse.error();
  }

  const newProduct = await prisma.product.update({
    where: {
      id,
    },
    data: {
      cart: {
        push: user.cartId ? user.cartId : undefined,
      },
    },
  });
  return NextResponse.json(newProduct);
}
