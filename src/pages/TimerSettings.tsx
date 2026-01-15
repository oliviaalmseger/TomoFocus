import React, { useState } from "react";
import { useNavigate } from "react-router";
import { playSound, unlockSounds } from "../utils/sound";

type PresetType = "classic" | "last" | "custom";

interface iTimerSettings {
  focusMinutes: string;
  breakMinutes: string;
  sets: string;
}

const CLASSIC_SETTINGS: iTimerSettings = {
  focusMinutes: "25",
  breakMinutes: "5",
  sets: "4",
};

export const TimerSettings = () => {
  const navigate = useNavigate();

  const [preset, setPreset] = useState<PresetType>("classic");
  const [settings, setSettings] = useState<iTimerSettings>(CLASSIC_SETTINGS);

  const hasLastSettings = Boolean(
    localStorage.getItem("tomofocus_last_settings")
  );

  const selectPreset = (type: PresetType) => {
    setPreset(type);
    if (type === "classic") {
      setSettings(CLASSIC_SETTINGS);
    }
    if (type === "last") {
      const last = localStorage.getItem("tomofocus_last_settings");
      if (last) {
        setSettings(JSON.parse(last));
      }
    }
    //if type är custom, behåll redigerbara inputs med nuvarande värden.
  };

  const handleChange = (key: keyof iTimerSettings, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleStart = () => {
    const numericInputs = {
      focusMinutes: Number(settings.focusMinutes),
      breakMinutes: Number(settings.breakMinutes),
      sets: Number(settings.sets),
    };
    localStorage.setItem(
      "tomofocus_last_settings",
      JSON.stringify(numericInputs)
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;

    unlockSounds();
    playSound("start");

    handleStart();
    navigate("/session");
  };

  const isValid =
    Number(settings.focusMinutes) > 0 &&
    Number(settings.breakMinutes) > 0 &&
    Number(settings.sets) > 0;

  return (
    <>
      <section className="flex justify-center px-4">
        <div className="w-full max-w-[420px] flex flex-col gap-6 py-10 mb-8">
          <h1 className="text-center text-2xl font-semibold">Timer settings</h1>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => selectPreset("classic")}
              className={`flex-1 h-16 flex items-center justify-center rounded-xl border-2 ${
                preset === "classic"
                  ? "bg-sparkle hover:brightness-110 border-border font-semibold"
                  : "bg-background hover:brightness-110 border-border"
              } cursor-pointer`}
            >
              Classic Pomodoro
            </button>
            <button
              type="button"
              onClick={() => selectPreset("last")}
              disabled={!hasLastSettings}
              aria-disabled={!hasLastSettings}
              className={`flex-1 h-16 flex items-center justify-center px-1 rounded-xl border-2 ${
                preset === "last"
                  ? "bg-sparkle hover:brightness-110 border-border font-semibold"
                  : "bg-background hover:brightness-110 border-border"
              } ${!hasLastSettings ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Last settings
            </button>
            <button
              type="button"
              onClick={() => selectPreset("custom")}
              className={`flex-1 h-16 flex items-center justify-center px-1 rounded-xl border-2 ${
                preset === "custom"
                  ? "bg-sparkle hover:brightness-110 border-border font-semibold"
                  : "bg-background hover:brightness-110 border-border"
              } cursor-pointer`}
            >
              Customize timer
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label
              htmlFor="focusMinutes"
              className="flex flex-col gap-1 font-semibold"
            >
              {" "}
              Work interval (minutes)
              {preset === "custom" && Number(settings.focusMinutes) <= 0 && (
                <span className="text-sm text-gray-500">
                  Must be greater than 0
                </span>
              )}
              <input
                id="focusMinutes"
                name="focusMinutes"
                type="number"
                inputMode="numeric"
                min={1}
                value={settings.focusMinutes}
                disabled={preset !== "custom"}
                onChange={(e) => handleChange("focusMinutes", e.target.value)}
                className="border-2 border-border rounded-xl p-2"
              />
            </label>
            <label
              htmlFor="breakMinutes"
              className="flex flex-col gap-1 font-semibold"
            >
              {" "}
              Break interval (minutes)
              {preset === "custom" && Number(settings.breakMinutes) <= 0 && (
                <span className="text-sm text-gray-500">
                  Must be greater than 0
                </span>
              )}
              <input
                id="breakMinutes"
                name="breakMinutes"
                type="number"
                inputMode="numeric"
                value={settings.breakMinutes}
                disabled={preset !== "custom"}
                onChange={(e) => handleChange("breakMinutes", e.target.value)}
                className="border-2 border-border rounded-xl p-2"
              />
            </label>
            <label htmlFor="sets" className="flex flex-col gap-1 font-semibold">
              {" "}
              Number of sets
              {preset === "custom" && Number(settings.sets) <= 0 && (
                <span className="text-sm text-gray-500">
                  Must be greater than 0
                </span>
              )}
              <input
                id="sets"
                name="sets"
                type="number"
                inputMode="numeric"
                value={settings.sets}
                disabled={preset !== "custom"}
                onChange={(e) => handleChange("sets", e.target.value)}
                className="border-2 border-border rounded-xl p-2"
              />
            </label>

            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 bg-secondary hover:brightness-110 text-black border-2 border-border rounded-xl py-3 cursor-pointer"
              >
                Go back
              </button>
              <button
                type="submit"
                disabled={!isValid}
                aria-disabled={!isValid}
                className={`flex-1 bg-primary border-2 border-border rounded-xl py-3 font-semibold ${
                  isValid
                    ? "bg-primary hover:brightness-110 border-border cursor-pointer"
                    : "bg-gray-400 border-gray-500 cursor-not-allowed"
                }`}
              >
                Start timer
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
