import Link from "next/link";

export default function Header() {
    return(
        
        <header className="flex justify-between items-center p-4">
           
            <nav className="flex items-center gap-8 text-gray-600 font-semibold">
                <Link className="text-primary font-semibold text-2xl" href="/"> SENJA </Link>
                <Link href={'/'}>Home</Link>
                <Link href={''}>Menu</Link>
                <Link href={''}>About</Link>
                
            </nav>
            <nav className="flex items-center gap-4 text-gray-500 font-semibold">
                <Link href={'/login'}  > Login </Link>
                <Link href={'/register'} className="bg-primary text-white rounded-full px-8 py-2" > Register</Link>
           </nav>
        </header>
       
    );
}