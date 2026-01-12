const PERMISSION_KEY = "tomofocus_permissions"; 

export const showNotification = async (title: string, body: string) => {
    // if (!("Notification" in window)) return; 
    if (Notification.permission !== "granted") return; // Browser permission "guard"

    const storedPermissions = localStorage.getItem(PERMISSION_KEY);
    if (!storedPermissions) return; 

    try {
        const {notifications} = JSON.parse(storedPermissions);
        if (!notifications) return;
    } catch {
        return;
    }

    if ("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.ready;

            if (registration?.showNotification) {
                registration.showNotification(title, {body, requireInteraction: true, tag: "tomofocus-session",});
                return;
            }
        } catch {
            // swosh till fallback vid behov
        }
    }

    if ("Notification" in window) { // fallback
        new Notification(title, {body});
    }

    // const permissions = localStorage.getItem(PERMISSION_KEY);
    // if (!permissions) return; 

    // try {
    //     const { notifications } = JSON.parse(permissions);
    //     if (!notifications) return; 
    // } catch {
    //     return;
    // }

    // new Notification(title, {body});
};

// Notifikationer fungerar i Firefox men inte i Chrome ??
// console.log({
//     permission: Notification.permission,
//     permissionsFromStorage: localStorage.getItem(PERMISSION_KEY),
// });

