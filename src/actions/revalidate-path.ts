"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const revalidateFunc = () => {
  revalidatePath("/", "page");
  revalidatePath("/main", "page");
  revalidatePath("/", "layout");
};
