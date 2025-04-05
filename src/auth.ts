import NextAuth, { DefaultSession } from "next-auth"
import GitHub from "next-auth/providers/github"
import { } from "next-auth/jwt"
import { cookies } from "next/headers";

declare module "next-auth/jwt" {
    interface JWT {
        role?: string,
        id?: string
    }
}

declare module "next-auth" {
    interface User {
        id?: string,
        name?: string | null,
        email?: string | null,
        image?: string | null,
        role?: string;
    }
    interface Session {
        user: {
            id?: string,
            name?: string | null,
            email?: string | null,
            image?: string | null,
            role?: string;

        } & DefaultSession['user']
    }
}
const setCookie = async (cookie: Array<string>) => {
    const cookieStore = await cookies()
    cookieStore.set(cookie[0], cookie[1], {
        httpOnly: true,
        secure: true
    })


}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub({
        async profile(profile) {
            const data = await fetch('https://api.dkmondal.in/test/admin/getAuth', {
                method: "POST",
                body: JSON.stringify({ email: profile.email })
            })
            let cookie: string | null | undefined = data.headers.get('Set-Cookie')
            const body = await data.json();
            cookie = cookie?.substring(cookie?.indexOf("=") + 1)
            setCookie(['auth', cookie ?? ""])
            return {
                role: body.role,
                id: profile.id.toString(),
                name: profile.name,
                email: profile.email,
                image: profile.avatar_url,
            }
        }
    })],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = user.role
            }
            return token
        },
        session({ session, token }) {
            if (token.id) session.user.id = token.id.toString()
            session.user.role = token.role
            return session
        },
    },

})
