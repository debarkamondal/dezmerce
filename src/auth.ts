import NextAuth, { DefaultSession } from "next-auth"
import GitHub from "next-auth/providers/github"
import { } from "next-auth/jwt"
import { decode } from "jsonwebtoken";
import { cookies } from "next/headers";

declare module "next-auth/jwt" {
    interface JWT {
        role?: string,
        id?: string
    }
}

type authCookieType = {
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

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub({
        async profile(profile) {
            return {
                id: profile.id.toString(),
                name: profile.name,
                email: profile.email,
                image: profile.avatar_url,
            }
        }
    })],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 // 1 hours
    },
    callbacks: {
        async jwt({ token }) {
            try {
                const data = await fetch(`https://${process.env.NEXT_PUBLIC_BACKEND_URL}/${process.env.NEXT_PUBLIC_STAGE}/signin`, {
                    method: "POST",
                    body: JSON.stringify({ email: token.email })
                })
                let cookie: string | null = data.headers.get('Set-Cookie')
                if (!cookie) throw new Error("backend responded with no cookie")
                cookie = cookie?.substring(cookie.indexOf("=") + 1, cookie.indexOf(";"))
                const cookieStore = await cookies()
                cookieStore.set('auth', cookie, {
                    httpOnly: true,
                    secure: true
                })
                const decodedToken = decode(cookie) as authCookieType
                if (decodedToken) token.role = decodedToken.role
                return token

            } catch (e) {
                return token
            }
        },
        session({ session, token }) {
            if (token.id) session.user.id = token.id.toString()
            session.user.role = token.role
            return session
        },
    },

})
