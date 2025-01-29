'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Tabs({role}) {

    const path = usePathname();
 
    return(
        <div className="flex gap-2 tabs max-auto justify-center">
        <Link className={path ==="/profile" ? "active" : ""} href={'/profile'}>Profile</Link>
        {role === "businessOwner" && (
            <>
                <Link className={path ==="/accounts" ? "active" : ""} href={'/accounts'}>Users</Link>
                <Link className={path ==="/menu-items" ? "active" : ""} href={'/menu-items'}>Menu Items</Link>
                <Link className={path ==="/categories" ? "active" : ""} href={'/categories'}>Categories</Link>
                <Link className={path ==="/orders" ? "active" : ""} href={'/orders'} >Orders</Link>
                <Link className={path === "/dashboard" ? "active" : ""} href={'/dashboard'}>Dashboard</Link>
            </>
        )}
        {role === "kitchenStaff" || role === "waiter" && (
            <>
                <Link className={path ==="/orders" ? "active" : ""} href={'/orders'}>Orders</Link>
            </>
        )}
        
        {role === "cashier" && (
            <>
                <Link className={path ==="/payment" ? "active" : ""} href={'/payment'}>Payment</Link>
                <Link className={path ==="/orders" ? "active" : ""} href={'/orders'}>Orders</Link>
            </>
        )}
    </div>
    )
}