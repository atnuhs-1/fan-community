"use server";

import {auth, unstable_update} from "@/auth";
import { prisma } from "@/db";
import { revalidatePath } from "next/cache";

export const setName = async (name: string) => {
  console.log("-- action profile.ts --")
  const session = await auth();

  if (!session || !session.user?.id) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    const result = await prisma.user.update({
      where: {id: session?.user.id},
      data: {name: name},
    })
    console.log(result);

    const sessi = await unstable_update({
      user: {
        name: result.name
      }
    })
    console.log("session: ", sessi);

    revalidatePath("/");

    return {
      success: true,
      name: result.name
    }
  } catch ( error ) {
    console.error("Failed Set Name: ",error);
    return { success: false, error: "Failed Set Name"};
  }
}