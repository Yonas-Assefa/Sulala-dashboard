import { Link } from "@/i18n/navigation";
import Items from "../components/Items";
import Services from "../components/Services";
import ItemsLoading from "../components/ItemsPageSuspense";
import ServicesLoading from "../components/ServicesPageSuspense";
import { Suspense } from "react";
import { TableProps } from "@/types/props.type";

type Props = {
  params: { tab: string };
  searchParams: {
    search: string;
    filter: string;
    sort: string;
    sort_by: string;
    page_size: string;
    page: string;
  };
} & TableProps;

async function OrdersPage({
  params: { tab },
  searchParams: { search, filter, sort, sort_by, page_size, page },
}: Props) {
  console.log("console log: ", tab);
  const activeTab = tab ? tab : "items";
  const tabs = [
    { name: "Items", id: "items" },
    { name: "Services", id: "services" },
  ];

  return (
    <div className="text-black flex flex-col w-full h-full p-8 gap-10 overflow-y-scroll">
      <h1 className="text-5xl font-semibold font-serif">Orders</h1>
      <div className="box-content border-b-2 border-secondary">
        <div className="self-start flex flex-row font-medium">
          <Link
            href={"/dashboard/orders/items"}
            className={`tab border-b-2 px-6 -mb-[1px] ${
              activeTab == "items"
                ? "text-primary border-primary"
                : "text-secondary border-transparent"
            }`}
          >
            Items
          </Link>
          <Link
            href={"/dashboard/orders/services"}
            className={`tab border-b-2 px-6 -mb-[1px] ${
              activeTab == "services"
                ? "text-primary border-primary"
                : "text-secondary border-transparent"
            }`}
          >
            Services
          </Link>
        </div>
      </div>

      {/* TAB CONTENTS HERE */}
      {activeTab == "items" ? (
        <Suspense fallback={<ItemsLoading />}>
          <Items
            searchParams={{ search, filter, sort, sort_by, page_size, page }}
          />
        </Suspense>
      ) : activeTab == "services" ? (
        <Suspense fallback={<ServicesLoading />}>
          <Services
            searchParams={{ search, filter, sort, sort_by, page_size }}
          />
        </Suspense>
      ) : null}
    </div>
  );
}

export default OrdersPage;
