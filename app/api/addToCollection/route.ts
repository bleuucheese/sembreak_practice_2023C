import prisma from "@/app/db";
import { getCurrentUser } from "@/lib/getCurrentuser";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const id = await req.json();

  const user = await getCurrentUser();

  if (!user) {
    return new NextResponse("Unauthenticated", { status: 400 });
  }

  const newProduct = await prisma.product.update({
    where: {
      id,
    },
    data: {
      collection: {
        push: user.collectionId,
      },
    },
  });
  return NextResponse.json(newProduct);
}
