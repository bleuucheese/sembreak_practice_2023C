import { getCurrentUser } from "@/lib/getCurrentuser";
import React from "react";
import prisma from "../db";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";
type Props = {};

async function CreateIdsPage({}: Props) {
  const user = await getCurrentUser();
  if (!user?.cartId || !user.collectionId) {
    await prisma.user.update({
      data: {
        cartId: uuidv4(),
        collectionId: uuidv4(),
      },
      where: {
        email: user?.email as string,
      },
    });
    redirect("/");
  }
  return redirect("/");
}

export default CreateIdsPage;
