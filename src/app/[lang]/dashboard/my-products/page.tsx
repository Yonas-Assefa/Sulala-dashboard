import React from "react";
import ImportProductsModal from "./components/modals/ImportProductsModal";
import Table from "@/components/common/table/Table";
import ProductHead from "./components/ProductHead";
import { productsFilterData, productsSortData } from "./schema/data";
import { productTableSchema } from "./schema/schema";
import { getProducts } from "@/actions/products/get-products";
import { deleteProduct } from "@/actions/products/delete-product";
import { changeObjToFormData } from "@/lib/helper";
import { TableProps as Props } from "@/types/props.type";
import ExportProductsModal from "./components/modals/ExportProductsModal";
import { Meta } from "@/types/table.type";

async function page({
  searchParams: { search, filter, sort, sort_by, page, page_size },
}: Props) {
  const products = await getProducts(
    changeObjToFormData({
      search,
      filter,
      sort,
      sort_by,
      page,
      page_size,
      with_pagination: true,
    }),
  );
  return (
    <>
      <ImportProductsModal />
      <ExportProductsModal
        exportData={"count" in products ? products.data : products}
      />
      <div className="text-black flex flex-col w-full h-full p-8 gap-10">
        {/* HEADER FOR MY PRODUCTS */}
        <ProductHead />

        <Table
          data={products as Meta}
          filterData={productsFilterData}
          tableSchema={productTableSchema}
          sortData={productsSortData}
          actionOptions={{
            delete: {
              action: deleteProduct,
              formData: [{ formDataKey: "item_id", searchKey: "item" }],
            },
          }}
        />
      </div>
    </>
  );
}

export default page;
