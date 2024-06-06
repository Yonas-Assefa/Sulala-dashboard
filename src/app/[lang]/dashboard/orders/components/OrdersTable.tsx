import OrdersTableHeader from "../components/OrdersTableHeader";
import Link from "next/link";
import {
  orderItemsMockData,
  orderServicesMockData,
  orderItemsStatusColors,
  orderServicesStatusColors,
  orderItemsDeliveryStatus,
  orderServicesType,
} from "../ordersData";

function OrdersTable({ tableType }: { tableType: string }) {
  return (
    <>
      <div className="overflow-x-auto border rounded-[20px] overflow-hidden min-h-64">
        <OrdersTableHeader />
        <table className="table">
          {/* head */}
          <thead className="text-black bg-secondary/10">
            <tr className="border-secondary/30">
              <th>№</th>
              <th>Order number</th>
              <th>Status</th>
              <th>Date</th>
              <th>Price</th>
              <th>Fee</th>
              {tableType === "items" ? <th>Items</th> : <th>Service</th>}
            </tr>
          </thead>

          <tbody>
            {tableType === "items"
              ? // Render rows for items table
                orderItemsMockData.map((item, index) => (
                  <tr key={index} className="border-secondary/30">
                    <td>{index + 1}</td>
                    <td>{item.order_number}</td>
                    <td className="flex justify-start items-center">
                      <div
                        className={`flex gap-1 flex-row items-center p-2 cursor-pointer rounded-[30px] px-3 ${
                          orderItemsStatusColors[item.status]
                        }`}
                      >
                        <p>{orderItemsDeliveryStatus[item.status]}</p>
                        <img
                          src="/icons/chevron-down.svg"
                          className="w-[20px] aspect-auto"
                          alt=""
                        />
                      </div>
                    </td>
                    <td>{item.date}</td>
                    <td>{item.price}</td>
                    <td>{item.fee}</td>
                    <td className="flex justify-start items-center">
                      <div className="dropdown dropdown-bottom dropdown-end">
                        <div
                          tabIndex={0}
                          role="button"
                          className="bg-white flex flex-row"
                        >
                          <p>{item.items} Items</p>
                          <img
                            src="/icons/chevron-down.svg"
                            className="w-[20px] aspect-auto"
                            alt=""
                          />
                        </div>
                        <div
                          tabIndex={0}
                          className="dropdown-content border rounded-xl z-[1] menu p-4 gap-4 shadow bg-white w-72 text-ellipsis overflow-hidden"
                        >
                          <p className="text-black font-semibold">Items</p>
                          <div className="flex flex-col gap-4 w-64">
                            <div className="flex flex-row items-center gap-3">
                              <img src="/images/milktake-silver.svg" alt="" />
                              <p className="truncate">
                                Pet, Horse & Cattle Shampooooo
                              </p>
                            </div>
                            <div className="flex flex-row items-center gap-3">
                              <img src="/images/milktake-silver.svg" alt="" />
                              <p>Pet, Horse & Cattle Shampoo</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              : // Render rows for services table
                orderServicesMockData.map((item, index) => (
                  <tr key={index} className="border-secondary/30">
                    <td>{index + 1}</td>
                    <td>{item.order_number}</td>
                    <td className="flex justify-start items-center">
                      <div
                        className={`flex gap-1 flex-row items-center p-2 cursor-pointer rounded-[30px] px-3 ${
                          orderServicesStatusColors[item.status]
                        }`}
                      >
                        <p>{orderServicesType[item.status]}</p>
                        <img
                          src="/icons/chevron-down.svg"
                          className="w-[20px] aspect-auto"
                          alt=""
                        />
                      </div>
                    </td>
                    <td>{item.date}</td>
                    <td>{item.price}</td>
                    <td>{item.fee}</td>
                    <td className="flex justify-start items-center">
                      <div
                        className={`flex gap-1 flex-row items-center p-2 cursor-pointer px-3`}
                      >
                        <p>{item.service}</p>
                        <img
                          src="/icons/chevron-down.svg"
                          className="w-[20px] aspect-auto"
                          alt=""
                        />
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default OrdersTable;
