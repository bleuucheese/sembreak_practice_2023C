import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/db";
import { v4 as uuidv4 } from "uuid";
export async function POST(request: Request) {
  const data = await request.json();
  const { username, password, email } = data;

  if (!username || !password || !email) {
    return new NextResponse("Please fill all the blank", { status: 404 });
  }

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (isUserExist) {
    return new NextResponse("User already exists.", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 15);
  const newUser = await prisma.user.create({
    data: {
      name: username,
      hashedPassword,
      email,
      image:
        "https://cdn.vox-cdn.com/thumbor/4E98u_RfYxa8pkRK79CyPClFABY=/0x0:1147x647/1200x800/filters:focal(483x233:665x415)/cdn.vox-cdn.com/uploads/chorus_image/image/70742090/Jotaro.0.jpeg",
      collectionId: uuidv4(),
      cartId: uuidv4(),

    },
  });

  return NextResponse.json(newUser);
}
