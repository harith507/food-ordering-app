'use client';
import UseProfile from "@/components/UseProfile";
import Tabs from "@/components/layout/Tabs";
import Chart from "react-apexcharts";

export default function DashboardPage() { 
    const{loading: profileLoading, role: profileRole} = UseProfile();
    if(profileLoading) return <div>Loading...</div>
    const chartConfig = {
        type: "line",
        height: 240,
        series: [
          {
            name: "Sales",
            data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
          },
        ],
        options: {
          chart: {
            toolbar: {
              show: false,
            },
          },
          title: {
            show: "",
          },
          dataLabels: {
            enabled: false,
          },
          colors: ["#020617"],
          stroke: {
            lineCap: "round",
            curve: "smooth",
          },
          markers: {
            size: 0,
          },
          xaxis: {
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            labels: {
              style: {
                colors: "#616161",
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: 400,
              },
            },
            categories: [
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
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
            xaxis: {
              lines: {
                show: true,
              },
            },
            padding: {
              top: 5,
              right: 20,
            },
          },
          fill: {
            opacity: 0.8,
          },
          tooltip: {
            theme: "dark",
          },
        },
      };
    return(
    <section className="mt-8 "> 
        <Tabs role={profileRole} />
        <div className="max-w-xl mx-auto mt-8">
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-300 rounded-lg py-4 px-3 flex flex-col">
                <h1 className="text-lg">Total Orders Today</h1>
                <span className="text-lg text-center">30</span>
                </div>
                <div className="bg-gray-300 rounded-lg py-4 px-3 flex flex-col">
                <span className="text-lg">Total Sales Today</span>
                <span className="text-lg text-center">RM635</span>
                </div>
                <div className="bg-gray-300 rounded-lg py-4 px-3 flex flex-col">
                <span className="text-lg">Average Wait Time</span>
                <span className="text-lg text-center">28 Minutes</span>
                </div>
            </div>
            <div className="bg-gray-300 mt-2 rounded-lg p-4">
            <span className="text-lg">Monthly Sales</span>
            <Chart {...chartConfig} />
            </div>
        </div>
     </section>

)}