import { useNavigate } from "react-router";

// type PresetType = "classic" | "last" | "custom";

export const TimerSettings = () => {
    const navigate = useNavigate();


    return (
        <> 
        <div className="flex justify-center px-4">
            <main className="w-full max-w-[420px] flex flex-col gap-6 py-10 mb-8">
                <h1 className="text-center text-2xl font-semibold">Timer settings</h1>
                <div className="flex gap-2">
                    <button>Classic Pomodoro</button>
                    <button>Last settings</button>
                    <button>Customize timer</button>
                </div>
                <div className="flex flex-col gap-4">
                    <label className="flex flex-col gap-1"> Work interval (minutes)
                        <input className="border-2 border-border rounded-xl p-2"/>
                    </label>
                    <label className="flex flex-col gap-1"> Break interval (minutes)
                        <input className="border-2 border-border rounded-xl p-2"/>
                    </label>
                    <label className="flex flex-col gap-1"> Number of sets
                        <input className="border-2 border-border rounded-xl p-2"/>
                    </label>
                </div>

                <div className="flex gap-3 mt-4">
                    <button onClick={() => navigate("/start")} className="flex-1 border-2 border-border rounded-xl py-2">Go back</button>
                    <button className="flex-1 bg-yellow-300 border-2 border-border rounded-xl py-2 font-semibold">Start timer</button>
                </div>

            </main>
        </div>
        </>
    )
}