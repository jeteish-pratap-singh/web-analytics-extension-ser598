export const trackers = [
    "google-analytics.com",
    "analytics.google.com",
    "doubleclick.net",
    "googletagmanager.com",
    "facebook.com",
    "facebook.net",
    "ads.yahoo.com",
    "adservice.google.com",
    "scorecardresearch.com",
    "segment.io",
    "hotjar.com",
    "mixpanel.com"
];

export function isTracker(url) {
    try {
        const host = new URL(url).hostname;
        return trackers.some(t => host.includes(t));
    } catch {
        return false;
    }
}
