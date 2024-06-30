"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const startParade = async () => {
  await prisma.parade.update({
    where: {
      id: 1,
    },
    data: {
      status: "started",
    },
  });
  revalidatePath("/", "page");
  revalidatePath("/main", "page");
  revalidatePath("/", "layout");
};
