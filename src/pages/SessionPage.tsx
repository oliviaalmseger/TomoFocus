import { useNavigate } from "react-router"

export const SessionPage = () => {
    const navigate = useNavigate();


    return (
        <> 
        <div className="flex justify-center min-h-screen px-4">
            <section className="w-full max-w-[420px] flex flex-col items-center text-center gap-6 py-10">
                <p className="text-sm opacity-70">Set 1 of 4</p>
                <h1 className="text-xl font-semibold">Work Session</h1>

                <div className="w-56 h-56 bg-border/30 border-2 border-border rounded-2xl flex items-center justify-center">
                    <span className="text-sm opacity-60">BILD</span>
                </div>

                <div className="text-5xl font-bold tracking-wide">12:34</div>

                <div className="flex gap-4 w-full mt-6">
                    <button className="flex-1 bg-border text-background rounded-xl py-2 flex items-center justify-center gap-2">Pause</button>
                    <button onClick={() => navigate("/start")} className="flex-1 border-2 border-border rounded-xl py-2">Reset</button>
                </div>
            </section>
        </div>
        
        </>
    )
}