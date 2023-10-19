import prisma from "@/app/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const orderId = await req.json();
  await prisma.order.delete({
    where: {
      id: orderId,
    },
  });
  return NextResponse.json("Order deleted successfully.");
}
