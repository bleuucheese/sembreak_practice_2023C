import prisma from "@/app/db";
import { getCurrentUser } from "@/lib/getCurrentuser";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const id = await req.json();
  const user = await getCurrentUser();

  if (!user) {
    return new NextResponse("Unauthenticated", { status: 400 });
  }
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    return new NextResponse("Product not found", { status: 404 });
  }

  const newProduct = await prisma.product.update({
    where: {
      id,
    },
    data: {
      cart: {
        set: product.cart.filter(
          (cartId) => cartId !== user.cartId
        ),
      },
    },
  });
  return NextResponse.json(newProduct);
}
