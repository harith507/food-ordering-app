'use client';
import Tabs from "@/components/layout/Tabs";
import UseProfile from "@/components/UseProfile";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoriesPage() {
  
    const {loading:profileLoading, role:profileRole} = UseProfile();
    
    if(profileLoading){
        return <p>Loading...</p>;
    }

    if(!profileRole ==="businessOwner"){
        return redirect("/login");
    }

  return (
    <section className="mt-8 max-w-md mx-auto">
      <Tabs role={profileRole} />
      <form>
        <label>New Category Name</label>
        <input type="text" />
      </form>
    </section>
  );
}
