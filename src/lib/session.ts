import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function isAdmin() {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
        return false;
    }
    return true;
}