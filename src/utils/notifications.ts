const PERMISSION_KEY = "tomofocus_permissions"; 

export const showNotification = (title: string, body: string) => {
    if (!("Notification" in window)) return; 
    if (Notification.permission !== "granted") return; 

    const permissions = localStorage.getItem(PERMISSION_KEY);
    if (!permissions) return; 

    try {
        const { notifications } = JSON.parse(permissions);
        if (!notifications) return; 
    } catch {
        return;
    }

    new Notification(title, {body});
};

// Notifikationer fungerar i Firefox men inte i Chrome ??
// console.log({
//     permission: Notification.permission,
//     permissionsFromStorage: localStorage.getItem(PERMISSION_KEY),
// });

