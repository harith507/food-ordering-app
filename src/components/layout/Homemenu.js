'use client';
import MenuItem from "./Menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";

export default function Homemenu() {

    const [bestSellers, setBestSellers] = useState([]);
     

    useEffect(() => {
        fetch('/api/menu-items').then(res =>{
            res.json().then(menuItems =>{
                setBestSellers(menuItems.slice(-3))
            })
        })      
    }, [])
    

    return (
        <>
        <section className="">
        <div className="text-center">
            <SectionHeaders subHeader="Check out" mainHeader="Menu" />
        </div>
            <div className="grid grid-cols-3 gap-4">
                {bestSellers?.length > 0 && bestSellers.map(item => (
                    <MenuItem {...item} />
                ))}
            </div>
        </section>
        
        </>
        
    )
}