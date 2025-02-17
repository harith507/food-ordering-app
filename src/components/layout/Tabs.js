'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Tabs({role}) {

    const path = usePathname();
 
    return(
        <div className="flex gap-2 tabs mx-auto justify-center flex-wrap">
        {role === "businessOwner" && (
            <>
             <Link className={path ==="/profile" ? "active" : ""} href={'/profile'}>Profile</Link>
                <Link className={path === ("/accounts") ? "active" : ""} href={'/accounts'}>Users</Link>
                <Link className={path ==="/accounts/register" ? "active" : ""} href={'/accounts/register'}> Register</Link>
                <Link className={path ==="/menu-items" ? "active" : ""} href={'/menu-items'}>Menu Items</Link>
                {path ==="/menu-items" ? <Link className={path ==="/menu-items/new" ? "active" : ""} href={'/menu-items/new'}>Add Menu Items</Link>: ""}
                {path ==="/menu-items/new" ? <Link className={path ==="/menu-items/new" ? "active" : ""} href={'/menu-items/new'}>Add Menu Items</Link>: ""}
                <Link className={path ==="/categories" ? "active" : ""} href={'/categories'}>Categories</Link>
                <Link className={path.includes("/orders") ? "active" : ""} href={'/orders'} >Orders</Link>
                <Link className={path.includes("/payment") ? "active" : ""} href={'/payment'}>Payment</Link>
                <Link className={path === "/dashboard" ? "active" : ""} href={'/dashboard'}>Dashboard</Link>
            </>
        )}
        {role === "kitchenStaff" || role === "waiter" && (
            <>
             <Link className={path ==="/profile" ? "active" : ""} href={'/profile'}>Profile</Link>
                <Link className={path ==="/orders" ? "active" : ""} href={'/orders'}>Orders</Link>
            </>
        )}
        
        {role === "cashier" && (
            <>
             <Link className={path ==="/profile" ? "active" : ""} href={'/profile'}>Profile</Link>
                <Link className={path ==="/payment" ? "active" : ""} href={'/payment'}>Payment</Link>
                <Link className={path ==="/orders" ? "active" : ""} href={'/orders'}>Orders</Link>
            </>
        )}
    </div>
    )
}