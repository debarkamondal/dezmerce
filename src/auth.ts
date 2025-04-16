import NextAuth, { DefaultSession } from "next-auth"
import GitHub from "next-auth/providers/github"
import { } from "next-auth/jwt"
import { cookies } from "next/headers";
import { decode } from "jsonwebtoken";

declare module "next-auth/jwt" {
    interface JWT {
        role?: string,
        id?: string
    }
}

type authCookieType={
    email: string,
    role: string,
    iat: number
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
const setCookie = async (name: string, cookie: string) => {
    const cookieStore = await cookies()
    cookieStore.set(name, cookie, {
        httpOnly: true,
        secure: true
    })


}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub({
        async profile(profile) {
            const data = await fetch(`https://${process.env.BACKEND_URL}/${process.env.STAGE}/signin`, {
                method: "POST",
                body: JSON.stringify({ email: profile.email })
            })
            let cookie: string | null = data.headers.get('Set-Cookie')
            if (!cookie) return new Error("backend responded with no cookie")
            cookie = cookie?.substring(cookie.indexOf("=") + 1, cookie.indexOf(";"))
            setCookie('auth', cookie)
            const decodedCookie = decode(cookie) as authCookieType 
            return {
                role: decodedCookie.role ?? "user",
                id: profile.id.toString(),
                name: profile.name,
                email: profile.email,
                image: profile.avatar_url,
            }
        }
    })],
    session:{
        strategy: "jwt",
        maxAge: 60 * 60 // 1 hours
    },
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
