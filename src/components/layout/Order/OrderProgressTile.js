import Link from "next/link";
import moment from "moment";
import UseProfile from "@/components/UseProfile";

export default function OrderProgressTile({ order, onProceed, onReverse, waitTime }) {
    const createdAt = new Date(order.updatedAt);
    const estimatedAt = moment(createdAt).add(waitTime, 'm').toDate();
    
    const {loading:profileLoading, role:profileRole} = UseProfile();

    return (
        <form key={order._id}>
            <div className="bg-gray-200 rounded-lg p-4 mt-2 flex">
                <div className="flex flex-col items-start space-y-2">
                     <Link href={"/orders/"+order._id}>
                        <span className="text-sm font-semibold"> {order.isDineIn ? 'Table '+ order.tableNumber : order.customerName } </span>
                        <div className="flex flex-col gap-1">
                            <span className="text-sm">
                                Created: {createdAt.toLocaleString("en-GB", { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: "Asia/Kuala_Lumpur" })}
                            </span>
                            <span className="text-sm">
                                Estimate: {estimatedAt.toLocaleString("en-GB", { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: "Asia/Kuala_Lumpur" })}
                            </span>
                            <span className="text-sm font-semibold">
                                {order.isDineIn ? 'DINE IN' : 'TAKEAWAY'}
                            </span>
                        </div>
                        {order.cartProducts.map((product, index) => (
                            <div key={product.menuName} className="bg-gray-500 rounded-lg p-4 mt-2">
                                <span className="flex flex-col text-gray-200">{index + 1}. {product.menuName}</span>
                                {product.extraOptions?.length > 0 && (
                                    <div>
                                        <div className="text-sm text-gray-500">
                                            {product.extraOptions.map(option => (
                                                <span key={option.name} className="text-gray-300 text-sm">
                                                    - {option.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </Link>
                    {(profileRole === "businessOwner" || profileRole === "waiter" || profileRole === "kitchenStaff" || profileRole === "cashier") && (
                         <div className="grid grid-cols-2 gap-2 items-center text-center justify-center">
                         {onReverse && (
                             <button className="p-2 bg-red-500" type="button" onClick={() => onReverse(order._id)}>Undo</button>
                         )}
                         {onProceed && (
                             <button className="px-1 py-2 bg-green-500" type="button" onClick={() => onProceed(order._id)}>Proceed</button>
                         )}
                     </div>
                    ) }
                   
                </div>
            </div>
        </form>
    );
}