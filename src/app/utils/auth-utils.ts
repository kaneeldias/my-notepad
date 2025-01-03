import {SessionContextValue} from "next-auth/react";

export function isLoggedIn(session: SessionContextValue) {
    return session.data?.user != null;
}