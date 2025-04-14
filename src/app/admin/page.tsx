import { auth } from "@/auth"
// import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const AdminPage = async () => {
    const session = await auth()
    if(session?.user.role !== 'admin') redirect("/signin")
        // const cookie= (await cookies()).get('auth')
    
    return (
        <div>Admin</div>
    )

}
export default AdminPage
