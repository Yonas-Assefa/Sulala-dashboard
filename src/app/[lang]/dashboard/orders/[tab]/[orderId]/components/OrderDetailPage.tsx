"use client";
import React from "react";
import BackButton from "@/components/common/ui/BackButton";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import StatusBadge from "@/components/common/ui/StatusBadge";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useFormState } from "react-dom";
import { acceptCancelOrder } from "@/actions/orders/accept-cancel-new-order";
import { EMPTY_FORM_STATE } from "@/utils/formStateHelper";
import { usePathname } from "next/navigation";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";

function OrderDetailPage({ orderDetail }: any) {
  const pathname = usePathname();
  const t = useTranslations("Order");
  const hasOrders = pathname.includes("items");
  if (!hasOrders) {
    return notFound();
  }

  const [status, setStatus] = React.useState<"ACCEPTED" | "DECLINED">();
  const handleStatusChange = () => {
    setStatus(status === "ACCEPTED" ? "DECLINED" : "ACCEPTED");
  };

  const [formState, action] = useFormState(acceptCancelOrder, EMPTY_FORM_STATE);
  useToastMessage(formState);
  console.log(
    "console.log of vendor_order_status",
    orderDetail.vendor_order_status,
    orderDetail.vendor_order_status.toUpperCase(),
  );

  return (
    <div className="flex flex-col md:gap-3 gap-2  bg-gray-200 text-black w-full h-screen overflow-scroll">
      <div className="w-full  flex flex-col gap-3 p-6 bg-tertiary">
        <div className="flex flex-row  justify-between items-start">
          <BackButton />
        </div>
        <div className="flex flex-row justify-between items-center md:mx-6 md:px-5 mx-3 px-3">
          <div>
            <h1 className="text-2xl md:text-4xl">
              {t("order")} <span className="font-bold ">#{orderDetail.id}</span>
            </h1>
          </div>

          {orderDetail.vendor_order_status.toUpperCase() === "NEW" && (
            <div>
              <form action={action}>
                <input
                  type="text"
                  value={orderDetail.id}
                  name="vendor_id"
                  id="vendor_id"
                  onChange={() => {}}
                  hidden
                />
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-3 md:flex-row md:gap-12">
                    <div className="flex flex-row gap-1">
                      <input
                        type="radio"
                        name="status"
                        value="ACCEPTED"
                        id="accept"
                        onChange={handleStatusChange}
                        checked={status == "ACCEPTED"}
                        className="radio radio-success"
                      />
                      <label
                        htmlFor="accept"
                        className={`cursor-pointer text-xl`}
                      >
                        {t("order_accept")}
                      </label>
                    </div>

                    <div className="flex flex-row gap-1">
                      <input
                        type="radio"
                        name="status"
                        value="DECLINED"
                        id="decline"
                        className="radio radio-error"
                        checked={status == "DECLINED"}
                        onChange={handleStatusChange}
                      />
                      <label
                        htmlFor="decline"
                        className={`cursor-pointer text-xl`}
                      >
                        {t("order_decline")}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <PrimaryButton disabled={!status?.length} padding="xsm" />
                </div>
              </form>
            </div>
          )}

          {/* <div className=" flex flex-col md:flex-row  md:justify-center gap-3 md:items-center">
              <PrimaryButton name="Accept" />
              <PrimaryButton name="Decline" action="cancel" />
            </div> */}
        </div>
      </div>

      <div className="w-full flex flex-col md:grid md:grid-cols-3 gap-3 ">
        <div className="flex flex-col col-span-2">
          {/* start order */}
          <div className=" text-xl  flex flex-col gap-3 bg-tertiary md:mx-6 md:px-5 mx-3 px-3 py-5">
            <h1 className="font-bold text-xl capitalize py-4">
              {t("order_detail")}
            </h1>

            <div className="flex flex-row justify-between items-center mb-5">
              <div className="flex flex-col gap-2 ">
                <h1 className="capitalize text-gray-400">
                  {t("order_placed")}
                </h1>
                <h2 className="capitalize">{orderDetail.ordered_at}</h2>
              </div>
              <div className="flex flex-col gap-4 pr-5 md:flex-row justify-around md:gap-16 text-md ">
                <div className="flex flex-col  items-end">
                  <h4 className="text-gray-400 capitalize"> {t("status")}</h4>
                  <StatusBadge status={orderDetail.vendor_order_status} />
                </div>

                <div className="flex flex-col  items-end">
                  <h4 className="text-gray-400 capitalize">{t("payment")}</h4>
                  <StatusBadge status="Paid" />
                </div>

                <div className="flex flex-col items-end">
                  <h4 className="text-gray-400 capitalize">{t("driver")} </h4>
                  <StatusBadge status="Assigned" />
                </div>
              </div>
            </div>

            <hr />

            {/* start order items detail  */}
            <div className="flex flex-col gap-3 text-sm">
              {orderDetail.order_items.map((order_item: any, index: any) => {
                return (
                  <div className="flex flex-row justify-between mt-5 shadow-sm">
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row items-center pr-4">
                        <img
                          className="w-24 h-24 rounded-md"
                          src={
                            order_item.image
                              ? order_item.image
                              : "/images/product-placeholder.jpg"
                          }
                          alt="product image "
                        />
                      </div>

                      <div className="flex flex-col justify-around text-lg">
                        <h2 className="text-primary ">
                          {order_item.product_name}
                        </h2>

                        <p>
                          {" "}
                          {t("quantity")}: {order_item.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col justify-around text-lg ">
                      <div className="flex flex-row justify-between gap-10 w-[200px]">
                        <h3 className="text-gray-400">{t("unit_price")}: </h3>
                        <p>{order_item.unit_price}</p>
                      </div>

                      <div className="flex flex-row justify-between gap-10 w-[200px]">
                        <h3 className="text-gray-400">{t("fee")}: </h3>
                        <p>{order_item.fee}</p>
                      </div>

                      <div className="flex flex-row justify-between gap-10 w-[200px]">
                        <h3 className="text-gray-400">{t("total")}: </h3>
                        <p>{order_item.total_price}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* end order items detail  */}

            <hr />

            <div className="flex flex-col my-8 gap-3">
              <div className="flex flex-row justify-between">
                <p>{t("subtotal")}</p>
                <p>{orderDetail.order_total}</p>
              </div>
              <div className="flex flex-row justify-between">
                <p>{t("discount")}</p>
                <p>- {orderDetail.discount}</p>
              </div>
              <div className="flex flex-row justify-between">
                <p>{t("total_fee")}</p>
                <p>+ {orderDetail.fee}</p>
              </div>
              <hr />
              <div className="flex flex-row justify-between my-5 font-bold">
                <h1>{t("total")}</h1>
                <p>{orderDetail.total_amount}</p>
              </div>
            </div>
          </div>
          {/* end order */}

          {/* start history */}
          <div className=" text-xl  flex flex-col gap-3 bg-tertiary md:mx-6 md:px-5 mx-3 px-3 py-5 mt-5">
            <h1 className="font-bold text-xl capitalize py-4">
              {t("order_history")}
            </h1>
            <div className="pl-10">
              <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                <li className="mb-10 ms-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                    <img
                      src="/icons/order-placed.svg"
                      alt="checkmark icon"
                      className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
                    />
                  </span>
                  <div className="flex flex-row justify-between items-center w-full">
                    <div className="flex flex-col justify-around gap-10">
                      <h3 className="font-medium leading-tight">
                        Order Placed
                      </h3>
                      <p className="text-sm">Jan 21, 2021</p>
                    </div>

                    <div>
                      <h2>12:30</h2>
                    </div>
                  </div>
                </li>

                <li className="mb-10 ms-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                    <img
                      src="/icons/order-placed.svg"
                      alt="checkmark icon"
                      className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
                    />
                  </span>

                  <div className="flex flex-row justify-between items-center w-full">
                    <div className="flex flex-col justify-around gap-10">
                      <h3 className="font-medium leading-tight">
                        Order Accepted
                      </h3>
                      <p className="text-sm">Jan 22, 2021</p>
                    </div>

                    <div>
                      <h2>09:30</h2>
                    </div>
                  </div>
                </li>

                <li className="mb-10 ms-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                    <img
                      src="/icons/order-placed.svg"
                      alt="checkmark icon"
                      className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
                    />
                  </span>

                  <div className="flex flex-row justify-between items-center w-full">
                    <div className="flex flex-col justify-around gap-10">
                      <h3 className="font-medium leading-tight">
                        Order Declined
                      </h3>
                      <p className="text-sm">Jan 23, 2021</p>
                    </div>

                    <div>
                      <h2>01:30</h2>
                    </div>
                  </div>
                </li>

                <li className="mb-10 ms-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                    <img
                      src="/icons/order-placed.svg"
                      alt="checkmark icon"
                      className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
                    />
                  </span>

                  <div className="flex flex-row justify-between items-center w-full">
                    <div className="flex flex-col justify-around gap-10">
                      <h3 className="font-medium leading-tight">
                        Order Shipped
                      </h3>
                      <p className="text-sm">Jan 27, 2021</p>
                    </div>

                    <div>
                      <h2>02:30</h2>
                    </div>
                  </div>
                </li>

                <li className="mb-10 ms-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                    <img
                      src="/icons/order-placed.svg"
                      alt="checkmark icon"
                      className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
                    />
                  </span>

                  <div className="flex flex-row justify-between items-center w-full">
                    <div className="flex flex-col justify-around gap-10">
                      <h3 className="font-medium leading-tight">
                        Order Payment Placed
                      </h3>
                      <p className="text-sm">Jan 29, 2021</p>
                    </div>

                    <div>
                      <h2>10:50</h2>
                    </div>
                  </div>
                </li>

                <li className="mb-10 ms-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                    <img
                      src="/icons/order-placed.svg"
                      alt="checkmark icon"
                      className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
                    />
                  </span>

                  <div className="flex flex-row justify-between items-center w-full">
                    <div className="flex flex-col justify-around gap-10">
                      <h3 className="font-medium leading-tight">
                        Order Delivered
                      </h3>
                      <p className="text-sm">Jan 29, 2021</p>
                    </div>

                    <div>
                      <h2>01:30</h2>
                    </div>
                  </div>
                </li>

                <li className="mb-10 ms-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                    <img
                      src="/icons/order-placed.svg"
                      alt="checkmark icon"
                      className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
                    />
                  </span>

                  <div className="flex flex-row justify-between items-center w-full">
                    <div className="flex flex-col justify-around gap-10">
                      <h3 className="font-medium leading-tight">
                        Order Marked as Completed
                      </h3>
                      <p className="text-sm">Jan 29, 2021</p>
                    </div>

                    <div>
                      <h2>10:30</h2>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
          {/* end history */}
        </div>

        <div className="bg-tertiary flex flex-col gap-5 p-6 ">
          <div>
            <h1 className="capitalize text-xl font-bold pb-3">
              {t("customer_detail")}
            </h1>
            <div className="flex flex-row w-fit gap-8">
              <div className="text-gray-400">
                <p>{t("name")}</p>
                <p>{t("email")}</p>
                <p>{t("address")}</p>
              </div>

              <div>
                <p>
                  {" "}
                  {orderDetail.user.first_name
                    ? orderDetail.user.first_name +
                      " " +
                      orderDetail.user.last_name
                    : "Uknown"}
                </p>
                <p>{orderDetail.user.email}</p>
                <p>st. Jorge St, Bole, rwuande, addis ababa, ethiopia</p>
              </div>
            </div>
          </div>

          <hr />

          <div>
            <h1 className="capitalize text-xl font-bold pb-3">
              Shipping Address
            </h1>
            <div className="flex flex-row w-fit gap-8">
              <div className="text-gray-400">
                <p>name</p>
                <p>email</p>
                <p>Address</p>
              </div>

              <div>
                <p>Yoseph Taddessees</p>
                <p>yosephtadesseaworkemeil@gmail.com</p>
                <p>st. Jorge St, Bole, rwuande, addis ababa, ethiopia</p>
              </div>
            </div>
          </div>

          <hr />

          <div>
            <h1 className="capitalize text-xl font-bold pb-3">
              Billing AddorderDetails
            </h1>
            <div className="flex flex-row w-fit gap-8">
              <div className="text-gray-400">
                <p>name</p>
                <p>email</p>
                <p>AddorderDetails</p>
              </div>

              <div>
                <p>Yoseph Taddessees</p>
                <p>yosephtadesseaworkemeil@gmail.com</p>
                <p>st. Jorge St, Bole, rwuande, addis ababa, ethiopia</p>
              </div>
            </div>
          </div>

          <hr />

          <div>
            <h1 className="capitalize text-xl font-bold pb-3">Driver Detail</h1>
            <div className="flex flex-row w-fit gap-8">
              <div className="text-gray-400">
                <p>name</p>
                <p>email</p>
                <p>Address</p>
              </div>

              <div>
                <p>Yoseph Taddessees</p>
                <p>yosephtadesseaworkemeil@gmail.com</p>
                <p>st. Jorge St, Bole, rwuande, addis ababa, ethiopia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailPage;
