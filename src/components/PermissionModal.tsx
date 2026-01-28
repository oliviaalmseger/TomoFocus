interface iPermissionModalProps {
  onClose: () => void;
}


export const PermissionModal = ({ onClose }: iPermissionModalProps) => {
  const handleAllow = async () => {
    let permission: NotificationPermission = "denied";
    if ("Notification" in window) { // Request notification permission
      permission = await Notification.requestPermission();
    }

    const audio = new Audio(); // Initialize audio to unlock playback
    audio.muted = true;
    audio.play().catch(() => {});
    audio.muted = false;

    localStorage.setItem( // Save user permission choices in LocalStorage
      "tomofocus_permissions",
      JSON.stringify({
        audio: true,
        notifications: permission === "granted",
      })
    );
    onClose();
  };

  const handleDecline = () => {
    localStorage.setItem(
      "tomofocus_permissions",
      JSON.stringify({
        audio: false,
        notifications: false,
      })
    );
    onClose();
  };

  
  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="permission-dialog-title"
        aria-describedby="permission-dialog-description"
        className="fixed inset-0 bg-white/80 flex items-center justify-center z-50"
      >
        <div className="bg-background border-4 border-border rounded-2xl pt-8 pb-12 px-5 w-[90%] max-w-sm text-center flex flex-col gap-4">
          <h2 id="permission-dialog-title" className="text-lg font-bold mb-4">
            Allow sounds & notifications
          </h2>
          <p id="permission-dialog-description" className="font-semibold mb-4">
            TomoFocus uses gentle sounds and notifications to guide you between
            focus and break sessions.
          </p>
          <section>
            <p className="text-left italic text-border">
              <span className="font-semibold">Note: </span>Notification support
              may vary depending on browser and device.
            </p>
            <p className="text-left italic text-border">
              • Make sure notifications are enabled in your browser and system
              settings.
            </p>
            <p className="text-left italic text-border">
              • For best results on iPhone, add the app to your home screen and
              keep it open during sessions.
            </p>
          </section>
          <button
            onClick={handleAllow}
            className="bg-primary hover:brightness-110 transition-colors mt-4 py-3 rounded-2xl text-third hover:font-semibold focus-ring"
          >
            Allow
          </button>
          <button
            onClick={handleDecline}
            className="underline hover:font-semibold focus-ring"
          >
            Decline
          </button>
        </div>
      </div>
    </>
  );
};
