import prisma from "@/app/db";
import { getCurrentUser } from "@/lib/getCurrentuser";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
  typescript: true,
});
const corsHeader = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeader });
}

export async function POST(req: Request): Promise<NextResponse> { // Ensure the return type is Promise<NextResponse>
  const body = await req.json();
  const { allIdsAndQuantities } = body;
  console.log(allIdsAndQuantities);
  if (!allIdsAndQuantities || allIdsAndQuantities.length === 0) {
    return new NextResponse("Product data not found", { status: 400 });
  }

  const user = await getCurrentUser();
  const line_items = await Promise.all(
    allIdsAndQuantities.map(async (allIdsAndQuantities: any) => {
      // Fetch product details based on the productId
      const product = await prisma.product.findUnique({
        where: {
          id: allIdsAndQuantities[0],
        },
      });
      if (!product) {
        return null;
      }

      return {
        quantity: allIdsAndQuantities[1],
        price_data: {
          currency: "USD",
          product_data: {
            name: product.title,
            images: [product.imageUrl],
          },
          unit_amount: parseInt(product.price) * 100, // Update this to the actual price calculation
        },
      };
    })
  );
  try {
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "auto",
      phone_number_collection: {
        enabled: false,
      },
      success_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart?cancelled=1`,
      metadata: {
        userId: user?.id as string,
      },
      currency: "USD",
    });
    allIdsAndQuantities.forEach(async (allIdsAndQuantities: any) => {
      const product = await prisma.product.findUnique({
        where: {
          id: allIdsAndQuantities[0],
        },
      });
      await prisma.product.update({
        where: {
          id: product?.id,
        },
        data: {
          cart: {
            set: product?.cart.filter((cartId) => cartId !== user?.cartId),
          },
        },
      });
    });
    await prisma.order.create({
      data: {
        productsList: allIdsAndQuantities.map(
          (allIdsAndQuantities: any) => allIdsAndQuantities[0]
        ),
        userId: user?.id,
      },
    });
    const url = session.url;
    return new NextResponse(JSON.stringify(url), { status: 200 }); // Return a valid NextResponse
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "An error occurred during payment" }), { status: 500 }); // Return a valid NextResponse for errors
  }
}
