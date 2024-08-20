import {auth} from "@/app/_utils/auth"

export const middleware = auth
export const config = {
    matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"]
}