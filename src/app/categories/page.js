'use client';
import Tabs from "@/components/layout/Tabs";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [role, setRole] = useState("businessOwner");

  useEffect(() => {
    fetch('/api/profile').then(response => {
      response.json().then(data => {
        setRole(data.role);
      });
    });
  }, []);

  if (role !== "businessOwner") {
    return redirect("/login");
  }

  return (
    <section className="mt-8 mx-auto">
      <Tabs role={role} />
    </section>
  );
}
