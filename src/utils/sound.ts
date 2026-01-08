import workSound from "../assets/worksound.mp3";
import breakSound from "../assets/breaksound.mp3";
import successSound from "../assets/success.mp3";
import startSound from "../assets/startsound.mp3";

const PERMISSION_KEY = "tomofocus_permissions";

const sounds = {
    work: new Audio(workSound),
    break: new Audio(breakSound),
    success: new Audio(successSound),
    start: new Audio(startSound),
};

export const playSound = (key: keyof typeof sounds) => {
    const permissions = localStorage.getItem(PERMISSION_KEY);
    if (!permissions) return; 

    try {
        const {audio} = JSON.parse(permissions);
        if (!audio) return; 
    } catch {
        return;
    }

    const sound = sounds[key];
    if (!sound) return; 

    sound.currentTime = 0;
    sound.play().catch(() => {
        console.log("Ljud kunde inte spelas, troligtvis blockerat av webbläsaren");
    });
};
