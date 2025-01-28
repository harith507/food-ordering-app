import Hero from "@/components/layout/Hero";
import Homemenu from "@/components/layout/Homemenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
   <>
   

    <Hero />

    <Homemenu />

    <section className="text-center my-16"> 
      <SectionHeaders subHeader="Our story" mainHeader="About us" 
      />
      <div className="text-gray-500 mx-auto max-w-md mt-4 flex flex-col gap-4">
      <p> 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <p> 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <p> 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      </div>
      
    </section>

    <section className="text-center my-8">
      <SectionHeaders subHeader="Don't Hessitate" mainHeader="Contact Us" />
      <div className="mt-8">

      </div>
      <a className="text-4xl mt-8 underline text-gray-500" href="tel:09-355 3057"> 09-355 3057
       
      </a>
    </section>

    

   </>

   
  );
}
