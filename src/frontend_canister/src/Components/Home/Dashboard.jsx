import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import icp from "../../../assets/icp.png";
import { MainLogo, dashSvg, coursesSvg, settingSvg, profileSvg, certSvg, logoutSvg } from "../utils/svgData";
import Loader from "../utils/Loader";
import { logoutStart } from "../Reducers/InternetIdentityReducer";
import { Link } from 'react-router-dom'

const Dashboard = () => {
    const dispatch = useDispatch();
    const { actor } = useSelector((state) => state.actors);
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("Jeevan")
    const [message, setMessage] = useState("");

    // Function to handle login


    const handleLogout = async () => {
        setIsLoading(true);
        try {
            dispatch(logoutStart());
            setIsLoading(false);
            window.location.href =
                process.env.DFX_NETWORK === "ic" ?
                    '/' :
                    `/?canisterId=${process.env.FRONTEND_CANISTER_CANISTER_ID}`;
        } catch (error) {
            setIsLoading(false);
        }
    };


    const handleMakeCall = async () => {
        if (actor) {
            if (!name || !name.trim() || name.trim() === "") {
                alert("Enter Name");
            }
            setIsLoading(true);
            await actor.greet(name).then((greeting) => {
                setMessage(greeting);
                setName("")
                setIsLoading(false);
            });
        } else {
            alert("Actor Not Bind, do Logout & Login Again !!");
        }
    }
    const color = "black"
    return (
        <>
            <div className="grid sm:grid-cols-12">
                <div className="col-span-4 h-screen flex flex-col bg-black text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">

                    <nav className="flex items-center">
                        <div className="flex items-center space-x-2">
                            <div className="pt-[44px] pl-[51px] w-[65px] h-[65px]">
                                {MainLogo}
                            </div>
                            {/* <span className="text-xl  font-[700] font-sans"> Indonesia On Chain </span> */}

                            <div className="font-[700] font-sans w-[99px] h-[52px] pt-[50px] pl-[127px]  text-white">
                                Indonesia On Chain
                            </div>
                        </div>
                        <div className="absolute flex h-[63px] w-[299px] pt-[174px] pl-[10px] rounded-[12px] justify-center">
                            <div className="w-[40px] h-[40px]">
                                {dashSvg}
                            </div>
                            <Link to="/dash" className="font-sans block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white w-[101px] h-[25px] font-[700] ">
                                Dashboard
                            </Link>
                        </div>

                        <div className=" absolute flex h-[63px] w-[299px] pt-[254px] pl-[10px] rounded-[12px] justify-center">
                            <div className="w-[40px] h-[40px]">
                                {coursesSvg}
                            </div>
                            <Link to="/courses" className="font-sans block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white w-[101px] h-[25px] font-[700]">
                                MyCourses
                            </Link>
                        </div>

                        <div className="absolute flex h-[63px] w-[299px] pt-[334px] pl-[10px] rounded-[12px] justify-center">
                            {certSvg}
                            <Link to="/certificates" className="font-sans block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">
                                Certificates
                            </Link>
                        </div>

                        <div className="absolute flex h-[63px] w-[299px] pt-[414px] pl-[10px] rounded-[12px] justify-center">
                            {profileSvg}
                            <Link to="/profile" className="font-sans block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">
                                Profile
                            </Link>
                        </div>

                        <div className="absolute flex h-[63px] w-[299px] pt-[494px] pl-[10px] rounded-[12px] justify-center">
                            {settingSvg}
                            <Link to="/settings" className="font-sans block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">
                                Settings
                            </Link>
                        </div>
                        <button
                            className=" absolute flex  pt-[909px] pl-[85px] w-[125px] h-[40px] gap-15  hover:bg-blue-700 rounded-md shadow hover:shadow-lg font-medium text-white"
                            onClick={() => { !isLoading && handleLogout() }}>

                            {logoutSvg}
                            <div className="w-6 h-6 mr-2 flex">
                                {isLoading ? t("dashboard.loading") : t("dashboard.logout")}
                            </div>
                        </button>

                    </nav>


                </div>

            </div>
        </>
    );
};



export default Dashboard;
