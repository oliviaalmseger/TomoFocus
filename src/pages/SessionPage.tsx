import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import focus0 from "../assets/focus-0.png";
import focus15 from "../assets/focus-15.png";
import focus30 from "../assets/focus-30.png";
import focus45 from "../assets/focus-45.png";
import focus60 from "../assets/focus-60.png";
import focus75 from "../assets/focus-75.png";
import breakImage from "../assets/break-image.png";
import { playSound } from "../utils/sound";
import { showNotification } from "../utils/notifications";
import { Pause, Play, Home } from "lucide-react";


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
    
    const [sessionType, setSessionType] = useState<SessionType>("work");
    const [currentSet, setCurrentSet] = useState(0); 
    const [timeLeft, setTimeLeft] = useState(settings.focusMinutes * 60);    
    const [isFinished, setIsFinished] = useState(false); 
    const [timerStatus, setTimerStatus] = useState<"running" | "paused">("running");
    const [sessionDuration, setSessionDuration] = useState(settings.focusMinutes * 60);

    const handleSessionEnd = useCallback((): number => {
        if (isFinished) return timeLeft; 

        if (sessionType === "work") {
            const nextSet = currentSet + 1;

            if (nextSet === settings.sets) {
                setCurrentSet(nextSet);
                setIsFinished(true);
                playSound("success");
                showNotification("Session complete 🎉", "Time to celebrate!");

                return timeLeft;
            }
            setCurrentSet(nextSet);
            setSessionType("break");
            playSound("break");
            showNotification("Break time ☕", "Great job staying focused! Time for a short break.");
            return settings.breakMinutes * 60;
        }

        setSessionType("work");
        playSound("work");
        showNotification("Back to focus 🍅", "Break is over. Let's go back to work!");
        setSessionDuration(settings.focusMinutes * 60);
        return settings.focusMinutes * 60;

    }, [sessionType, currentSet, settings, isFinished, timeLeft]);

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

    useEffect(() => {
        if (isFinished) {
            navigate("/complete");
        }
    }, [isFinished, navigate]); 

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds/60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}: ${remainingSeconds.toString().padStart(2, "0")}`;
    };

    const progress = sessionType === "work" ? 1 - timeLeft / sessionDuration : 0; //Start 0 - Slut 1
    const getFocusImage = () => {
        if (progress < 0.15) return focus0;
        if (progress < 0.3) return focus15;
        if (progress < 0.45) return focus30;
        if (progress < 0.60) return focus45;
        if (progress < 0.75) return focus60;
        return focus75;
    };


    return (
        <> 
        <div className="flex justify-center px-4">
            <section className="w-full max-w-[420px] flex flex-col items-center text-center gap-6 py-10">

                <p className="text-border text-base opacity-85">
                    Set {sessionType === "work" ? currentSet + 1 : currentSet} of {settings.sets}
                </p>
                <h1 className="text-xl font-semibold">
                    {sessionType === "work" ? "Focus Session" : "Break Session"}
                </h1>

                <div className="w-56 h-56 bg-border/30 border-2 border-border rounded-2xl overflow-hidden">
                {sessionType === "work" ? (<img src={getFocusImage()} alt="Focus progress illustration" className="w-full h-full object-contain"/>) 
                : (
                    <img src={breakImage} alt="Break session illustration" className="w-full h-full object-contain"/>
                )}
                </div>

                <div className="text-7xl font-bold tracking-wide">
                    {formatTime(timeLeft)}
                </div>

                <div className="flex gap-4 w-full my-6">
                    <button 
                    onClick={() => setTimerStatus((prev) => (prev === "running" ? "paused" : "running"))} 
                    className="flex-1 bg-primary hover:brightness-110 text-third rounded-xl py-3 flex items-center justify-center gap-2 cursor-pointer">
                        {timerStatus === "running" ? (
                            <>
                                <Pause className="w-4 h-4 opacity-70" aria-hidden="true" />
                                <span>Pause</span>
                            </> ) : (
                            <>
                                <Play className="w-4 h-4 opacity-70" aria-hidden="true" />
                                <span>Resume</span>
                            </>)}
                    </button>
                    <button onClick={() => navigate("/")} className="flex-1 flex items-center justify-center bg-sparkle hover:brightness-110 text-third border-2 border-border rounded-xl py-3 cursor-pointer">
                        <Home className="w-4 h-4 mr-3 opacity-80" aria-hidden="true" />
                        <span>Reset / Home</span>
                    </button>
                </div>
            </section>
        </div>
        </>
    );
};
