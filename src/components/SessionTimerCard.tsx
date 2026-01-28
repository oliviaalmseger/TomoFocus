import focus0 from "../assets/focus-0.png";
import focus15 from "../assets/focus-15.png";
import focus30 from "../assets/focus-30.png";
import focus45 from "../assets/focus-45.png";
import focus60 from "../assets/focus-60.png";
import focus75 from "../assets/focus-75.png";
import breakImage from "../assets/break-image.png";
import bgcard from "../assets/bg-card.png";


type SessionType = "work" | "break";

interface Props {
  sessionType: SessionType;
  timeLeft: number;
  progress: number;
}


export const SessionTimerCard = ({
  sessionType,
  timeLeft,
  progress,
}: Props) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}: ${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

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

          <span className=" text-3xl min-[320px]:text-5xl min-[366px]:text-5xl min-[380px]:text-[3.37rem] min-[430px]:text-[4.37rem] font-bold text-third mb-8">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>
    </>
  );
};
