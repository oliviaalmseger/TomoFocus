import { useNavigate } from "react-router";
import completeImage from "../assets/complete-image.png";
import { Confetti } from "../components/Confetti";

export const CompletePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Confetti />
      <div className="flex justify-center px-4">
        <section className="w-full max-w-[420px] flex flex-col items-center text-center py-10">
          <h1 className="text-2xl font-bold mb-4">Congratulations!</h1>
          <p>You completed all your Pomodoro sets.</p>
          <p>Great job staying focused!</p>
          {/* <p className="mt-3">
                    Ready for another round?
                </p> */}

          <div className="w-64 h-64 bg-background border-4 border-border rounded-2xl flex items-center justify-center my-5">
            <img
              src={completeImage}
              alt="Celebrating tomato character"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col items-center gap-4 w-full my-6">
            <p className="mt-3 font-semibold">Ready for another round?</p>
            <div className="flex gap-4 w-full">
              <button
                onClick={() => navigate("/settings")}
                className="flex-1 my-2 bg-primary hover:brightness-110 text-third rounded-xl px-6 py-3 font-semibold cursor-pointer"
              >
                Yes!
              </button>

              <button
                onClick={() => navigate("/")}
                className="flex-1 my-2 bg-primary hover:brightness-110 text-third rounded-xl px-6 py-3 cursor-pointer"
              >
                Return to home
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
