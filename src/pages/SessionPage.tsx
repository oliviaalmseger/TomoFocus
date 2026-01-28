import { useNavigate } from "react-router";
import { Pause, Play, Home } from "lucide-react";
import { useTimer } from "../hooks/useTimer";
import { SessionTimerCard } from "../components/SessionTimerCard";
import { useEffect } from "react";


export const SessionPage = () => {
  const {settings, sessionType, currentSet, timeLeft,
    timerStatus, sessionDuration, endTimeRef, setTimerStatus, releaseWakeLock, isFinished
  } = useTimer();
  const navigate = useNavigate();

  useEffect(() => {
    if (isFinished) {
      navigate("/complete");
    }
  }, [isFinished, navigate]);

  const progress = sessionType === "work" ? 1 - timeLeft / sessionDuration : 0; //Start 0 - Slut 1

  
  return (
    <>
      <div className="flex justify-center px-4">
        <section className="w-full max-w-[420px] flex flex-col items-center text-center py-10">
          <p className="text-border text-base opacity-85">
            Set {sessionType === "work" ? currentSet + 1 : currentSet} of{" "}
            {settings.sets}
          </p>
          <h1 className="text-2xl font-semibold mt-2">
            {sessionType === "work" ? "Focus Session" : "Break Session"}
          </h1>
          <SessionTimerCard sessionType={sessionType} timeLeft={timeLeft} progress={progress} />

          <div className="flex gap-4 w-full my-6">
            <button
              onClick={() => {
                setTimerStatus((prev) => {
                  if (prev === "paused" && endTimeRef.current) {
                    endTimeRef.current = Date.now() + timeLeft * 1000;
                  }
                  return prev === "running" ? "paused" : "running";
                });
              }}
              className="flex-1 bg-primary hover:brightness-110 text-third hover:font-semibold rounded-xl py-3 flex items-center justify-center gap-2 cursor-pointer focus-ring"
            >
              {timerStatus === "running" ? (
                <>
                  <Pause className="w-4 h-4 opacity-70" aria-hidden="true" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 opacity-70" aria-hidden="true" />
                  <span>Resume</span>
                </>
              )}
            </button>
            <button
              onClick={() => {
                releaseWakeLock();
                navigate("/");
              }}
              className="flex-1 flex items-center justify-center border-2 border-yellow-700/75 hover:brightness-110 text-third hover:font-semibold rounded-xl py-3 cursor-pointer focus-ring"
            >
              <Home className="w-4 h-4 mr-3 opacity-80" aria-hidden="true" />
              <span>Reset / Home</span>
            </button>
          </div>
        </section>
      </div>
    </>
  );
};
