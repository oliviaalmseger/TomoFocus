import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";

const DEV_SECONDS_MODE = true; // <-- OBS

type SessionType = "work" | "break"; 

interface iTimerSettings {
    focusMinutes: number;
    breakMinutes: number;
    sets: number;
}

export const SessionPage = () => {
    const navigate = useNavigate();

    const settings = useMemo<iTimerSettings>(() => {
        const saved = localStorage.getItem("tomofocus_last_settings");
        return saved ? JSON.parse(saved) : { focusMinutes: 25, breakMinutes: 5, sets: 4};
    }, []);

    const toSeconds = (value: number) =>
    DEV_SECONDS_MODE ? value : value * 60;

    
    const [sessionType, setSessionType] = useState<SessionType>("work");
    const [currentSet, setCurrentSet] = useState(0); 
    // const [timeLeft, setTimeLeft] = useState(settings.focusMinutes * 60);    
    const [timeLeft, setTimeLeft] = useState(toSeconds(settings.focusMinutes)); // BYT
    const [isFinished, setIsFinished] = useState(false); 
    const [timerStatus, setTimerStatus] = useState<"running" | "paused">("running");

    const handleSessionEnd = useCallback((): number => {
        if (isFinished) return timeLeft; 

        if (sessionType === "work") {
            const nextSet = currentSet + 1;

            if (nextSet === settings.sets) {
                setCurrentSet(nextSet);
                setIsFinished(true);
                navigate("/complete");
                return timeLeft;
            }
            setCurrentSet(nextSet);
            setSessionType("break");
            // return settings.breakMinutes * 60;
            return toSeconds(settings.breakMinutes); // BYT
        }

        setSessionType("work");
        // return settings.focusMinutes * 60;
        return toSeconds(settings.focusMinutes); //BYT

    }, [sessionType, currentSet, settings, navigate, isFinished, timeLeft]);

    const handleSessionEndRef = useRef<() => number>(() => 0);
    useEffect(() => {
        handleSessionEndRef.current = handleSessionEnd;
    }, [handleSessionEnd]);

    useEffect(() => {
        if (isFinished || timerStatus === "paused") return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    return handleSessionEndRef.current();
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [isFinished, timerStatus]);

    const formatTime = (seconds: number) => {
        if (DEV_SECONDS_MODE) { // Ta bort dessa 3 rader sen! 
            return `${seconds}s`;
        }
        const minutes = Math.floor(seconds/60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}: ${remainingSeconds.toString().padStart(2, "0")}`;
    };


    return (
        <> 
        <div className="flex justify-center px-4">
            <section className="w-full max-w-[420px] flex flex-col items-center text-center gap-6 py-10">

                <p className="text-sm opacity-70">
                    Set {sessionType === "work" ? currentSet + 1 : currentSet} of {settings.sets}
                </p>
                <h1 className="text-xl font-semibold">
                    {sessionType === "work" ? "Focus Session" : "Break Session"}
                </h1>

                <div className="w-56 h-56 bg-border/30 border-2 border-border rounded-2xl flex items-center justify-center">
                    <span className="text-sm opacity-60">
                        {sessionType === "work" ? "Focus Session" : "Break Session"}
                    </span>
                </div>

                <div className="text-7xl font-bold tracking-wide">
                    {formatTime(timeLeft)}
                </div>

                <div className="flex gap-4 w-full my-6">
                    <button 
                    onClick={() => setTimerStatus((prev) => (prev === "running" ? "paused" : "running"))} 
                    className="flex-1 bg-border hover:brightness-110 text-background rounded-xl py-2 flex items-center justify-center gap-2 cursor-pointer">
                        {timerStatus === "running" ? "Pause" : "Resume"}
                    </button>
                    <button onClick={() => navigate("/")} className="flex-1 border-2 border-border rounded-xl py-2 cursor-pointer">Reset/Home</button>
                </div>
            </section>
        </div>
        
        </>
    )
}