import "https://deno.land/std@0.152.0/dotenv/load.ts";

// ID of the channel to call in
let dmID = "";

// List of user IDs you want to ring
let userIDs = [""];

// Cooldown between ringing and canceling in milliseconds
let cooldown = 100;

const LINK = new URL(`https://discord.com/api/v9/channels/${dmID}/call/ring`);
const CANCEL_LINK = new URL(`https://discord.com/api/v9/channels/${dmID}/call/stop-ringing`);

const REQUEST: RequestInit = { 
    method: "POST", 
    headers: {
        "authorization": Deno.env.get("TOKEN") as string,
        "content-type": "application/json",
    }, 
    body: JSON.stringify({
        "recipients": userIDs, 
    }), 
};

export const setCooldown = (x: number) => cooldown = x;
export const setUserIDs = (x: string[]) => userIDs = x;
export const setDmID = (x: string) => dmID = x;
export const run = async () => {
    while (true) {
        await fetch(LINK, REQUEST);
        await new Promise(resolve => setTimeout(resolve, cooldown));
        await fetch(CANCEL_LINK, REQUEST);
        await new Promise(resolve => setTimeout(resolve, cooldown));
    }
}

run();
