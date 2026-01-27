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
import bgcard from "../assets/bg-card.png";

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
    return saved
      ? JSON.parse(saved)
      : { focusMinutes: 25, breakMinutes: 5, sets: 4 };
  }, []);

  const [sessionType, setSessionType] = useState<SessionType>("work");
  const [currentSet, setCurrentSet] = useState(0);
  const [timeLeft, setTimeLeft] = useState(settings.focusMinutes * 60);
  const [isFinished, setIsFinished] = useState(false);
  const [timerStatus, setTimerStatus] = useState<"running" | "paused">(
    "running"
  );
  const [sessionDuration, setSessionDuration] = useState(
    settings.focusMinutes * 60
  );

  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const endTimeRef = useRef<number | null>(null);

  useEffect(() => {
    endTimeRef.current = Date.now() + settings.focusMinutes * 60 * 1000;
  }, [settings.focusMinutes]);

  const requestWakeLock = async () => {
    try {
      if ("wakeLock" in navigator && !wakeLockRef.current) {
        wakeLockRef.current = await navigator.wakeLock.request("screen");
      }
    } catch {
      // Wake lock request failed
    }
  };
  const releaseWakeLock = async () => {
    try {
      if (wakeLockRef.current) {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
      }
    } catch {
      //Wake lock release failed
    }
  };

  useEffect(() => {
    if (timerStatus === "running" && !isFinished) {
      requestWakeLock();
    } else {
      releaseWakeLock();
    }
    return () => {
      releaseWakeLock();
    };
  }, [timerStatus, isFinished]);

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
      showNotification(
        "Break time ☕",
        "Great job staying focused! Time for a short break."
      );
      // return settings.breakMinutes * 60;
      const nextDuration = settings.breakMinutes * 60;
      endTimeRef.current = Date.now() + nextDuration * 1000;
      return nextDuration;
    }

    setSessionType("work");
    playSound("work");
    showNotification(
      "Back to focus 🍅",
      "Break is over. Let's go back to work!"
    );
    // setSessionDuration(settings.focusMinutes * 60);
    // return settings.focusMinutes * 60;
    const nextDuration = settings.focusMinutes * 60;
    setSessionDuration(nextDuration);
    endTimeRef.current = Date.now() + nextDuration * 1000;
    return nextDuration;
  }, [sessionType, currentSet, settings, isFinished, timeLeft]);

  const handleSessionEndRef = useRef<() => number>(() => 0);
  useEffect(() => {
    handleSessionEndRef.current = handleSessionEnd;
  }, [handleSessionEnd]);

  useEffect(() => {
    if (isFinished || timerStatus === "paused") return;

    const interval = setInterval(() => {
      if (!endTimeRef.current) return;

      const remaining = Math.max(
        0,
        Math.round((endTimeRef.current - Date.now()) / 1000)
      );
      setTimeLeft(remaining);
      if (remaining <= 0) {
        handleSessionEndRef.current();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isFinished, timerStatus]);

  useEffect(() => {
    if (isFinished) {
      navigate("/complete");
    }
  }, [isFinished, navigate]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}: ${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const progress = sessionType === "work" ? 1 - timeLeft / sessionDuration : 0; //Start 0 - Slut 1
  const getFocusImage = () => {
    if (progress < 0.15) return focus0;
    if (progress < 0.3) return focus15;
    if (progress < 0.45) return focus30;
    if (progress < 0.6) return focus45;
    if (progress < 0.75) return focus60;
    return focus75;
  };

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

          <div className="relative w-full mt-5 max-w-[420px] aspect-[1/1] flex items-center justify-center">
            <img
              src={bgcard}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-contain"
            />

            <div
              className={`relative z-10 flex flex-col items-center justify-center transition-all duration-300 ease-out
              ${sessionType === "break" ? "gap-6 translate-y-2" : "gap-2"}
              pl-4 pr-7 py-6`}
            >
              {/* Fokus / Break-bild */}
              {sessionType === "work" ? (
                <img
                  src={getFocusImage()}
                  alt="Focus progress illustration"
                  width={240}
                  height={240}
                  className="w-full max-w-[200px] min-[350px]:max-w-[240px] max-h-[180px] min-[380px]:max-h-[230px] object-contain"
                />
              ) : (
                <img
                  src={breakImage}
                  alt="Break session illustration"
                  width={192}
                  height={192}
                  className="w-40 h-40  min-[350px]:w-44 min-[350px]:h-44 min-[380px]:w-48 min-[380px]:h-48 object-contain"
                />
              )}

              {/* Timer-text */}
              <span className=" text-3xl min-[320px]:text-5xl min-[366px]:text-5xl min-[380px]:text-[3.37rem] min-[430px]:text-[4.37rem] font-bold text-third mb-8">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

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
