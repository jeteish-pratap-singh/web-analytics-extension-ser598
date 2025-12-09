// Basic list of known tracker domains for demonstration purposes
const TRACKER_DOMAINS = [
    "google-analytics.com",
    "doubleclick.net",
    "facebook.com/tr",
    "adservice.google.com",
    "googletagmanager.com",
    "analytics.twitter.com",
    "bat.bing.com"
];

/**
 * Checks if a given URL belongs to a known tracker.
 * @param {string} url - The URL to check.
 * @returns {boolean} - True if it is a tracker, false otherwise.
 */
export function isTracker(url) {
    try {
        const urlObj = new URL(url);
        const nonNullHost = urlObj.hostname || "";

        return TRACKER_DOMAINS.some(domain => nonNullHost.includes(domain));
    } catch (e) {
        return false;
    }
}
