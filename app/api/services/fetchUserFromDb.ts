import { getSession } from "next-auth/react";

export async function fetchUserFromDb() {
  try {
    const session = await getSession();
    if (!session || !session.user) {
      throw new Error("No session found");
    }
    return {
      id: session.user.id,
      accessToken: session.user.accessToken,
    };
  } catch (error) {
    console.error("Error fetching user from session:", error);
    throw error;
  }
}
