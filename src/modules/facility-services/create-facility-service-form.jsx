import { useNavigate } from "react-router-dom";
import InputField from "../common/components/input-field";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import LoadingButton from "../common/icon/loading-icon";
import toast, { Toaster } from "react-hot-toast";
import CustomDropdown from "../common/components/custom-dropdown";
import { GET_FACILITIES } from "../../graphql/query/facilities-query";
import { CREATE_FACILITY_SERVICE } from "../../graphql/mutation/facility-service-mutation";

const CreateFacilityService = () => {
  const navigate = useNavigate();
  const [facility, setFacility] = useState();
  const [facilityOptions, setFacilityOptions] = useState();
  const {
    register: facilityServiceRegister,
    handleSubmit: createFacilityServiceSubmit,
    reset,
  } = useForm();
  const [createFacilityService, { loading: createFacilityServiceLoading }] =
    useMutation(CREATE_FACILITY_SERVICE);

  const {
    data: getFacility,
    loading: fetchFacility,
    error: fetchFacilityError,
  } = useQuery(GET_FACILITIES, {
    pollInterval: 500,
  });

  useEffect(() => {
    if (getFacility && getFacility.facilities) {
      setFacilityOptions(getFacility.facilities);
    }
  }, [getFacility]);

  const handleCreateFacility = createFacilityServiceSubmit(
    async (credentials) => {
      if (!facility || facility.length < 0) {
        toast.error("Please choose facility");
      } else {
        try {
          await createFacilityService({
            variables: {
              name: credentials.name,
              price: credentials.price,
              facility_id: facility,
            },
          });
          toast.success("Service created successfully");
          reset();
        } catch (err) {
          toast.error("Error creating facilityService");
          console.error("Error creating facilityService:", err);
        }
      }
    }
  );

  return (
    <div className=" mt-8 w-full h-full relative p-5 flex flex-col items-center justify-center overflow-y-auto">
      <Toaster />
      <div className="min-w-[40rem] border border-gray-500 p-8 flex flex-col gap-12 rounded">
        <div>
          <h3 className="text-left text-2xl text-purple-900 font-semibold">
            Create Facility Service
          </h3>
        </div>
        <div className="w-full">
          <form
            onSubmit={handleCreateFacility}
            className="w-full flex flex-col gap-6"
            action=""
          >
            <div className="w-full h-full grid grid-cols-2 gap-4">
              <div className="flex flex-col items-start gap-2 pb-4">
                <InputField
                  label="Service Name"
                  name="name"
                  placeholder="Enter service"
                  inputType="text"
                  fullSize={false}
                  require={facilityServiceRegister}
                />
                <InputField
                  label="Price"
                  name="price"
                  placeholder="Enter price"
                  inputType="number"
                  require={facilityServiceRegister}
                />
              </div>
              <div className="flex flex-col items-start gap-2 pb-4">
                <div className="w-3/4 mt-2 relative">
                  <CustomDropdown
                    label="Select Facility"
                    options={facilityOptions}
                    setOption={setFacility}
                  />
                </div>
              </div>
            </div>
            <div className="h-12 w-full flex flow-row gap-4 items-center justify-start">
              <button
                type="submit"
                className="bg-gray-200 flex flex-row items-center justify-center transition min-w-24 duration-500 border-purple-900 text-white from-blue-900 to-gray-600 rounded font-light bg-gradient-to-l"
              >
                {createFacilityServiceLoading ? (
                  <LoadingButton size={20} />
                ) : (
                  "Create"
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard/facilityService",{ state: { refetch: true } })}
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
export default CreateFacilityService;
