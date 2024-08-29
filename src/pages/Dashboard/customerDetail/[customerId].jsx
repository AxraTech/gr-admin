import { useNavigate, useParams } from "react-router-dom";
import InputField from "../../../modules/common/components/input-field";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CUSTOMERS_BY_ID } from "../../../graphql/query/customer-query";
import { useEffect, useState } from "react";
import CustomDropdown from "../../../modules/common/components/custom-dropdown";
import clsx from "clsx";
import toast, { Toaster } from "react-hot-toast";
import LoadingButton from "../../../modules/common/icon/loading-icon";
import { UPDATE_CUSTOMER_BY_ID } from "../../../graphql/mutation/customer-mutation";

const CustomerDetail = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [isEdit, setisEdit] = useState(false);
  const { data: getCustomerbyId, loading: fetchCustomerbyId } = useQuery(
    GET_CUSTOMERS_BY_ID,
    {
      variables: { id: customerId },
    }
  );

  const [customerData, setCustomerData] = useState({
      id:"",
      name:"",
      phone:"",
      email:"",
      card_id:"",
      created_at:"",
      updated_at:"",
      disabled:"",
      unique_password:"",
  });

  useEffect(() => {
    if (getCustomerbyId) {
      setCustomerData(getCustomerbyId.customers[0]);
    }
  }, [getCustomerbyId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  const handleRadioChange = (status) => {
    setCustomerData((prevData) => ({
      ...prevData,
      disabled: status,
    }));
  };

  const [updateCustomerById, { loading: updateCustomerLoading }] = useMutation(
    UPDATE_CUSTOMER_BY_ID
  );

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(customerData)
    try {
      await updateCustomerById({
        variables: {
          id: customerData.id,
          name: customerData.name,
          phone: customerData.phone,
          email: customerData.email,
          card_id:customerData.card_id,
          disabled: customerData.disabled,
        },
      });
      toast.success("Saved changes");
    } catch (error) {
      console.error("Failed to update customer:", error);
      toast.error("Failed to update customer.");
    }
  };

  if (fetchCustomerbyId) return <div></div>;

  return (
    <div className="w-full flex flex-col gap-4 pr-5 pl-5">
      <Toaster />
      <div className="w-1/2 max-h-[80vh] h-[80vh] flex flex-col justify-end border border-purple-900 rounded p-8 mt-6">
        <div className="w-full h-full overflow-auto rounded grid grid-cols-1">
          <div className="w-full h-full p-6 border bg-gray-100 rounded">
            <div className="w-full h-full flex flex-col gap-4">
              <div className="w-full h-[4rem] flex flex-row items-center p-4 justify-between rounded-t rounded-tr bg-gradient-to-r from-blue-900 to-gray-600">
                <button
                  onClick={() => navigate("/dashboard/customer")}
                  className="bg-transparent"
                >
                  <FaArrowLeft size={20} color="white" />
                </button>
                <button
                  onClick={() => setisEdit(!isEdit)}
                  className="min-h-8 border border-white bg-transparent text-white"
                >
                  {isEdit ? "Close" : "Update Info"}
                </button>
              </div>
              <div className="w-full h-full">
                <form
                  className="w-full h-full overflow-y-auto flex flex-col gap-4"
                  action=""
                  onSubmit={handleUpdate}
                >
                  <div className="w-full h-auto grid grid-cols-2">
                    <div>
                      <p className="text-left mt-2 ml-3 font-semibold">
                        Customer Name:
                      </p>
                    </div>
                    <input
                      className={clsx(
                        "w-full border text-black focus:outline-none rounded p-2",
                        {
                          "border-purple-800": isEdit,
                          "border-transparent": !isEdit,
                        }
                      )}
                      type="text"
                      disabled={!isEdit}
                      name="name"
                      value={customerData.name || ""}
                      placeholder={customerData.name || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-full h-auto grid grid-cols-2">
                    <div>
                      <p className="text-left mt-2 ml-3 font-semibold">
                        Phone Number:
                      </p>
                    </div>
                    <input
                      className={clsx(
                        "w-full border text-black focus:outline-none rounded p-2",
                        {
                          "border-purple-800": isEdit,
                          "border-transparent": !isEdit,
                        }
                      )}
                      type="text"
                      disabled={!isEdit}
                      name="phone"
                      value={customerData.phone || ""}
                      placeholder={customerData.phone || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-full h-auto grid grid-cols-2">
                    <div>
                      <p className="text-left mt-2 ml-3 font-semibold">
                        Email:
                      </p>
                    </div>
                    <input
                      className={clsx(
                        "w-full border text-black focus:outline-none rounded p-2",
                        {
                          "border-purple-800": isEdit,
                          "border-transparent": !isEdit,
                        }
                      )}
                      type="email"
                      disabled={!isEdit}
                      name="email"
                      value={customerData.email || ""}
                      placeholder={customerData.email|| ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-full h-auto grid grid-cols-2">
                    <div>
                      <p className="text-left mt-2 ml-3 font-semibold">
                        Card Number:
                      </p>
                    </div>
                    <input
                      className={clsx(
                        "w-full border text-black focus:outline-none rounded p-2",
                        {
                          "border-purple-800": isEdit,
                          "border-transparent": !isEdit,
                        }
                      )}
                      type="text"
                      disabled={!isEdit}
                      name="card_id"
                      value={customerData.card_id|| ""}
                      placeholder={customerData.card_id|| ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  {isEdit ? (
                    <div className="w-full grid grid-cols-2">
                      <div className="flex flex-row items-center gap-2">
                        <input
                          className="ml-3"
                          type="radio"
                          disabled={!isEdit}
                          name="customerStatus"
                          value="enabled"
                          checked={!customerData.disabled}
                          onChange={() => handleRadioChange(false)}
                        />
                        <p>Enabled</p>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <input
                          type="radio"
                          isabled={!isEdit}
                          name="customerStatus"
                          value="disabled"
                          checked={customerData.disabled}
                          onChange={() => handleRadioChange(true)}
                        />
                        <p>Disable</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full grid grid-cols-2">
                      <div>
                        <p className="text-left mt-2 ml-3 font-semibold">Status</p>
                      </div>
                      <div>
                        <p className="text-left mt-2 ml-[0.6rem]">
                          {customerData.disabled ? "Disabled" : "Active"}
                        </p>
                      </div>
                    </div>
                  )}

                  {isEdit ? (
                    <div className="w-full h-12 mt-4">
                      <button
                        type="submit"
                        className="w-full h-full flex flex-row items-center justify-center text-white bg-gradient-to-r from-blue-900 to-gray-600"
                      >
                        {updateCustomerLoading ? (
                          <LoadingButton size={20} />
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </form>
              </div>
            </div>
          </div>
          {/* <div></div> */}
        </div>
      </div>
    </div>
  );
};
export default CustomerDetail;
