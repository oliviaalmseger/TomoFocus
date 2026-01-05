import { useNavigate } from "react-router"
import completeImage from "../assets/complete-image.png";

export const CompletePage = () => {
    const navigate = useNavigate(); 


    return (
        <> 
        <div className="flex justify-center px-4">
            <section className="w-full max-w-[420px] flex flex-col items-center text-center py-10">
                <h1 className="text-2xl font-bold mb-4">
                    Congratulations!
                </h1>
                <p>
                    You completed all your Pomodoro sets. 
                </p>
                <p>
                    Great job staying focused!
                </p>
                <p className="mt-3">
                    Ready for another round?
                </p>

                <div className="w-64 h-64 bg-background border-4 border-border rounded-2xl flex items-center justify-center my-5">
                    <img src={completeImage} alt="Celebrating tomato character" className="w-full h-full object-contain"/>
                </div>

                <button onClick={() => navigate("/")} className="my-4 bg-primary hover:brightness-110 text-third rounded-xl px-6 py-3 cursor-pointer">
                    Return to home
                </button>
            </section>
        </div>
        </>
    )
}
