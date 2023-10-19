// import prisma from "@/app/db"
// import { getServerSession } from "next-auth"

// export async function getCurrentUser() {
//     const session = await getServerSession()
//     const user = await prisma.user.findUnique({
//         where: {
//             email: session?.user?.email as string
//     }})
//     return user
// }

import prisma from "@/app/db";
import { getServerSession } from 'next-auth';

export async function getCurrentUser() {
  const session = await getServerSession();

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    });
    return user;
  }

  // Handle the case when there is no email in the session or when the user is not found.
  return null;
}
