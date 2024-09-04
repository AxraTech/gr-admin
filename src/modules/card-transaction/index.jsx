import { useEffect, useState } from "react";
import CustomTable from "../common/components/custom-table";
import { cardTransactionColumn } from "../common/components/custom-table/columns";
import { useNavigate } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import nProgress from "nprogress";
import { GET_CARDS_TRANSACTION, GET_CARDS_TRANSACTION_BY_TYPE } from "../../graphql/query/card-transaction-query";
import CustomFilter from "../common/components/custom-filter";
import { transactionFilterOptions } from "../../lib/config";

const CardTransactionList = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [getTransacrions,{
    data: cardTransactionList,
    loading: fetchCardTransactionList,
    error: fetchCardTransactionError,
    refetch: transactionRefetch
  }] = useLazyQuery(GET_CARDS_TRANSACTION);

  const [getTransactionByType,{data:transactionListByType,loading:fetchTransactionListByType}] = useLazyQuery(GET_CARDS_TRANSACTION_BY_TYPE)

  useEffect(() => {
    if(filter === '' || filter === 'all'){
      getTransacrions();
    }else if(filter === 'cash in'){
      getTransactionByType({
        variables:{transactionType:"cash in"}
       })
    }
    else{
      getTransactionByType({
            variables:{transactionType:"purchase"}
           })
    }
  },[filter,getTransacrions,getTransactionByType])

  console.log(filter)

  useEffect(() => {
    if (location.state?.refetch) {
      transactionRefetch();
    }
  }, [location.state, transactionRefetch]);

  const column = cardTransactionColumn(navigate);

  const tableData = filter === '' || filter === 'all' ?(cardTransactionList? cardTransactionList.card_transactions: []):(transactionListByType? transactionListByType.card_transactions:[])


  useEffect(() => {
    if (fetchCardTransactionList) {
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
  }, [fetchCardTransactionList, fetchCardTransactionError]);

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
            <CustomFilter setOptions={setFilter} option={transactionFilterOptions} selectLabel="Select Type" />
          </div>
          {/* <div className="h-12">
            <button
              className="bg-green-600 hover:border-green-500 text-white duration-500 hover:bg-green-400 hover:text-gray-800"
              onClick={() => navigate("cardTransactionlists/createcardTransaction")}
            >
              New
            </button>
          </div> */}
        </div>
      </div>
      <CustomTable column={column} tableData={tableData} isRowColor={true} />
    </div>
  );
};
export default CardTransactionList;
