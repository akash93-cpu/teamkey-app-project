// js file to check if server is online
export const checkStatus = async (maxAttempts = 5) => {
    for (let time = 0; time < maxAttempts; time++) {

        try {
            const status = await fetch("http://localhost:8080/server-status", {
                method: 'GET',
                credentials: 'include',
                headers: {
                    "Authorization": "Basic " + btoa("admin:test")
                }
            });

            if (status.ok) return true;

        } catch {}

        await new Promise(r => setTimeout(r, 500));
    }

    alert("Server connection timeout!");
    return false;
};