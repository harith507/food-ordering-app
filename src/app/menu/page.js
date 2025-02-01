'use client';
import MenuItem from "@/components/layout/Menu/MenuItem";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useEffect, useState } from "react";




export default function MenuPage() { 

    const[menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        fetch('/api/categories').then(res => {
          res.json().then(categories => setCategories(categories))
        });
        fetch('/api/menu-items').then(res => {
          res.json().then(menuItems => setMenuItems(menuItems));
        });
      }, []);
    
    
    return(
    <section>
        {
            categories?.length > 0 && categories.map(c => (
                <div>
                    <div className="text-center">
                        <SectionHeaders key={c._id} mainHeader={c.name} />
                        {console.log('hoho',menuItems)}
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-6 mb-12">
                    {menuItems.filter(item => item.category === c._id).map(item => (
                        <MenuItem key={item._id} {...item} />
                    ))}
                    </div>
                    
                </div>
                
            ))
        }
    </section>
)}
