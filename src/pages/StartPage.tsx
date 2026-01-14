import { useNavigate } from "react-router";
import tomoicon from "../assets/tomoicon.png";
import { useState } from "react";
import { PermissionModal } from "../components/PermissionModal";

export const StartPage = () => {
    const SHOW_PERMISSIONS_MODAL = true; // Ändra till false sen, alt radera. 
    const navigate = useNavigate(); 
    const [showPermissionModal, setShowPermissionModal] = useState(SHOW_PERMISSIONS_MODAL || !localStorage.getItem("tomofocus_permissions"));

    const handleStart = () => {
        navigate("/settings");
    };

    return (
        <> 
        <section className="flex justify-center px-2">
            <div className="w-full max-w-[600px]">
                <h1 className="sr-only">TomoFocus, a timer-focus app</h1>
                <div className="m-7 border-2 border-border rounded-2xl p-6 bg-background flex flex-col gap-2">
                    <p className="mt-5">TomoFocus helps you stay focused using the Pomodoro technique.</p>
                    <p>Work in short, focused sessions with regular breaks to improve concentration and reduce stress.</p>
                    <p>Choose between the classic Pomodoro setup or create your own custom time settings.</p>

                    <p className="mt-6 font-bold">Click the button below to get started</p>
                    <button
                    onClick={handleStart}
                    className="bg-primary hover:brightness-110 transition-colors border-2 border-border text-third py-3 px-6 rounded-xl">Time to Focus!</button>
                    <img src={tomoicon} alt="decorative tomato mascot" className="w-20 mx-auto mt-3"/>
                </div> 
            </div>
            {showPermissionModal && (
                <PermissionModal onClose={() => setShowPermissionModal(false)} />
            )}
        </section>
        </>
    );
};