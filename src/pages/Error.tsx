import { useNavigate } from "react-router";
import tomoError from "../assets/error.png"; 


export const Error = () => {
  const navigate = useNavigate();

  
  return (
    <section className="flex justify-center px-4">
      <div className="w-full max-w-[420px] flex flex-col items-center gap-6 py-16 text-center">
        
        <img
          src={tomoError}
          alt="Confused tomato mascot"
          className="w-40 opacity-90"
        />

        <h1 className="text-xl font-semibold">
          Oops, something went wrong!
        </h1>

        <p className="text-sm text-third">
          The tomato is as confused as you are.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-primary font-semibold rounded-xl px-6 py-3 hover:brightness-110 focus-ring"
        >
          Go back home
        </button>
      </div>
    </section>
  );
};
