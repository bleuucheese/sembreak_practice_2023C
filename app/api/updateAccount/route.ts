import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function PATCH(req: Request) {
  const data = await req.json();
  const { name, email, image } = data;
  console.log(name, email, image);
  const newUser = await prisma.user.update({
    where: {
      email,
    },
    data: {
      name,
      email,
      image,
    },
  });

  return NextResponse.json(newUser);
}
