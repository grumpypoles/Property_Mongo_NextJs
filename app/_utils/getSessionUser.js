import { getServerSession } from "next-auth";
import { auth } from "@/app/_utils/auth";

export const getSessionUser = async () => {
    const session = await getServerSession;

    if (!session || !session.user) {
        return null;
    }

    return {
        user: session.user,
        userId: session.user.id,
    };
};
