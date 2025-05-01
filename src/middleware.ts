import { auth } from "@/auth"

export default auth((req) => {
    if (req.nextUrl.pathname.startsWith("/admin") && req.auth?.user.role !== 'admin') {
       const url= new URL("/api/auth/signin", req.nextUrl.origin) 
       return Response.redirect(url)
    }
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*-logo.svg|logo.png).*)",
        "/admin/:path*"
    ],
}
