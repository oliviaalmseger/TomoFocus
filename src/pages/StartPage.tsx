import { useNavigate } from "react-router";
import tomoicon from "../assets/tomoicon.png";

export const StartPage = () => {
    const navigate = useNavigate(); 
   
    const handleStart = () => {
        navigate("/settings");
    };

    return (
        <> 
        <div>
            <main>
                <h1 className="sr-only">TomoFocus, a timer-focus app</h1>
                <div className="m-7 border-2 border-border rounded-2xl p-6  bg-background flex flex-col gap-6">
                    <p>TomoFocus hjälper dig att arbeta fokuserat med Pomodoro-tekniken.
                    Arbeta i korta fokuserade pass med regelbundna pauser för bättre
                    koncentration och mindre stress. ELLER SOM DU STÄLLER IN
                    </p>

                    <p className="mt-3">Klicka på knappen nedan för att starta din timer</p>
                    <button
                    onClick={handleStart}
                    className="bg-red transition border-2 border-border text-secondary py-3 px-6 rounded-xl">Time to Focus!</button>
                    <img src={tomoicon} alt="decorative tomato mascot" className="w-20 mx-auto"/>

                </div> 
            </main>
        </div>
        </>
    )
}