'use client';
import UseProfile from "@/components/UseProfile";
import Tabs from "@/components/layout/Tabs";
import dynamic from 'next/dynamic'; // added
import { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false }); // added

export default function DashboardPage() { 

    const [orders, setOrders] = useState([]);
    const{loading: profileLoading, role: profileRole} = UseProfile();
    // New state for chart data
    const [chartData, setChartData] = useState({ series: [], categories: [] });
    
        useEffect(() => {
            fetch('/api/orders').then(res => {
                res.json().then(data => setOrders(data));
            })
    
        }, []);

    // Compute daily sales using orders
    useEffect(() => {
        const dailySales = {};
        orders.forEach(order => {
            // Group by day
            const date = new Date(order.updatedAt).toLocaleDateString('en-GB');
            let orderTotal = 0;
            order.cartProducts.forEach(product => {
                orderTotal += product.basePrice;
                if (product.extraOptions?.length > 0) {
                    product.extraOptions.forEach(option => {
                        orderTotal += option.price;
                    });
                }
            });
            dailySales[date] = (dailySales[date] || 0) + orderTotal;
        });
        // Sort dates
        const sortedDates = Object.keys(dailySales).sort((a, b) => new Date(a) - new Date(b));
        const seriesData = sortedDates.map(date => dailySales[date]);
        setChartData({ series: seriesData, categories: sortedDates });
    }, [orders]);

    
    if(profileLoading) return <div>Loading...</div>

    if(profileRole !== "businessOwner") {
        return <div>Please return, you have no authorization on this page!</div>
    }

    // Removed variable chartConfig and added the function getChartConfig:
    function getChartConfig() {
        return {
            type: "line",
            height: 240,
            series: [
              {
                name: "Sales",
                data: chartData.series,
              },
            ],
            options: {
              chart: { toolbar: { show: false } },
              title: { show: "" },
              dataLabels: { enabled: false },
              colors: ["#020617"],
              stroke: { lineCap: "round", curve: "smooth" },
              markers: { size: 0 },
              xaxis: {
                axisTicks: { show: false },
                axisBorder: { show: false },
                labels: {
                  style: {
                    colors: "#616161",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    fontWeight: 400,
                  },
                },
                categories: chartData.categories,
              },
              yaxis: {
                labels: {
                  style: {
                    colors: "#616161",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    fontWeight: 400,
                  },
                },
              },
              grid: {
                show: true,
                borderColor: "#dddddd",
                strokeDashArray: 5,
                xaxis: { lines: { show: true } },
                padding: { top: 5, right: 20 },
              },
              fill: { opacity: 0.8 },
              tooltip: { theme: "dark" },
            },
        };
    }

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
    <section className="mt-8 "> 
        <Tabs role={profileRole} />
        <div className="max-w-xl mx-auto mt-8">
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-300 rounded-lg py-4 px-3 flex flex-col">
                <h1 className="text-lg">Total Orders Today</h1>
                <span className="text-lg text-center">
                {orders.filter(order => {
                    const today = new Date().toLocaleDateString('en-GB');
                    return new Date(order.updatedAt).toLocaleDateString('en-GB') === today && order.status !== 'cancelled';
                }).length}
                </span>
                </div>
                <div className="bg-gray-300 rounded-lg py-4 px-3 flex flex-col">
                <span className="text-lg">Total Sales Today</span>
                <span className="text-lg text-center">RM
                {orders
                    .filter(order => {
                        const today = new Date().toLocaleDateString('en-GB');
                        return new Date(order.updatedAt).toLocaleDateString('en-GB') === today && order.status !== 'cancelled';
                    })
                    .reduce((total, order) => {
                        let orderTotal = 0;
                        order.cartProducts.forEach(product => {
                            orderTotal += product.basePrice;
                            if (product.extraOptions?.length > 0) {
                                product.extraOptions.forEach(option => {
                                    orderTotal += option.price;
                                });
                            }
                        });
                        return total + orderTotal;
                    }, 0)}
                    </span>
                </div>
                <div className="bg-gray-300 rounded-lg py-4 px-3 flex flex-col">
                <span className="text-lg">Current Wait Time</span>
                <span className="text-lg text-center">{CalculateWaitTime() ==="NaN"? 'Imidiately': CalculateWaitTime() < -0 ? "is Going to Take More Than 1 Hours" : CalculateWaitTime() +" Minutes" } </span>
                </div>
            </div>
            <div className="bg-gray-300 mt-2 rounded-lg p-4">
            <span className="text-lg">Daily Sales</span>
            <Chart {...getChartConfig()} />
            </div>
        </div>
     </section>

)}