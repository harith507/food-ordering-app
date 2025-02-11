'use client';
import MenuItem from "@/components/layout/Menu/MenuItem";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useEffect, useState } from "react";

export default function MenuPage() { 

    const[menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [orders, setOrders] = useState([]);
    
    useEffect(() => {
        fetch('/api/categories').then(res => {
          res.json().then(categories => setCategories(categories))
        });
        fetch('/api/menu-items').then(res => {
          res.json().then(menuItems => setMenuItems(menuItems));
        });
        fetch('/api/orders?today=1').then(res => {
            res.json().then(data => setOrders(data));
        });
      }, []);

      function CalculateWaitTime(){
        const placedCount = orders.filter(order => order.status === 'placed').length;
        const inProgressCount = orders.filter(order => order.status === 'in-progress').length;
        const completeCount = orders.filter(order => order.status === 'complete').length;

 
        let waitTime = 0;
        //per hour
        const arrivalRate = placedCount + inProgressCount + completeCount;
        const serviceRate = 15;
        const Lq = Math.pow(arrivalRate, 2) / (serviceRate*( serviceRate - arrivalRate));
        waitTime = (Lq / arrivalRate)*60;
        

       

        return waitTime.toFixed(2) ; //minutes
        
    }

    
    
    return(
    <section>
        {
            categories?.length > 0 && categories.map(c => (
                <div>
                    <div className="text-center">
                        <SectionHeaders key={c._id} mainHeader={c.name} />
                        <span className="text-lg">Average Wait Time to Complete Order {CalculateWaitTime() ==="NaN"? 'is Imidiately': CalculateWaitTime() < -0 ? "is Going to Take More Than 1 Hours" : CalculateWaitTime()+" minutes" } </span>
                    
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
