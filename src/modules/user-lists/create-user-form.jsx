import { useNavigate } from "react-router-dom";
import InputField from "../common/components/input-field";
import { useMutation } from "@apollo/client";
import { CREATE_CUSTOMER } from "../../graphql/mutation/customer-mutation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import LoadingButton from "../common/icon/loading-icon";
import toast, { Toaster } from "react-hot-toast";

const CreateUser = () => {
  const navigate = useNavigate();
  const [uniquePassword, setUniquePassword] = useState();
  const { register: customerRegister, handleSubmit: createCustomerSubmit,reset } =
    useForm();
  const [createCustomer, { loading: createCustomerLoading }] =
    useMutation(CREATE_CUSTOMER);

    const handleCreateUser = createCustomerSubmit(async (credentials) => {
      if (credentials.password !== credentials.confirm_password) {
        toast.error("Please confirm password");
      }
      else if(credentials.card_id.length>8){
        toast.error("Invalid Card")
      }
      else {
        try {
           await createCustomer({
            variables: {
              name: credentials.name,
              phone: credentials.phone,
              email: credentials.email,
              card_id: credentials.card_id,
              disabled: false,
              unique_password: uniquePassword,
            },
          });
          toast.success("Customer created successfully");
        } catch (err) {
          toast.error("Error creating customer");
          console.error("Error creating customer:", err); // Log the error for debugging
        }
      }
    });

  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    email: "",
    unique_password: "",
    password: "",
    confirm_password: "",
    card_id: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className=" mt-8 w-full h-full relative p-5 flex flex-col items-center justify-center overflow-y-auto">
      <Toaster/>
      <div className="min-w-[40rem] border border-gray-500 p-8 flex flex-col gap-12 rounded">
        <div>
          <h3 className="text-left text-2xl text-purple-900 font-semibold">
            Onboard User
          </h3>
        </div>
        <div className="w-full">
          <form
            onSubmit={handleCreateUser}
            className="w-full flex flex-col gap-6"
            action=""
          >
            <div className="w-full h-full grid grid-cols-3 gap-4">
              <div className="flex flex-col items-start gap-2 pb-4">
                <InputField
                  label="Username"
                  name="name"
                  placeholder="Enter Username"
                  inputType="text"
                  fullSize={false}
                  require={customerRegister}
                  // value={formValues.name}
                  // onChange={handleInputChange}
                />
                <InputField
                  label="Phone"
                  name="phone"
                  placeholder="Enter phone number"
                  inputType="text"
                  require={customerRegister}
                  // value={formValues.phone}
                  // onChange={handleInputChange}
                />
                <InputField
                  label="Email"
                  name="email"
                  placeholder="Enter email"
                  inputType="email"
                  require={customerRegister}
                  // value={formValues.email}
                  // onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col items-start gap-2 pb-4">
                <InputField
                  label="Unique Password"
                  name="unique_password"
                  placeholder="Unique password"
                  inputType="password"
                  autoGenerate={true}
                  fullSize={false}
                  require={customerRegister}
                  value={formValues.unique_password}
                  onChange={handleInputChange}
                  setUniquePassword={setUniquePassword}
                />
                <InputField
                  label="Password"
                  name="password"
                  placeholder="Enter password"
                  inputType="password"
                  require={customerRegister}
                  // value={formValues.password}
                  // onChange={handleInputChange}
                />
                <InputField
                  label="Confirm password"
                  name="confirm_password"
                  placeholder="Confirm password"
                  inputType="password"
                  fullSize={false}
                  require={customerRegister}
                  //  value={formValues.confirm_password}
                  // onChange={handleInputChange}
                />
              </div>
              <div className="w-full flex flex-col items-center">
                <div className="w-[20vw] h-[20vh] border border-gray-700 mt-5 rounded-md"></div>
                <InputField
                  label=""
                  name="card_id"
                  placeholder="001001"
                  inputType="number"
                  fullSize={true}
                  isLabel={false}
                  require={customerRegister}
                  // value={formValues.card_id}
                  // onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="h-12 w-full flex flow-row gap-4 items-center justify-start">
              <button
                type="submit"
                className="bg-gray-200 flex flex-row items-center justify-center transition min-w-24 duration-500 border-purple-900 text-white from-blue-900 to-gray-600 rounded font-light bg-gradient-to-l"
              >
                {createCustomerLoading?(<LoadingButton size={20}/>):"Create"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard",{ state: { refetch: true } })}
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
export default CreateUser;
