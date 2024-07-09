import React from "react";
import CategoriesList from "./components/CategoriesList";
import { getAllSubCategories } from "@/actions/common/get-all-subcategories";

async function page() {
  const categories = await getAllSubCategories();

  return (
    <div className="w-full h-full">
      <CategoriesList categories={categories} />
    </div>
  );
}

export default page;
