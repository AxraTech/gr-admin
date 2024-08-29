import { useNavigate } from "react-router-dom";
import InputField from "../common/components/input-field";
import { useMutation } from "@apollo/client";
import { CREATE_CARD } from "../../graphql/mutation/card-mutation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import LoadingButton from "../common/icon/loading-icon";
import toast, { Toaster } from "react-hot-toast";
import bcrypt from 'bcryptjs';

const CreateCard = () => {
  const navigate = useNavigate();
  const {
    register: cardRegister,
    handleSubmit: createCardSubmit,
    reset,
  } = useForm();
  const [createCard, { loading: createCardLoading }] =
    useMutation(CREATE_CARD);

  const handleCreateCard = createCardSubmit(async (credentials) => {
    if (credentials.card_password !== credentials.confirm_password) {
      toast.error("Please confirm password");
    } 
    else if(credentials.card_number.length>8){
      toast.error("Invalid Card")
    }
    else {
      try {
        const hashedPassword = await bcrypt.hash(credentials.card_password, 10);
        await createCard({
          variables: {
            card_number: credentials.card_number,
            card_password: hashedPassword,
            balance: parseInt(credentials.balance),
          },
        });
        toast.success("Card created successfully");
        reset();
      } catch (err) {
        toast.error("Error creating card");
        console.error("Error creating card:", err);
      }
    }
  });

  return (
    <div className=" mt-8 w-full h-full relative p-5 flex flex-col items-center justify-center overflow-y-auto">
      <Toaster />
      <div className="min-w-[40rem] border border-gray-500 p-8 flex flex-col gap-12 rounded">
        <div>
          <h3 className="text-left text-2xl text-purple-900 font-semibold">
            Create Card
          </h3>
        </div>
        <div className="w-full">
          <form
            onSubmit={handleCreateCard}
            className="w-full flex flex-col gap-6"
            action=""
          >
            <div className="w-full h-full grid grid-cols-2 gap-4">
              <div className="flex flex-col items-start gap-2 pb-4">
                <InputField
                  label="CardNumber"
                  name="card_number"
                  placeholder="Enter CardNumber"
                  inputType="number"
                  fullSize={false}
                  require={cardRegister}
                />
                <InputField
                  label="Balance"
                  name="balance"
                  placeholder="Enter balance"
                  inputType="number"
                  require={cardRegister}
                />
              </div>
              <div className="flex flex-col items-start gap-2 pb-4">
                <InputField
                  label="Password"
                  name="card_password"
                  placeholder="Enter password"
                  inputType="password"
                  require={cardRegister}
                />
                <InputField
                  label="Confirm password"
                  name="confirm_password"
                  placeholder="Confirm password"
                  inputType="password"
                  fullSize={false}
                  require={cardRegister}
                />
              </div>
            </div>
            <div className="h-12 w-full flex flow-row gap-4 items-center justify-start">
              <button
                type="submit"
                className="bg-gray-200 flex flex-row items-center justify-center transition min-w-24 duration-500 border-purple-900 text-white from-blue-900 to-gray-600 rounded font-light bg-gradient-to-l"
              >
                {createCardLoading ? <LoadingButton size={20} /> : "Create"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard/card",{ state: { refetch: true } })}
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
export default CreateCard;
