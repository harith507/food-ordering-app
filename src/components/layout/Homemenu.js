import MenuItem from "./Menu/MenuItem";
import SectionHeaders from "./SectionHeaders";

export default function Homemenu() {
    return (
        <>
        <section className="">
        <div className="text-center">
            <SectionHeaders subHeader="Check out" mainHeader="Menu" />
        </div>
            <div className="grid grid-cols-3 gap-4">
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
            </div>
        </section>
        
        </>
        
    )
}