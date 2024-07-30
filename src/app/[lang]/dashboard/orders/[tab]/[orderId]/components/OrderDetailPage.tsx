"use client";
import React from "react";
import BackButton from "@/components/common/ui/BackButton";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import StatusBadge from "./StatusBadge";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useFormState } from "react-dom";
import { acceptCancelOrder } from "@/actions/orders/accept-cancel-new-order";
import { EMPTY_FORM_STATE } from "@/utils/formStateHelper";
import { usePathname } from "next/navigation";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { OrderTimelineEvent } from "@/actions/mapper/orders-mapper";

function OrderDetailPage({ orderDetail }: any) {
  const pathname = usePathname();
  const t = useTranslations("Order");
  const hasOrders = pathname.includes("items");
  if (!hasOrders) {
    return notFound();
  }

  const [status, setStatus] = React.useState<"ACCEPTED" | "DECLINED">();
  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value === "ACCEPTED" ? "ACCEPTED" : "DECLINED");
  };

  const [formState, action] = useFormState(acceptCancelOrder, EMPTY_FORM_STATE);
  useToastMessage(formState);

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
              <div className="flex flex-col gap-2 pr-5 md:flex-row justify-around md:gap-4 text-md ">
                <div className="flex flex-col  items-end">
                  <h4 className="text-gray-400 capitalize"> {t("status")}</h4>
                  <StatusBadge
                    status={orderDetail.vendor_order_status}
                    type="ORDER"
                  />
                </div>

                {/* <div className="flex flex-col  items-end">
                  <h4 className="text-gray-400 capitalize">{t("payment")}</h4>
                  <StatusBadge status="Paid" type="PAYMENT" />
                </div> */}

                <div className="flex flex-col items-end">
                  <h4 className="text-gray-400 capitalize">{t("driver")} </h4>
                  <StatusBadge
                    status={orderDetail.driver_assigned}
                    type="DRIVER"
                  />
                </div>
              </div>
            </div>

            <hr />

            {/* start order items detail  */}
            <div className="flex flex-col gap-3 text-sm">
              {orderDetail.order_items.map((order_item: any, index: any) => {
                return (
                  <div className="flex flex-row justify-between mt-2 shadow-sm">
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

                      <div className="flex flex-col justify-center text-lg">
                        <h2 className="text-primary py-1">
                          {order_item.product_name}
                        </h2>

                        <p>
                          {" "}
                          {t("quantity")}: {order_item.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col justify-around text-lg ">
                      <div className="flex flex-row justify-between gap-10 min-w-[210px]">
                        <h3 className="text-gray-400">{t("unit_price")}: </h3>
                        <p>{order_item.unit_price}</p>
                      </div>

                      <div className="flex flex-row justify-between gap-10 min-w-[210px]">
                        <h3 className="text-gray-400">{t("fee")}: </h3>
                        <p>{order_item.fee}</p>
                      </div>

                      <div className="flex flex-row justify-between gap-10 min-w-[210px]">
                        <h3 className="text-gray-400">{t("total")}: </h3>
                        <p>{order_item.total_price}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* end order items detail  */}

            <div className="flex flex-col md:my-6 md-2 gap-3">
              <div className="flex flex-row justify-between text-lg">
                <p>{t("subtotal")}</p>
                <p>{orderDetail.order_total}</p>
              </div>
              <div className="flex flex-row justify-between text-lg">
                <p>{t("discount")}</p>
                <p>- {orderDetail.discount}</p>
              </div>
              <div className="flex flex-row justify-between text-lg">
                <p>{t("total_fee")}</p>
                <p>+ {orderDetail.fee}</p>
              </div>

              <hr />
              <div className="flex flex-row justify-between my-4 font-bold text-lg">
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
                {orderDetail.order_timeline.length == 0 ? (
                  <li className="mb-10 ms-6 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      {t("no_timeline_message")}
                    </p>
                  </li>
                ) : (
                  orderDetail.order_timeline.map(
                    ({ event, created_at }: OrderTimelineEvent) => (
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
                              {event}
                            </h3>
                            <p className="text-sm">
                              {created_at.split(",")[0]},{" "}
                              {created_at.split(",")[1]}
                            </p>
                          </div>

                          <div>
                            <h2>{created_at.split(",")[2]}</h2>
                          </div>
                        </div>
                      </li>
                    ),
                  )
                )}
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
              </div>

              <div>
                <p>
                  {" "}
                  {orderDetail.user.first_name
                    ? orderDetail.user.first_name +
                      " " +
                      orderDetail.user.last_name
                    : "Unknown"}
                </p>
                <p>
                  {orderDetail.user.email ? orderDetail.user.email : "Unknown"}
                </p>
              </div>
            </div>
          </div>

          <hr />

          <div>
            <h1 className="capitalize text-xl font-bold pb-3">
              {t("shipping_info")}
            </h1>

            <div className="flex flex-col">
              <div className="flex flex-row justify-between gap-4 md:gap-6">
                <p className="max-w-xs">Shipping Type</p>
                <p className="max-w-xs text-right">{orderDetail.pickup_type}</p>
              </div>
              <div className="flex flex-row justify-between gap-4 md:gap-6">
                <p className="max-w-xs">Shipping Address</p>
                <p className="max-w-xs text-right">
                  231 Escuela Ave, Mountain View, CA 9404 3, USA
                </p>
              </div>

              <div className="flex flex-row justify-between gap-4 md:gap-6">
                <p className="max-w-xs">Scheduled Delivery start</p>
                <p className="max-w-xs text-right">
                  {orderDetail.schedule_delivery_start}
                </p>
              </div>

              <div className="flex flex-row justify-between gap-4 md:gap-6">
                <p className="max-w-xs">Scheduled Delivery end</p>
                <p className="max-w-xs text-right">
                  {orderDetail.schedule_delivery_end}
                </p>
              </div>
            </div>

            {/* <div className="flex flex-row w-fit gap-8">
              <div className="text-gray-400">
                <p>Shipping Type</p>
                <p>Shipping Address</p>
                <p>Scheduled Delivery start</p>
                <p>Scheduled Delivery end</p>
              </div>

              <div>
                <p>{orderDetail.pickup_type}</p>
                <p>{orderDetail.pickup_point}</p>

                <p>{orderDetail.schedule_delivery_start}</p>
                <p>{orderDetail.schedule_delivery_end}</p>
              </div>
            </div> */}
          </div>
          {/* 
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
          </div> */}

          {orderDetail.driver_detail !== null && (
            <>
              <hr />
              <div>
                <h1 className="capitalize text-xl font-bold pb-3">
                  {t("driver_detail")}
                </h1>
                <div className="flex flex-row w-fit gap-8">
                  <div className="text-gray-400">
                    <p>name</p>
                    <p>phone number</p>
                    <p>email</p>
                  </div>

                  <div>
                    <p>
                      {orderDetail.driver_detail.first_name +
                        " " +
                        orderDetail.driver_detail.last_name}
                    </p>
                    <p>{orderDetail.driver_detail.phone_number}</p>
                    <p>{orderDetail.driver_detail.email}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderDetailPage;
