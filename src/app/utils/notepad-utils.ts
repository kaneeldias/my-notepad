import {isLoggedIn} from "@/app/utils/auth-utils";
import {SessionContextValue} from "next-auth/react";

const TIMEOUT = 3000;

let lastUploadTime = 0;
let requestInProgress = false;
let pendingTimeout: NodeJS.Timeout | null = null;

export async function getNotepadContent(session: SessionContextValue) {
    if (isLoggedIn(session)) {
        console.log("Fetching content");
        await fetch("/api/notepad", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(async (response) => {
            const data = await response.json();
            localStorage.setItem("content", data.content);
        });
    }
    
    return localStorage.getItem("content") || "";
}

export async function updateNotepad(session: SessionContextValue, content: string) {
    localStorage.setItem("content", content);
    if (isLoggedIn(session)) await uploadChanges(content);
}

async function uploadChanges(content: string) {
    clearQueuedRequest();
    
    if (!wasUploadedRecently() && !requestInProgress) {
        await sendSaveRequest(content);
        return;
    }
    
    queueRequest(content);
}

function wasUploadedRecently() {
    return Date.now() - lastUploadTime < TIMEOUT;
}

function clearQueuedRequest() {
    if (pendingTimeout) {
        clearTimeout(pendingTimeout);
    }
}

function queueRequest(content: string) {
    pendingTimeout = setTimeout(() => {
        sendSaveRequest(content);
    }, TIMEOUT);
}

export async function sendSaveRequest(content: string) {
    requestInProgress = true;
    await fetch("/api/notepad", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: content
        })
    }).then(() => {
        lastUploadTime = Date.now();
    }).finally(() => {
        requestInProgress = false;
    }).catch(() => {
        queueRequest(content);
    });
}