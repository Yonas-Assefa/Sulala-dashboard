"use client";
import React from "react";
import BackButton from "@/components/common/ui/BackButton";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import StatusBadge from "@/components/common/ui/StatusBadge";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useFormState } from "react-dom";
import { acceptCancelOrder } from "@/actions/orders/accept-cancel-new-order";
import { EMPTY_FORM_STATE } from "@/utils/formStateHelper";
function OrderDetailPage({ res }: any) {
  const [status, setStatus] = React.useState<"APPROVE" | "REJECT">();
  const handleStatusChange = () => {
    setStatus(status === "APPROVE" ? "REJECT" : "APPROVE");
  };

  const [formState, action] = useFormState(acceptCancelOrder, EMPTY_FORM_STATE);

  useToastMessage(formState);
  console.log("id of order: ", res, res.id);

  return (
    <div className="flex flex-col md:gap-3 gap-2  bg-gray-200 text-black w-full h-screen overflow-scroll">
      <div className="w-full  flex flex-col gap-3 p-6 bg-tertiary">
        <div className="flex flex-row  justify-between items-start">
          <BackButton />
        </div>
        <div className="flex flex-row justify-between items-center md:mx-6 md:px-5 mx-3 px-3">
          <div>
            <h1 className="text-2xl md:text-4xl">
              Order: <span className="font-bold ">#{res.id}</span>
            </h1>
          </div>

          {!res.orderApproved && (
            <div>
              <form action={action}>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-3 md:flex-row md:gap-12">
                    <div className="flex flex-row gap-1">
                      <input
                        type="radio"
                        name="status"
                        value="APPROVE"
                        id="approve"
                        onChange={handleStatusChange}
                        checked={status == "APPROVE"}
                        className="radio radio-success"
                      />
                      <label
                        htmlFor="approve"
                        className={`cursor-pointer text-xl`}
                      >
                        Accept
                      </label>
                    </div>

                    <div className="flex flex-row gap-1">
                      <input
                        type="radio"
                        name="status"
                        value="REJECT"
                        id="reject"
                        className="radio radio-error"
                        checked={status == "REJECT"}
                        onChange={handleStatusChange}
                      />
                      <label
                        htmlFor="reject"
                        className={`cursor-pointer text-xl`}
                      >
                        Cancel
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <PrimaryButton padding="xsm" />
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
            <h1 className="font-bold text-xl capitalize py-4">order details</h1>

            <div className="flex flex-row justify-between items-center mb-5">
              <div className="flex flex-col gap-2 ">
                <h1 className="capitalize text-gray-400">order placed</h1>
                <h2 className="capitalize">{res.ordered_at}</h2>
              </div>
              <div className="flex flex-col gap-4 pr-5 md:flex-row justify-around md:gap-16 text-md ">
                <div className="flex flex-col  items-end">
                  <h4 className="text-gray-400 capitalize">Status</h4>
                  <StatusBadge status="Cancelled" statusType="fail" />
                </div>
                <div className="flex flex-col  items-end">
                  <h4 className="text-gray-400 capitalize">payment</h4>
                  <StatusBadge status="Paid" statusType="success" />
                </div>
                <div className="flex flex-col items-end">
                  <h4 className="text-gray-400 capitalize">driver </h4>
                  <StatusBadge status="Assigned" statusType="success" />
                </div>
              </div>
            </div>

            <hr />

            {/* start order items detail  */}
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex flex-row justify-between mt-10">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row items-center pr-4">
                    <img
                      className="w-24 h-24"
                      src="/cat.jpeg"
                      alt="product image "
                    />
                  </div>

                  <div className="flex flex-col justify-around text-lg">
                    <h2 className="text-primary">product name</h2>
                    <p>product short discription</p>
                    <p> quantity: 3</p>
                  </div>
                </div>

                <div className="flex flex-col justify-around text-lg ">
                  <div className="flex flex-row justify-between gap-10 w-[200px]">
                    <h3 className="text-gray-400">unit price: </h3>
                    <p>$123</p>
                  </div>

                  <div className="flex flex-row justify-between gap-10 w-[200px]">
                    <h3 className="text-gray-400">Fee: </h3>
                    <p>$13</p>
                  </div>

                  <div className="flex flex-row justify-between gap-10 w-[200px]">
                    <h3 className="text-gray-400">Total: </h3>
                    <p>$183</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-row justify-between mt-10">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row items-center pr-4">
                    <img
                      className="w-24 h-24"
                      src="/cat.jpeg"
                      alt="product image "
                    />
                  </div>

                  <div className="flex flex-col justify-around text-lg">
                    <h2 className="text-primary">product name</h2>
                    <p>product short discription</p>
                    <p> quantity: 3</p>
                  </div>
                </div>

                <div className="flex flex-col justify-around text-lg ">
                  <div className="flex flex-row justify-between gap-10 w-[200px]">
                    <h3 className="text-gray-400">unit price: </h3>
                    <p>$123</p>
                  </div>

                  <div className="flex flex-row justify-between gap-10 w-[200px]">
                    <h3 className="text-gray-400">Fee: </h3>
                    <p>$13</p>
                  </div>

                  <div className="flex flex-row justify-between gap-10 w-[200px]">
                    <h3 className="text-gray-400">Total: </h3>
                    <p>$183</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-row justify-between mt-10">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row items-center pr-4">
                    <img
                      className="w-24 h-24"
                      src="/cat.jpeg"
                      alt="product image "
                    />
                  </div>

                  <div className="flex flex-col justify-around text-lg">
                    <h2 className="text-primary">product name</h2>
                    <p>product short discription</p>
                    <p> quantity: 3</p>
                  </div>
                </div>

                <div className="flex flex-col justify-around text-lg ">
                  <div className="flex flex-row justify-between gap-10 w-[200px]">
                    <h3 className="text-gray-400">unit price: </h3>
                    <p>$123</p>
                  </div>

                  <div className="flex flex-row justify-between gap-10 w-[200px]">
                    <h3 className="text-gray-400">Fee: </h3>
                    <p>$13</p>
                  </div>

                  <div className="flex flex-row justify-between gap-10 w-[200px]">
                    <h3 className="text-gray-400">Total: </h3>
                    <p>$183</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-row justify-between mt-10">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row items-center pr-4">
                    <img
                      className="w-24 h-24"
                      src="/cat.jpeg"
                      alt="product image "
                    />
                  </div>

                  <div className="flex flex-col justify-around text-lg">
                    <h2 className="text-primary">product name</h2>
                    <p>product short discription</p>
                    <p> quantity: 3</p>
                  </div>
                </div>

                <div className="flex flex-col justify-around text-lg ">
                  <div className="flex flex-row justify-between gap-10 w-[200px]">
                    <h3 className="text-gray-400">unit price: </h3>
                    <p>$123</p>
                  </div>

                  <div className="flex flex-row justify-between gap-10 w-[200px]">
                    <h3 className="text-gray-400">Fee: </h3>
                    <p>$13</p>
                  </div>

                  <div className="flex flex-row justify-between gap-10 w-[200px]">
                    <h3 className="text-gray-400">Total: </h3>
                    <p>$183</p>
                  </div>
                </div>
              </div>
            </div>
            {/* end order items detail  */}

            <hr />

            <div className="flex flex-col my-8 gap-3">
              <div className="flex flex-row justify-between">
                <p>Subtotal</p>
                <p>$12390</p>
              </div>
              <div className="flex flex-row justify-between">
                <p>Promotion Fee</p>
                <p>----</p>
              </div>
              <div className="flex flex-row justify-between">
                <p>Total Fee</p>
                <p>+ $120</p>
              </div>
              <hr />
              <div className="flex flex-row justify-between my-5 font-bold">
                <h1>Total</h1>
                <p>$98987</p>
              </div>
            </div>
          </div>
          {/* end order */}

          {/* start history */}
          <div className=" text-xl  flex flex-col gap-3 bg-tertiary md:mx-6 md:px-5 mx-3 px-3 py-5 mt-5">
            <h1 className="font-bold text-xl capitalize py-4">Order History</h1>
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
              Customer Details
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
              Billing Address
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
