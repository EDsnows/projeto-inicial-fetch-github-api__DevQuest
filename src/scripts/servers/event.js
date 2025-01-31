import { baseUrl, eventsQuantity } from "../variables.js"

async function getUserEvent(userName){
    const response = await fetch(`${baseUrl}/${userName}/events?per_page=${eventsQuantity}`);
    return await response.json();
};

export { getUserEvent }