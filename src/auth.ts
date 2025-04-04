import NextAuth, { DefaultSession } from "next-auth"
import GitHub, { GitHubProfile } from "next-auth/providers/github"
import { } from "next-auth/jwt"

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

const getRole = (profile: GitHubProfile) => {
    if (profile.email === 'debarkamondal@gmail.com') return "admin"
    return "user"
}
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub({
        async profile(profile) {
            let data = await fetch('https://utuo7fj1m2.execute-api.ap-south-1.amazonaws.com/')
            const body = await data.text()
            console.log(body)
            return {
                role: getRole(profile),
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
