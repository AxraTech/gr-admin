import { FaUserGroup } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { useQuery } from "@apollo/client";
import { GET_CARDS } from "../../graphql/query/card-query";
import { GET_CUSTOMERS } from "../../graphql/query/customer-query";
import { GET_CARDS_TRANSACTION, GET_CARDS_TRANSACTION_SEVENDAYS } from "../../graphql/query/card-transaction-query";
import TrasnactionDoughnutChart from "../../modules/common/components/transaction-donut-chart";
import { useState } from "react";
import clsx from "clsx";
import CustomTransctionList from "../../modules/common/components/custom-transaction-list";
import CustomCustomerList from "../../modules/common/components/custom-table/custom-customer-list";


const Home = () => {
 const {data:getCard,loading:fetchCardloading} = useQuery(GET_CARDS);
 const [isTransaction,setIsTransaction] = useState(true)
 const totalCard = getCard && getCard.cards.length>0? getCard.cards.length : 0;
 const {data:getTransaction,loading:fetchTransactionloading} = useQuery(GET_CARDS_TRANSACTION);
 const totalTransaction = getTransaction && getTransaction.card_transactions.length>0? getTransaction.card_transactions.length : 0;
 const {data:getCustomer,loading:fetchCustomerloading} = useQuery(GET_CUSTOMERS);
 const totalCustomers = getCustomer && getCustomer.customers.length>0? getCustomer.customers.length : 0;
  const TOTAL_COUNT = [
    {
        id:'1',
        name:'Totoal Customers',
        count: totalCustomers,
        icon: <FaUserGroup size={35}/>
    },
    {
        id:'2',
        name:'Totoal Cards',
        count: totalCard,
        icon: <BsFillCreditCard2FrontFill size={35}/>
    },
    {
        id:'3',
        name:'Totoal Transactions',
        count: totalTransaction,
        icon: <GrTransaction size={35}/>
    },
  ]


  return (
    <div className="w-full flex flex-col gap-8 pr-5 pl-5">
     <div className="w-full h-[13rem] grid grid-cols-3  mt-6 gap-3">
        {TOTAL_COUNT.map((category) => (
            <div key={category.id} className="border-2  border-purple-400 p-1 rounded-md">
                <div className="w-full h-full rounded bg-purple-600 text-white border border-purple-400 grid grid-cols-6">
                    <div className="col-span-4 border-r border-purple-200 w-full h-full grid grid-cols-1">
                        <div className="flex items-center justify-center"><h3 className="font-bold text-xl text-center">{category.name}</h3></div>
                        <div><p className="text-lg">{category.count}</p></div>
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                        {category.icon}
                    </div>
                </div>
            </div>
        ))}
     </div>
     <div className="w-full h-full flex flex-row justify-between gap-4">
        <div className="w-[53rem] h-[55vh] border-2 border-purple-800 rounded flex flex-col p-4">
            <div className="w-full h-[5rem] flex flex-row border border-gray-500 bg-green-600 text-white items-center rounded-t">
                <div
                onClick={() => setIsTransaction(true)} 
                className={clsx("h-full flex items-center hover:cursor-pointer justify-center p-4 transition-all",{
                    "border-b-4 border-gray-100":isTransaction
                })}
                ><p className="">Weekly Trasnsaction</p></div>
                <div 
                onClick={() => setIsTransaction(false)}
                 className={clsx("h-full flex items-center hover:cursor-pointer justify-center p-4 transition-all",{
                    "border-b-4 border-gray-100":!isTransaction
                })}
                >Weekly Onboarded Customer</div>
            </div>
            <div className="w-full h-full overflow-auto border pt-2 bg-gray-100 border-gray-200">
                {isTransaction?(
                   <CustomTransctionList/>                
                ):(
                    <CustomCustomerList/>
                )}
            </div>
        </div>
        <div className="min-w-[20vw] h-[55vh] border-2 border-purple-800 rounded p-8">
                <div className="w-full h-full flex flex-col gap-4">
                    <h3 className="font-bold text-2xl text-left">Transaction Statisitcs</h3>
                    <div className="w-full h-full ">
                        <TrasnactionDoughnutChart/>
                    </div>
                </div>
        </div>
     </div>
    </div>
  );
};
export default Home;
