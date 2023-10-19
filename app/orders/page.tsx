import { getCurrentUser } from "@/lib/getCurrentuser";
import React from "react";
import prisma from "../db";
import Card from "@/components/Card";
import DeleteOrder from "@/components/DeleteOrder";

type Props = {};

async function OrdersPage({}: Props) {
  const user = await getCurrentUser();
  const orderList = await prisma.order.findMany({
    where: {
      userId: user?.id,
    },
  });
  return (
    <div className="flex flex-col gap-3">
      {orderList.map((order) => (
        <div key={order.id} className="shadow-md border border-gray-200 p-3">
          <ul>
            {order.productsList.map((productId) => (
              <Card productId={productId!} key={productId} />
            ))}
          </ul>
          <DeleteOrder orderId={order.id} />
        </div>
      ))}
    </div>
  );
}

export default OrdersPage;
