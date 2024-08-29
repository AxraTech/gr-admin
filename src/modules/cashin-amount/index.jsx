import { useEffect, useState } from "react";
import CustomTable from "../common/components/custom-table";
import { cashinColumn } from "../common/components/custom-table/columns";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import nProgress from "nprogress";
import { GET_CASHIN_AMOUNT } from "../../graphql/query/cash-in-query";

const CashinList = () => {
  const navigate = useNavigate();
  const {
    data: cashinList,
    loading: fetchCashinList,
    error: fetchCashinError,
    refetch: cashinRefetch
  } = useQuery(GET_CASHIN_AMOUNT);

  useEffect(() => {
    if (location.state?.refetch) {
      cashinRefetch();
    }
  }, [location.state, cashinRefetch]);

  const column = cashinColumn(navigate);

  const tableData = cashinList? cashinList.cashin_amounts: []
  console.log(tableData)

  useEffect(() => {
    if (fetchCashinList) {
      nProgress.configure({
        parent: "#progress-bar-container",
        showSpinner: false,
      });
      nProgress.start();
    } else {
        nProgress.done();
    }

    return () => {
        nProgress.done();
    };
  }, [fetchCashinList, fetchCashinError]);

  return (
    <div className="w-full flex flex-col gap-4 pr-5 pl-5">
      <div className="w-full h-20 flex flex-row items-center justify-between">
        {/* <div className="flex flex-row items-center gap-4">
          <input
            className="w-[15vw] p-2 rounded border border-purple-800"
            type="text"
          />
          <button className="border border-purple-800">Search</button>
        </div> */}
        <div className="flex flex-row items-center gap-8">
          <div className="">
            {/* <CustomFilter setOptions={setFilter} option={cashinFilterOptions} /> */}
          </div>
          <div className="h-12">
            <button
              className="bg-green-600 hover:border-green-500 text-white duration-500 hover:bg-green-400 hover:text-gray-800"
              onClick={() => navigate("cashinlists/createcashin")}
            >
              New
            </button>
          </div>
        </div>
      </div>
      <CustomTable column={column} tableData={tableData} />
    </div>
  );
};
export default CashinList;
