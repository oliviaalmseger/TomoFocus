import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { playSound } from "../utils/sound";
import { showNotification } from "../utils/notifications";


type SessionType = "work" | "break";

interface iTimerSettings {
  focusMinutes: number;
  breakMinutes: number;
  sets: number;
}

export const useTimer = () => {

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


  return {
    settings,
    sessionType,
    currentSet,
    timeLeft,
    timerStatus,
    sessionDuration,
    endTimeRef,
    setTimerStatus,
    releaseWakeLock,
    isFinished
  };
};
