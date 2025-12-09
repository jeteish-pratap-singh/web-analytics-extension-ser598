import { isTracker } from "./trackerList.js";

const store = {};
const startTimes = {};

function ensure(tabId) {
    if (!store[tabId]) store[tabId] = [];
}

function buildLog(d, extra = {}) {
    const { requestId, url, method, type, tabId = -1, timeStamp } = d;
    return {
        id: requestId,
        url,
        method,
        type,
        tabId,
        startTime: startTimes[requestId] || timeStamp,
        endTime: extra.endTime || timeStamp,
        durationMs:
            extra.endTime && startTimes[requestId]
                ? extra.endTime - startTimes[requestId]
                : null,
        statusCode: extra.statusCode || null,
        fromCache: extra.fromCache || false,
        ip: extra.ip || null,
        encodedDataLength: extra.encodedDataLength ?? null,
        isTracker: isTracker(url),
        error: extra.error || null
    };
}

chrome.webRequest.onBeforeRequest.addListener(
    (d) => {
        if (d.url.startsWith("chrome-extension://") || d.url.startsWith("chrome://")) return;
        startTimes[d.requestId] = d.timeStamp;
    },
    { urls: ["<all_urls>"] }
);

chrome.webRequest.onCompleted.addListener(
    (d) => {
        const log = buildLog(d, {
            endTime: d.timeStamp,
            statusCode: d.statusCode,
            fromCache: d.fromCache,
            ip: d.ip,
            encodedDataLength: d.encodedDataLength
        });

        if (d.tabId >= 0) {
            ensure(d.tabId);
            store[d.tabId].push(log);
        }

        delete startTimes[d.requestId];
    },
    { urls: ["<all_urls>"] }
);

chrome.webRequest.onErrorOccurred.addListener(
    (d) => {
        const log = buildLog(d, {
            endTime: d.timeStamp,
            error: d.error
        });

        if (d.tabId >= 0) {
            ensure(d.tabId);
            store[d.tabId].push(log);
        }

        delete startTimes[d.requestId];
    },
    { urls: ["<all_urls>"] }
);

chrome.tabs.onRemoved.addListener((tabId) => {
    delete store[tabId];
});

chrome.runtime.onMessage.addListener((msg, sender, respond) => {
    if (msg?.type === "GET_REQUESTS_FOR_TAB") {
        respond({ requests: store[msg.tabId] || [] });
    }

    if (msg?.type === "CLEAR_REQUESTS_FOR_TAB") {
        store[msg.tabId] = [];
        respond({ ok: true });
    }

    return false;
});
