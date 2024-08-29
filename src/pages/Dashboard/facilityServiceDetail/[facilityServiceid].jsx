import { useNavigate, useParams } from "react-router-dom";
import InputField from "../../../modules/common/components/input-field";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_FACILITIES } from "../../../graphql/query/facilities-query";
import CustomDropdown from "../../../modules/common/components/custom-dropdown";
import clsx from "clsx";
import toast, { Toaster } from "react-hot-toast";
import LoadingButton from "../../../modules/common/icon/loading-icon";
import { GET_FACILITY_SERVICE_BY_ID } from "../../../graphql/query/facilities-services-query";
import { UPDATE_FACILITY_SERVICE } from "../../../graphql/mutation/facility-service-mutation";

const FacilityServiceDetail = () => {
  const { facilityServiceId } = useParams();
  const navigate = useNavigate();
  const [isEdit, setisEdit] = useState(false);
  const [facility, setFacility] = useState();
  const [facilityOptions, setFacilityOptions] = useState();
  const { data: getFacilityServicebyId, loading: fetchFacilityServicebyId } = useQuery(
    GET_FACILITY_SERVICE_BY_ID,
    {
      variables: { id: facilityServiceId },
      pollInterval:500
    }
  );

  const [facilityServiceData, setFacilityServiceData] = useState({
    id: "",
    name: "",
    price: "",
    facility_id: "",
    created_at: "",
    updated_at: "",
    facility: {
      id: "",
      name: "",
    },
  });


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

  useEffect(() => {
    if (getFacilityServicebyId) {
      setFacilityServiceData(getFacilityServicebyId.facility_services[0]);
      console.log(getFacilityServicebyId.facility_services[0])
    }
  }, [getFacilityServicebyId]);

 console.log(facilityServiceId)
  console.log(facilityServiceData)

  useEffect(() => {
    console.log(facility);
    if (facility) {
      setFacilityServiceData((prevData) => ({
        ...prevData,
        facility_id: facility,
      }));
    }
  }, [facility]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFacilityServiceData({
      ...facilityServiceData,
      [name]: value,
    });
  };

  const [updateFacilityServiceById, { loading: updateFacilityServiceLoading }] = useMutation(
    UPDATE_FACILITY_SERVICE
  );

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateFacilityServiceById({
        variables: {
          id: facilityServiceData.id,
          name: facilityServiceData.name,
          price: facilityServiceData.price,
          facility_id: facilityServiceData.facility_id,
        },
      });
      toast.success("Saved changes");
    } catch (error) {
      console.error("Failed to update facilityService:", error);
      toast.error("Failed to update facilityService.");
    }
  };

  if (fetchFacilityServicebyId) return <div></div>;

  return (
    <div className="w-full flex flex-col gap-4 pr-5 pl-5">
      <Toaster />
      <div className="w-1/2 max-h-[80vh] h-[80vh] flex flex-col justify-end border border-purple-900 rounded p-8 mt-6">
        <div className="w-full h-full overflow-auto rounded grid grid-cols-1">
          <div className="w-full h-full p-6 border bg-gray-100 rounded">
            <div className="w-full h-full flex flex-col gap-4">
              <div className="w-full h-[4rem] flex flex-row items-center p-4 justify-between rounded-t rounded-tr bg-gradient-to-r from-blue-900 to-gray-600">
                <button
                  onClick={() => navigate("/dashboard/facilityService")}
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
                        Service Name:
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
                      value={facilityServiceData.name || ""}
                      placeholder={facilityServiceData.name || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-full h-auto grid grid-cols-2">
                    <div>
                      <p className="text-left mt-2 ml-3 font-semibold">
                        Price:
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
                      name="price"
                      value={facilityServiceData.price|| ""}
                      placeholder={facilityServiceData.price || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-full h-auto grid grid-cols-2">
                    <div>
                      <p className="text-left mt-2 ml-3 font-semibold">Facility:</p>
                    </div>
                    {isEdit ? (
                      <div className="w-full mt-0 mb-16 relative">
                        <CustomDropdown
                          label=""
                          isLabel={false}
                          options={facilityOptions}
                          setOption={setFacility}
                        />
                      </div>
                    ) : (
                      <input
                        className="w-full border text-black border-transparent focus:outline-none rounded p-2"
                        type="text"
                        name="id"
                        disabled={true}
                        value={facilityServiceData.facility.name || ""}
                        placeholder={facilityServiceData.facility.name || ""}
                        onChange={handleInputChange}
                      />
                    )}
                  </div>

                  {isEdit ? (
                    <div className="w-full h-12 mt-4">
                      <button
                        type="submit"
                        className="w-full h-full flex flex-row items-center justify-center text-white bg-gradient-to-r from-blue-900 to-gray-600"
                      >
                        {updateFacilityServiceLoading ? (
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
export default FacilityServiceDetail;
