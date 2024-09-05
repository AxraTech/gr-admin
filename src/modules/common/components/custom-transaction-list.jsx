import { useQuery } from "@apollo/client";
import { GET_CARDS_TRANSACTION_SEVENDAYS } from "../../../graphql/query/card-transaction-query";
import clsx from "clsx";

const CustomTransctionList = () => {
  

  const { data: weeklyTransaction, loading: weeklyTransactionLoading } =
    useQuery(GET_CARDS_TRANSACTION_SEVENDAYS);
  const weeklyTransactionLists = weeklyTransaction
    ? weeklyTransaction.card_transactions
    : [];
  if (weeklyTransactionLoading) return <div className="w-full h-full flex items-center justify-center">Loading...</div>;
  return (
    <>
      {weeklyTransactionLists.length > 0 ? (
        weeklyTransactionLists.map((transaction) => {
            const colors = ["red", "blue", "green"];
          const randomColor =colors[ Math.floor(Math.random() * colors.length)];
          return (
            <div
              key={transaction.id}
              className="w-full h-[5rem] bg-white border mt-2 border-gray-500 p-3 rounded grid grid-cols-3"
            >
              <div className="w-full h-full flex flex-row gap-2">
                <div
                  className={clsx("h-full w-2/5 border border-gray-400 rounded-lg",{
                    "bg-blue-400": randomColor === 'blue',
                    "bg-red-400": randomColor === 'red',
                    "bg-green-400": randomColor === 'green'
                  })}
                ></div>
                <div className="flex flex-col">
                  <h2 className="font-bold">Card No</h2>
                  <p className="font-light">{transaction.card.card_number}</p>
                </div>
              </div>
              <div className="w-full h-full flex items-center justify-center">
                <p>{transaction.amount.toLocaleString()} KS</p>
              </div>
              <div className={clsx("w-full h-full flex items-center justify-center font-semibold",{
                "text-red-700":transaction.card_transaction_type === "purchase",
                "text-green-500":transaction.card_transaction_type === "cash in"
              })}>
                <p>{transaction.card_transaction_type}</p>
              </div>
            </div>
          );
        })
      ) : (
        <div>No transactions found.</div>
      )}
    </>
  );
};

export default CustomTransctionList;
