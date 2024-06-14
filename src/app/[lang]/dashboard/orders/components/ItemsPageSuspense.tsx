import React from "react";

function ItemsLoading() {
  return (
    <div className="text-black flex flex-col w-full h-full overflow-y-scroll">
      <div className="flex flex-col  md:grid md:grid-cols-3 gap-5">
        <div className="w-full  h-[115px] p-6 rounded-2xl flex justify-between items-end bg-gray-200 rounded animate-pulse">
          <div className="flex flex-col gap-3">
            <h2 className="w-[182px] h-[24px] bg-gray-300 rounded animate-pulse"></h2>
            <h1 className="w-9 h-9 bg-gray-300 leading-8 rounded animate-pulse "></h1>
          </div>
          <div>
            <h3>
              <h3 className="w-[86px] h-[26px] bg-gray-300 rounded animate-pulse"></h3>
            </h3>
          </div>
        </div>
        <div className="w-full  h-[115px] p-6 rounded-2xl flex justify-between items-end bg-gray-200 rounded animate-pulse">
          <div className="flex flex-col gap-3">
            <h2 className="w-[182px] h-[24px] bg-gray-300 rounded animate-pulse"></h2>
            <h1 className="w-9 h-9 bg-gray-300 leading-8 rounded animate-pulse "></h1>
          </div>
          <div>
            <h3>
              <h3 className="w-[86px] h-[26px] bg-gray-300 rounded animate-pulse"></h3>
            </h3>
          </div>
        </div>

        <div className="w-full  h-[115px] p-6 rounded-2xl flex justify-between items-end  bg-gray-200 rounded animate-pulse">
          <div className="flex flex-col gap-3">
            <h2 className="w-[182px] h-[24px] bg-gray-300 rounded animate-pulse"></h2>
            <h1 className="w-9 h-9 bg-gray-300 leading-8 rounded animate-pulse "></h1>
          </div>
          <div>
            <h3>
              <h3 className="w-[86px] h-[26px] bg-gray-300 rounded animate-pulse"></h3>
            </h3>
          </div>
        </div>
      </div>

      <div className="mt-10 overflow-x-scroll min-w-[900px] h-[500px] border rounded-[20px] bg-gray-200 animate-pulse ">
        <div className="w-full  flex justify-between p-3 items-center ">
          <div className="flex items-center gap-4">
            <div role="tablist" className="tabs w-[350px] flex justify-around">
              <div className="tab w-[75px] rounded-[30px]  bg-gray-300 rounded animate-pulse"></div>
              <div className="tab w-[75px] rounded-[30px]  bg-gray-300 rounded animate-pulse"></div>
              <div className="tab w-[75px] rounded-[30px]  bg-gray-300 rounded animate-pulse"></div>
              <div className="tab w-[75px] rounded-[30px]  bg-gray-300 rounded animate-pulse"></div>
            </div>

            <div className=" w-[275px] h-[30px] rounded-[30px]  bg-gray-300 rounded animate-pulse "></div>
          </div>
          <div className="w-[180px] h-[30px] border rounded-[30px] p-1 px-3 bg-gray-300 rounded animate-pulse"></div>
        </div>

        <table className="table">
          <thead className="">
            <tr>
              <th>
                <div className="w-[60px] h-[25px] bg-gray-300 rounded animate-pulse "></div>
              </th>
              <th>
                <div className="w-[60px] h-[25px] bg-gray-300 rounded animate-pulse "></div>
              </th>
              <th>
                <div className="w-[60px] h-[25px] bg-gray-300 rounded animate-pulse "></div>
              </th>
              <th>
                <div className="w-[60px] h-[25px] bg-gray-300 rounded animate-pulse "></div>
              </th>
              <th>
                <div className="w-[60px] h-[25px] bg-gray-300 rounded animate-pulse "></div>
              </th>
              <th>
                <div className="w-[60px] h-[25px] bg-gray-300 rounded animate-pulse "></div>
              </th>
              <th>
                <div className="w-[60px] h-[25px] bg-gray-300 rounded animate-pulse "></div>
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}

export default ItemsLoading;
