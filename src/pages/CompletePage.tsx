import { useNavigate } from "react-router";
import completeImage from "../assets/complete-image.png";
import { Confetti } from "../components/Confetti";
import { Play, Home } from "lucide-react";
import { useEffect, useState } from "react";

export const CompletePage = () => {
  const navigate = useNavigate();
  const [quote, setQuote] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("/api/quotes/random");
        const data = await response.json();
        setQuote(data.text);
      } catch {
        setQuote(null); //Eller vill jag visa en fast fallbacktext?
      }
    };
    fetchQuote();
  }, []);

  return (
    <>
      <Confetti />
      <div className="flex justify-center px-4">
        <section className="w-full max-w-[420px] flex flex-col items-center text-center py-10">
          <h1 className="text-2xl font-bold mb-4">Congratulations!</h1>
          <p>You completed all your Pomodoro sets.</p>
          <p>Great job staying focused!</p>

          <div className="w-64 h-64 bg-background flex items-center justify-center my-5">
            <img
              src={completeImage}
              alt="Celebrating tomato character"
              className="w-full h-full object-contain"
            />
          </div>

          { quote && (
            <p className="my-2 text-sm font-style: italic text-border">
            "{quote}"
          </p>
          )}

          <div className="flex flex-col items-center gap-4 w-full my-6">
            <p className="mt-3 font-semibold">Ready for another round?</p>
            <div className="flex gap-4 w-full">
              <button
                onClick={() => navigate("/settings")}
                className="flex-1 flex items-center justify-center my-2 bg-primary hover:brightness-110 text-third rounded-xl px-6 py-3 font-semibold cursor-pointer focus-ring"
              >
                <Play className="w-4 h-4 mr-3 opacity-70" aria-hidden="true" />
                <span>Yes, let's go!</span>
              </button>

              <button
                onClick={() => navigate("/")}
                className="flex-1 flex items-center justify-center my-2 border-2 border-yellow-700/75 hover:brightness-110 text-third hover:font-semibold rounded-xl px-6 py-3 cursor-pointer focus-ring"
              >
                <Home className="w-4 h-4 mr-3 opacity-70" aria-hidden="true" />
                <span>Go to home</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
