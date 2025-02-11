import Hero from "@/components/layout/Hero";
import Homemenu from "@/components/layout/Homemenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home({  }) {
  return (
    <>
      <Hero/>
      <Homemenu />
      <section className="text-center my-16" id="about"> 
        <SectionHeaders subHeader="Our story" mainHeader="About us" />
        <div className="text-gray-500 mx-auto max-w-md mt-4 flex flex-col gap-4">
          <p> 
            Our journey began decades ago in our family kitchen, where recipes were passed down through generations.
            Inspired by the rich flavors of traditional Malay and fusion cuisine, we decided to turn our passion into reality by opening Restoran Senja.
            From our humble beginnings, we have grown into a beloved dining destination, known for our signature dishes, warm hospitality, and a commitment to quality ingredients.
          </p>
          <p> 
            At Restoran Senja, every dish tells a story from our fragrant nasi lemak to our sizzling grilled seafood, each bite is a tribute to Malaysia diverse culinary heritage. We take pride in using fresh, locally sourced ingredients, ensuring that every meal served is as authentic as it is flavorful.
          </p>
          <p> 
            What makes us truly special is the sense of togetherness that fills our restaurant. Whether you are dining with family, catching up with friends, or simply stopping by for a comforting meal, we welcome you as part of our extended family. Our goal is to create a warm and inviting space where good food and great company come together.
          </p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionHeaders subHeader="Don't Hessitate" mainHeader="Contact Us" />
        <div className="mt-8">
        </div>
        <a className="text-4xl mt-8 underline text-gray-500" href="tel:09-355 3057">09-355 3057</a>
      </section>
    </>
  );
}

