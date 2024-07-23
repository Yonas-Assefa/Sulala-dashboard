import BackButton from "@/components/common/ui/BackButton";
import React from "react";
import { notFound } from "next/navigation";
import ProductForm from "./ProductForm";
import { getOneProduct } from "@/actions/products/get-products";
import { getProductTags } from "@/actions/common/get-product-tags";
import { getSubCategories } from "@/actions/common/get-subcategories";
import { getTranslations } from "next-intl/server";
import { getAnimals } from "@/actions/common/get-animals";
import { getBrands } from "@/actions/common/get-brands";

type Props = {
  params: {
    tab: string;
  };
  searchParams: {
    item: string;
  };
};

// export async function generateMetadata({
//   params: { lang, tab },
//   searchParams: { item },
// }: {
//   params: { lang: string, tab: string };
//   searchParams: { item: string };
// }) {
//   const product = item ? await getOneProduct(item) : null;

//   return {
//     title: tab == "add" ? "Add Product" : "Edit " + product?.title,
//     description: tab == "add" ? "Add a new product" : product?.description,
//     icons: tab == "add" ? [] : product?.images,
//     openGraph: {
//       images: tab == "add" ? [] : product?.images,
//       title: tab == "add" ? "Add Product" : "Edit " + product?.title,
//     },
//     locale: lang,
//     type: "website",
//   };
// }

async function page({ params: { tab }, searchParams: { item } }: Props) {
  if (!["add", "edit"].includes(tab)) {
    return notFound();
  }

  const subcategoryLists = await getSubCategories();
  // const productTags = await getProductTags()
  const animals = await getAnimals();
  const brands = await getBrands();
  const product = item ? await getOneProduct(item) : null;

  const t = await getTranslations("Products");

  return (
    <div className="text-black dark:text-white flex flex-col w-full h-full p-8 gap-10 overflow-y-scroll">
      <div className="flex flex-row font-semibold justify-start items-center gap-6 text-3xl font-serif">
        <div className="mt-4">
          <BackButton />
        </div>
        <h2 className="capitalize text-2xl md:text-3xl">
          {t(tab == "add" ? "add_product" : "edit_product")}
        </h2>
      </div>
      <ProductForm
        categoryLists={subcategoryLists}
        // productTags={productTags}
        initialValue={product}
        tab={tab}
        animals={animals}
        brands={brands}
      />
    </div>
  );
}

export default page;
