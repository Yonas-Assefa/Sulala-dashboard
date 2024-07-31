import React from "react";

type Props = {
  product_key: any;
};

function TableBreadCrumb({ product_key }: Props) {
  return (
    <div className="max-w-xs text-sm breadcrumbs">
      <ul className="bg-tertiary p-1 rounded-md drop-shadow-sm hover:cursor-pointer">
        {Array.isArray(product_key) ? (
          product_key.map((item, index) => {
            return (
              <li key={index} className="text-xs text-black dark:text-white">
                <p>{item}</p>
              </li>
            );
          })
        ) : (
          <li>{product_key}</li>
        )}
      </ul>
    </div>
  );
}

export default TableBreadCrumb;
