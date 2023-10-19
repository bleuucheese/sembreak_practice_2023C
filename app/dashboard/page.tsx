import DashboardForm from "@/components/DashboardForm";
import { getCurrentUser } from "@/lib/getCurrentuser";
import React from "react";

type Props = {};

async function DashBoard({}: Props) {
  const user = await getCurrentUser();
  return <DashboardForm user={user!} />;
}

export default DashBoard;
