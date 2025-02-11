


export default function DashboardPage(){
    return(
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="flex gap-2">
                <div className="bg-white p-4 rounded-lg shadow-lg w-96">
                    <h2 className="text-lg font-semibold">Total Orders</h2>
                    <div className="text-4xl font-semibold">5</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg w-96">
                    <h2 className="text-lg font-semibold">Total Sales</h2>
                    <div className="text-4xl font-semibold">$100</div>
                </div>
            </div>
        </div>
    )
}