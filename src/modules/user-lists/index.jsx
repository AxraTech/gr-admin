import { useEffect, useState } from "react";
import CustomTable from "../common/components/custom-table";
import { userColumn } from "../common/components/custom-table/columns";
import CustomFilter from "../common/components/custom-filter";
import { useNavigate } from "react-router-dom";
import { useQuery,useLazyQuery } from "@apollo/client";
import { GET_CUSTOMERS, GET_CUSTOMERS_BY_STATUS } from "../../graphql/query/customer-query";
import nProgress from "nprogress";
import { customerFilterOptions } from "../../lib/config";

const UserList = () => {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const [getCustomers,{
    data: customerList,
    loading: fetchCustomerList,
    error: fetchCustomerError,
    refetch: customerRefetch
  }] = useLazyQuery(GET_CUSTOMERS);

  useEffect(() => {
    if (location.state?.refetch) {
      customerRefetch();
    }
  }, [location.state, customerRefetch]);

  console.log(filter)

  const [getCustomersByStatus,{data:customerListByStatus,loading:fetchCustomerListByStatus}] = useLazyQuery(GET_CUSTOMERS_BY_STATUS)
  const customerLists = customerList ? customerList.customers : [];
  console.log(customerLists)

  const column = userColumn(navigate);
  
  useEffect(() => {
    if(filter === '' || filter === 'all'){
        getCustomers();
    }else if(filter === 'enable'){
       getCustomersByStatus({
        variables:{disabled:false}
       })
    }
    else{
        getCustomersByStatus({
            variables:{disabled:true}
           })
    }
  },[filter,getCustomers,getCustomersByStatus])

  const tableData = filter === '' || filter === 'all' ?(customerList? customerList.customers: []):(customerListByStatus? customerListByStatus.customers:[])

  useEffect(() => {
    if (fetchCustomerList) {
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
  }, [fetchCustomerList, fetchCustomerError]);

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
            <CustomFilter setOptions={setFilter} option={customerFilterOptions} />
          </div>
          <div className="h-12">
            <button
              className="bg-green-600 hover:border-green-500 text-white duration-500 hover:bg-green-400 hover:text-gray-800"
              onClick={() => navigate("customerlists/createcustomer")}
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
export default UserList;
