'use client';
import Tabs from "@/components/layout/Tabs";
import UseProfile from "@/components/UseProfile";
import {useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";


export default function MenuItemsPage() {

    const [menuItems, setMenuItems] = useState([]);
    

    const {loading:profileLoading, role:profileRole} = UseProfile();
    // console.log("useprofile output",{profileLoading,profileRole});

    console.log("creds", {profileLoading, profileRole});

    

    // if(profileRole !=="businessOwner"){
    //   return redirect("/login");

       
    
    // }


    // useEffect(() => {
    //     fetch('/api/menu-items').then(res => {
    //         res.json().then(menuItems => setMenuItems(menuItems));
    //         });
    // }, []);

    useEffect(() => {
        if (!profileLoading && profileRole === "businessOwner") {
          fetch("/api/menu-items")
            .then((res) => res.json())
            .then((data) => setMenuItems(data));
        }
        
      }, [profileLoading, profileRole]);

      console.log("menuItems", menuItems);


    
    return(
        <section className="mt-8">
        <Tabs role={profileRole} />
        
        <div className=" max-w-md mx-auto">
            <h2 className="text-sm text-gray-500 mt-8 ">Edit Menu Item: </h2>
            <div className="grid grid-cols-3 gap-2">
            {menuItems.length > 0 && menuItems.map(item =>(
                (!item.hasOwnProperty('menuName') || item.menuName === "" 
                    ? <Link href={"/menu-items/edit/"+item._id} 
                    className="bg-gray-200 rounded-lg p-4 " key={item._id}>
                        <div className="relative ">
                        <Image src={item.image} alt="No Image" width={100} height={100}  />
                        </div>
                        
                        No Name
                        </Link> 
                    : <Link href={"/menu-items/edit/"+item._id} 
                    className="bg-gray-200 rounded-lg p-4 " key={item._id}>
                        <div className="relative ">
                        <Image src={item.image} alt="No Image" width={100} height={100}  />
                        </div>
                        {item.menuName}
                        </Link>)
            ))}
            </div>
            
        </div>
        </section>
    )
}