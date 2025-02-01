'use client'
import Tabs from "@/components/layout/Tabs";
import UseProfile from "@/components/UseProfile";



export default function PaymentPage() {

    const{loading: profileLoading, role: profileRole} = UseProfile();  

    return (
        <section className="mt-8 ">
            <Tabs role={profileRole} />
          
            <div className=" max-w-6xl mx-auto mt-8">
                <div className=" max-w-auto mx-auto">
                    <div className="grid grid-cols-3 gap-2 mt-4">
                        
                          
                    <div className="bg-gray-200 rounded-lg p-4 mt-2 flex">
                                <div className="flex flex-col items-start space-y-2">
                                    <div className="flex gap-4">
                                    <span className="text-lg">Order #7</span>
                                    <span className="text-lg">Table 20</span>
                                    

                                    </div>
                                    <span className="text-sm">1500 hours</span>
                                    <span className="text-sm">Completes at: </span> <span> 1515 hours</span>
                                    <span> - Mi Sup</span>
                                    <span> - Sirap </span>
                           
                                    
                                    
                                </div>
                               
                            </div>

                            <div className="bg-gray-200 rounded-lg p-4 mt-2 flex">
                                <div className="flex flex-col items-start space-y-2">
                                    <div className="flex gap-4">
                                    <span className="text-lg">Order #8</span>
                                    <span className="text-lg">Table 5</span>
                                    

                                    </div>
                                    <span className="text-sm">1530 hours</span>
                                    <span className="text-sm">Completes at: </span> <span> 1545 hours</span>
                                    <div className="bg-gray-500 rounded-lg p-4 mt-2 ">
                                    <span className="flex flex-col text-gray-200"> - Nasi Lemak </span>
                                    <span className="text-gray-300 text-sm "> Ayam </span>
                                    </div>
                                    <span> - Teh Tarik</span>
                                
                                    
                                    
                                </div>
                               
                            </div>

                            <div className="bg-gray-200 rounded-lg p-4 mt-2 flex">
                                <div className="flex flex-col items-start space-y-2">
                                    <div className="flex gap-4">
                                    <span className="text-lg">Order #6</span>
                                    <span className="text-lg">Table 2</span>
                                    

                                    </div>
                                    <span className="text-sm">1445 hours</span>
                                    <span className="text-sm">Completes at: </span> <span> 1455 hours</span>
                                    <span> - Nasi Lemak</span>
                                    <span> - Milo Ais</span>
                                    
                                    
                                    
                                </div>
                               
                            </div>
                            <div className="bg-gray-200 rounded-lg p-4 mt-2 flex">
                            <div className="flex flex-col items-start space-y-2">
                                    <div className="flex gap-4">
                                    <span className="text-lg">Order #5</span>
                                    <span className="text-lg">Table 7</span>
                                    

                                    </div>
                                    <span className="text-sm">1400 hours</span>
                                    <span className="text-sm">Completes at: </span> <span> 1425 hours</span>
                                    <span> - Mi Kari </span>
                                    <span> - Teh Ais</span>
                                    <button>Proceed</button>
                                    <button>Undo</button>
                                    
                                    
                                </div>
                            </div>

                                <div className="bg-gray-200 rounded-lg p-4 mt-2 flex">
                                <div className="flex flex-col items-start space-y-2">
                                    <div className="flex gap-4">
                                    <span className="text-lg">Order #4</span>
                                    <span className="text-lg">Table 4</span>
                                    

                                    </div>
                                    <span className="text-sm">1000 hours</span>
                                    <span className="text-sm">Completes at: </span> <span> 1030 hours</span>
                                    <span> - Nasi Lemak</span>
                                    <span> - Milo Ais</span>
                       
                                    
                                    
                                </div>
                               
                            </div>

                    </div> 
                </div>
             </div>
        </section>
    )
}