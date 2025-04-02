import { auth } from "@/auth"
import { redirect } from "next/navigation"

const AdminPage = async () => {
    const session = await auth()
    if(session?.user.role !== 'admin') redirect("/signin")
    return (
        <div>Admin</div>
    )

}
export default AdminPage
