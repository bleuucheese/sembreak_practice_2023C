import prisma from "@/app/db";
import { getCurrentUser } from "@/lib/getCurrentuser";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const data = await request.json();
  const { title, price, imageUrl, category } = data;
  console.log(category)
  const product = await prisma.product.create({
    data: {
      title,
      price,
      imageUrl,
      userId: currentUser?.id as string,
      category,
    },
  })
  return NextResponse.json(product);
}

export async function DELETE(req: Request) {
  const id = await req.json();
  const isProductExist = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!isProductExist) {
    return new NextResponse("Product not found", { status: 404 });
  }
  const deletedProduct = await prisma.product.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(deletedProduct);
}

export async function PATCH(req: Request) {
  const data = await req.json();
  const { title, price, imageUrl, userId, id, category } = data;

  const isProductExist = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!isProductExist) {
    return new NextResponse("Product not found", { status: 404 });
  }

  const newProduct = await prisma.product.update({
    where: {
      id,
    },
    data: {
      title,
      price,
      imageUrl,
      userId,
      id,
      category,
    },
  });

  return NextResponse.json(newProduct);
}
