import { useState } from "react";
import { useNavigate } from "react-router";

// type PresetType = "classic" | "last" | "custom";

interface iTimerSettings {
    focusMinutes: string;
    breakMinutes: string; 
    sets: string;
}


export const TimerSettings = () => {
    const navigate = useNavigate();

    const [settings, setSettings] = useState<iTimerSettings>({
        focusMinutes: "",
        breakMinutes: "",
        sets: "",
    });

    const handleChange = (key: keyof iTimerSettings, value: string) => {
        setSettings((prev) => ({
            ...prev, [key]: value,
        }));
    };

    return (
        <> 
        <div className="flex justify-center px-4">
            <main className="w-full max-w-[420px] flex flex-col gap-6 py-10 mb-8">
                <h1 className="text-center text-2xl font-semibold">Timer settings</h1>
                
                <div className="flex gap-2">
                    <button  className="flex-1 py-2 rounded-xl border-2 cursor-pointer">
                        Classic Pomodoro</button>
                    <button className="flex-1 py-2 rounded-xl border-2 cursor-pointer">
                        Last settings</button>
                    <button  className="flex-1 py-2 rounded-xl border-2 cursor-pointer">
                        Customize timer</button>
                </div>
                
                <div className="flex flex-col gap-4">
                    <label className="flex flex-col gap-1 font-semibold"> Work interval (minutes)
                        <input type="number" value={settings.focusMinutes}  onChange={(e) => handleChange("focusMinutes", e.target.value)} className="border-2 border-border rounded-xl p-2"/>
                        
                    </label>
                    <label className="flex flex-col gap-1 font-semibold"> Break interval (minutes)
                        <input type="number" value={settings.breakMinutes} onChange={(e) => handleChange("breakMinutes", e.target.value)} className="border-2 border-border rounded-xl p-2"/>
                        
                    </label>
                    <label className="flex flex-col gap-1 font-semibold"> Number of sets
                        <input type="number" value={settings.sets} onChange={(e) => handleChange("sets", e.target.value)} className="border-2 border-border rounded-xl p-2"/>
                    </label>
                </div>

                <div className="flex gap-3 mt-4">
                    <button onClick={() => navigate("/")} className="flex-1 bg-secondary hover:brightness-110 border-2 border-border rounded-xl py-3 cursor-pointer">Go back</button>
                    <button className="flex-1 bg-primary hover:brightness-110 border-2 border-border rounded-xl py-3 font-semibold cursor-pointer">Start timer</button>
                </div>
            </main>
        </div>
        </>
    )
}