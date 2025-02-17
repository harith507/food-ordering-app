import Image from "next/image";
import Right from "../icons/Right";

export default function Hero(imageUrl) {
    return(
        <>
            <section className="hero mt-4">
                <div className="py-12">
                    <h1 className="text-4xl font-semibold">
                        Welcome <br />
                        to <br />
                        Senja<br />
                    </h1>
                    <p className="my-4 text-gray-500"> 
                        A restaurant that serves the best food in town
                    </p>
                    <div className="flex gap-4 text-sm">
                        <button className=" justify-center bg-primary uppercase text-white rounded-full px-4 py-2 flex gap-2  items-center">
                            Order Now
                            <Right  />
                        </button>
                        <button className="flex border-0 items-center gap-2 py-2 text-gray-600 font-semibold">
                            Learn More
                            <Right  />
                        </button>
                    </div>
                </div>
                
            </section>
        </>
    );

}