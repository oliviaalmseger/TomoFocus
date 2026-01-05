import { useNavigate } from "react-router"
import completeImage from "../assets/complete-image.png";

export const CompletePage = () => {
    const navigate = useNavigate(); 


    return (
        <> 
        <div className="flex justify-center px-4">
            <section className="w-full max-w-[420px] flex flex-col items-center text-center gap-6 py-10">
                <h1 className="text-2xl font-bold">
                    Congratulations!
                </h1>
                <p>
                    You completed all your Pomodoro sets. Great job staying focused! Blabla..
                </p>

                <div className="w-64 h-64 bg-background border-4 border-border rounded-2xl flex items-center justify-center">
                    <img src={completeImage} alt="Break session illustration" className="w-full h-full object-contain"/>
                </div>

                <button onClick={() => navigate("/")} className="mt-4 bg-primary hover:brightness-110 text-third rounded-xl px-6 py-3 cursor-pointer">
                    Return to home
                </button>
            </section>
        </div>
        </>
    )
}
