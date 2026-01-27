const PERMISSION_KEY = "tomofocus_permissions"; 

export const showNotification = async (title: string, body: string) => {
    if (!("serviceWorker" in navigator)) return; 
    if (Notification.permission !== "granted") return; // Browser permission "guard"

    const storedPermissions = localStorage.getItem(PERMISSION_KEY);
    if (!storedPermissions) return; 

    try {
        const {notifications} = JSON.parse(storedPermissions);
        if (!notifications) return;
    } catch {
        return;
    }

    const registration = await navigator.serviceWorker.ready;
    registration.showNotification(title, {
        body,
        icon: "/tomoicon-192.png",
        badge: "/badge.png",
        requireInteraction: true,
        tag: "tomofocus-session",
    });
};

export const showNotificationSafari = (title: string, body: string) => {
  if (!navigator.serviceWorker?.controller) return;

  navigator.serviceWorker.controller.postMessage({
    type: "SHOW_NOTIFICATION",
    payload: { title, body },
  });
};
