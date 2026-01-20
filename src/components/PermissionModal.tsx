interface iPermissionModalProps {
    onClose: () => void; 
}

export const PermissionModal = ({onClose}: iPermissionModalProps) => {
    const handleAllow = async () => {
        let permission: NotificationPermission = "denied";
        if ("Notification" in window) { // Notifikationer
            permission = await Notification.requestPermission();
        }

        const audio = new Audio(); // Initialisera ljud
        audio.muted = true; 
        audio.play().catch(() => {});
        audio.muted = false; 

        localStorage.setItem( //Spara valen i LocalStorage
            "tomofocus_permissions",
            JSON.stringify({
                audio: true,
                notifications: permission === "granted",
            })
        );
        onClose();
    };

    const handleDecline = () => {
        localStorage.setItem("tomofocus_permissions",
            JSON.stringify({
                audio: false,
                notifications: false,
            })
        );
        onClose();
    };

    return (
        <>
        <div role="dialog" aria-modal="true" className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
            <div className="bg-background border-4 border-border rounded-2xl pt-8 pb-12 px-5 w-[90%] max-w-sm text-center flex flex-col gap-4">
                <h2 className="text-lg font-bold mb-4">
                    Allow sounds & notifications
                </h2>
                <p>TomoFocus uses gentle sounds and notifications to guide you between focus and break sessions.</p>
                <section>
                    <p className="text-left font-style: italic text-border"><span className="font-semibold">Note: </span>Notification support may vary depending on browser and device.</p>
                    <p className="text-left font-style: italic text-border">For best results on iPhone, add the app to your home screen.</p>
                </section>
                <button onClick={handleAllow} className="bg-sparkle hover:brightness-110 transition-colors mt-4 py-3 rounded-2xl text-third hover:font-semibold focus-ring">Allow</button>
                <button onClick={handleDecline} className="underline hover:font-semibold focus-ring">Decline</button>
            </div>
        </div>
        </>
    );
};
