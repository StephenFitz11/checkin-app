"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const revalidateFunc = () => {
  revalidatePath("/");
  revalidatePath("/main");
  redirect("/");
};
