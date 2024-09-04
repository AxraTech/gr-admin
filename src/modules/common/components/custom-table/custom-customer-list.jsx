import { useQuery } from "@apollo/client";
import clsx from "clsx";
import { FaUserAlt } from "react-icons/fa";
import { GET_CUSTOMERS_CREATED_LAST_SEVEN_DAYS } from "../../../../graphql/query/customer-query";

const CustomCustomerList = () => {
  

  const { data: weeklyCustomer, loading: weeklyCustomerLoading } =
    useQuery(GET_CUSTOMERS_CREATED_LAST_SEVEN_DAYS);
  const weeklyCustomerLists = weeklyCustomer
    ? weeklyCustomer.customers
    : [];
  console.log("weekly Customer list", weeklyCustomerLists);
  if (weeklyCustomerLoading) return <div className="w-full h-full flex items-center justify-center">Loading...</div>;
  return (
    <>
      {weeklyCustomerLists.length > 0 ? (
        weeklyCustomerLists.map((Customer) => {
            const colors = ["red", "blue", "green"];
          const randomColor =colors[ Math.floor(Math.random() * colors.length)];
          return (
            <div
              key={Customer.id}
              className="w-full h-[5rem] border mt-2 bg-white border-gray-500 p-3 rounded grid grid-cols-3"
            >
              <div className="w-full h-full flex flex-row gap-2">
                <div
                  className={clsx("h-full w-2/5 rounded-lg flex items-center justify-center")}
                >
                    <FaUserAlt size={25}/>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="">{Customer.name}</p>
                </div>
              </div>
              <div className="w-full h-full flex items-center justify-center">
                <p>{Customer.phone} KS</p>
              </div>
              <div className="w-full h-full flex items-center justify-center">
                <p>{Customer.email}</p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="w-full h-full flex items-center justify-center">No Customers created in last seven days</div>
      )}
    </>
  );
};

export default CustomCustomerList;
