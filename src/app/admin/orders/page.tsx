import OrderWidget from "@/components/OrderWidget"
import { Chart } from "@/components/Chart"

const chartData = [
    { category: "T-Shirt", orders: 275, fill: "var(--color-tshirt)" },
    { category: "Jeans", orders: 200, fill: "var(--color-jeans)" },
    { category: "Skirt", orders: 287, fill: "var(--color-skirt)" },
    { category: "Top", orders: 173, fill: "var(--color-top)" },
    { category: "Shoes", orders: 190, fill: "var(--color-shoes)" },
]

const AdminPage = async () => {

    return (
        <main>
            <h1 className="text-2xl md:text-3xl font-semibold text-center my-4">Orders</h1>
            <div className="grid md:grid-cols-2 gap-4">
                <Chart title="This month" data={chartData} />
                <div className="hidden md:block">
                    <Chart title="This month" data={chartData} />
                </div>
            </div>
            <OrderWidget />
        </main>
    )

}
export default AdminPage
