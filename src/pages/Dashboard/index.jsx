import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "../../modules/common/components/sidebar";
import { FaCircleUser } from "react-icons/fa6";
import UserList from "../../modules/user-lists";
import CreateUser from "../../modules/user-lists/create-user-form";
import { useEffect,useState } from "react";
import nProgress from "nprogress";
import 'nprogress/nprogress.css';
import CustomerDetail from "./customerDetail/[customerId]";
import CardList from "../../modules/card";
import CreateCard from "../../modules/card/create-card-form";
import FacilityList from "../../modules/facilities";
import CreateFacility from "../../modules/facilities/create-facility-form";
import TerminalList from "../../modules/terminal";
import CreateTerminal from "../../modules/terminal/create-terminal-form";
import FacilityServiceList from "../../modules/facility-services";
import CreateFacilityService from "../../modules/facility-services/create-facility-service-form";
import CashinList from "../../modules/cashin-amount";
import CreateCashinAmount from "../../modules/cashin-amount/create-cashin-form";
import TerminalDetail from "./terminalDetail/[terminalId]";
import CardDetail from "./cardDetail/[cardId]";
import CashinDetail from "./cashinDetail/[cashinId]";
import FacilityDetail from "./facilityDetail/[facilityId]";
import FacilityServiceDetail from "./facilityServiceDetail/[facilityServiceid]";
import CardTransactionList from "../../modules/card-transaction";
import CardTransactionDetail from "./cardTransactionDetail/[cardTransactionId]";

const Dashboard = () => {
  const location = useLocation();

  useEffect(() => {
    const loadData = async () => {
      nProgress.configure({
           parent: '#progress-bar-container',
             showSpinner: false
           });
      nProgress.start();
      nProgress.done();
    };

    loadData();
  }, [location]);

  const startProgress = () => nProgress.start();
  const stopProgress = () => nProgress.done();

    return(
        <div className="flex h-screen w-screen">
        <Sidebar />
        <div className="flex-1 flex-col h-screen ml-[17vw] w-dashboard-main-content overflow-auto pl-5 pb-5">
          <div  className="w-full h-24 border-b border-gray-500 p-2 bg-gray-100 fixed z-10">
            <div className="w-full h-full flex flex-row items-center justify-between">
              <div className="h-full flex items-center justify-center text-purple-900">
                <h2 className="text-3xl font-bold">Dashboard</h2>
              </div>
              <div className="h-full flex flex-row items-center">
                <div></div>
                <div className="w-14 h-14 rounded-full border border-purple-900 flex items-center justify-center">
                  <FaCircleUser color="purple" size={20} />
                </div>
              </div>
            </div>
          </div>
          <div id="progress-bar-container" className="flex-1 mt-[6rem] h-[calc(100% - 6rem)] overflow-y-auto w-full bg-white relative">
            <Routes>
              <Route path="*" element={<UserList/>} />
              <Route path="card" element={<CardList/>} />
              <Route path="facility" element={<FacilityList/>} />
              <Route path="facilityservice" element={<FacilityServiceList/>} />
              <Route path="cashinamount" element={<CashinList/>} />
              <Route path="terminal" element={<TerminalList/>} />
              <Route path="cardtransaction" element={<CardTransactionList/>} />
              <Route path="customerlists/createcustomer" element={<CreateUser />} />
              <Route path="card/cardlists/createcard" element={<CreateCard />} />
              <Route path="facility/facilitylists/createfacility" element={<CreateFacility />} />
              <Route path="cashinamount/cashinlists/createcashin" element={<CreateCashinAmount />} />
              <Route path="facilityservice/facilityservicelists/createfacilityservice" element={<CreateFacilityService />} />
              <Route path="terminal/terminallists/createterminal" element={<CreateTerminal />} />
              <Route path="customerlists/customerdetail/:customerId" element={<CustomerDetail/>} />
              <Route path="terminallists/terminaldetail/:terminalId" element={<TerminalDetail/>} />
              <Route path="cashinlists/cashindetail/:cashinId" element={<CashinDetail/>} />
              <Route path="facilitylists/facilitydetail/:facilityId" element={<FacilityDetail/>} />
              <Route path="facilityservicelists/facilityservicedetail/:facilityServiceId" element={<FacilityServiceDetail/>} />
              <Route path="cardlists/carddetail/:cardId" element={<CardDetail/>} />
              <Route path="cardtransactionlists/cardtransactiondetail/:cardTransactionId" element={<CardTransactionDetail/>} />
            </Routes>
          </div>
        </div>
      </div>
    )
}

export default Dashboard;