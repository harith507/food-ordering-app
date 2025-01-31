'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/components/AppContext";
import Cart from "../icons/Cart";

export default function Header() {
    const session = useSession();
    // console.log(session);
    const userData = session.data?.user;
    let userName = userData?.username || userData?.email;
    const {cartProducts} = useContext(CartContext);
    if(userName && userName.includes('@')){
        userName = userName.split('@')[0];
    }
    const status = session.status;


    return (

        <header className="flex justify-between items-center p-4">

            <nav className="flex items-center gap-8 text-gray-600 font-semibold">
                <Link className="text-primary font-semibold text-2xl" href="/"> SENJA </Link>
                <Link href={'/'}>Home</Link>
                <Link href={'/menu'}>Menu</Link>
                <Link href={'/#about'}>About</Link>

            </nav>
            <nav className="flex items-center gap-4 text-gray-500 font-semibold">
                {status == 'authenticated' && (
                    <>
                        <Link className="whitespace-nowrap" href={'/profile'}> Hello, {userName} </Link>
                        <button onClick={() => signOut()} className="bg-primary text-white rounded-full px-8 py-2" > Logout</button>
                    </>
                )}

                {status === 'unauthenticated' && (
                    <>
                        <Link href={'/login'}  > Login </Link>
                        <Link href={'/register'} className="bg-primary text-white rounded-full px-8 py-2" > Register</Link>

                    </>
                )}

                {cartProducts?.length >0 &&(
                    <Link href={'/cart'} className="bg-primary text-white rounded-full px-8 py-2 " >  <Cart /> {cartProducts.length}
                    
                    </Link>
                )}


            </nav>
        </header>

    );
}