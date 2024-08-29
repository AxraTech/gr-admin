import { useNavigate } from "react-router-dom";
import InputField from "../common/components/input-field";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import LoadingButton from "../common/icon/loading-icon";
import toast, { Toaster } from "react-hot-toast";
import { CREATE_CASHIN_AMOUNT } from "../../graphql/mutation/cashin-mutation";

const CreateCashinAmount = () => {
  const navigate = useNavigate();

  const {
    register: cashinAmountRegister,
    handleSubmit: createCashinAmountSubmit,
    reset,
  } = useForm();
  const [createCashinAmount, { loading: createCashinAmountLoading }] =
    useMutation(CREATE_CASHIN_AMOUNT);

  const handleCreateCashinAmount = createCashinAmountSubmit(async (credentials) => {
    try {
      await createCashinAmount({
        variables: {
          amount: credentials.amount,
        },
      });
      toast.success("Cash In Amount created");
      reset();
    } catch (err) {
      toast.error("Error creating cashinAmount");
      console.error("Error creating cashinAmount:", err);
    }
  });

  return (
    <div className=" mt-8 w-full h-full relative p-5 flex flex-col items-center justify-center overflow-y-auto">
      <Toaster />
      <div className="min-w-[40rem] border border-gray-500 p-8 flex flex-col gap-12 rounded">
        <div>
          <h3 className="text-left text-2xl text-purple-900 font-semibold">
            Create CashinAmount
          </h3>
        </div>
        <div className="w-full">
          <form
            onSubmit={handleCreateCashinAmount}
            className="w-full flex flex-col gap-6"
            action=""
          >
            <div className="w-full h-full grid grid-cols-1 gap-4">
              <div className="flex flex-col items-start gap-2 pb-4">
                <InputField
                  label="Amount"
                  name="amount"
                  placeholder="Enter Amount"
                  inputType="number"
                  fullSize={false}
                  require={cashinAmountRegister}
                />
              </div>
            </div>
            <div className="h-12 w-full flex flow-row gap-4 items-center justify-start">
              <button
                type="submit"
                className="bg-gray-200 flex flex-row items-center justify-center transition min-w-24 duration-500 border-purple-900 text-white from-blue-900 to-gray-600 rounded font-light bg-gradient-to-l"
              >
                {createCashinAmountLoading ? <LoadingButton size={20} /> : "Create"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard/cashinAmount",{ state: { refetch: true } })}
                className=" bg-gray-200 transition min-w-24 duration-500 border-purple-900 text-white from-blue-900 to-gray-600 rounded font-light bg-gradient-to-l"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreateCashinAmount;
