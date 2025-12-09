<script setup>
import { ref, onMounted } from "vue";

const tab = ref(null);
const requests = ref([]);
const loading = ref(true);

function getCurrentTab() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      resolve(tabs[0]);
    });
  });
}

async function refresh() {
  loading.value = true;
  if (!tab.value) {
    tab.value = await getCurrentTab();
  }

  chrome.runtime.sendMessage(
    { type: "GET_REQUESTS_FOR_TAB", tabId: tab.value.id },
    (response) => {
      requests.value = response?.requests || [];
      loading.value = false;
    }
  );
}

function clearForTab() {
  if (!tab.value) return;
  chrome.runtime.sendMessage(
    { type: "CLEAR_REQUESTS_FOR_TAB", tabId: tab.value.id },
    () => {
      requests.value = [];
    }
  );
}

function extractDomain(url) {
  try {
    const u = new URL(url);
    return u.hostname;
  } catch (e) {
    return url;
  }
}

function formatDuration(ms) {
  if (ms == null) return "-";
  return ms.toFixed(1);
}

function formatSize(bytes) {
  if (bytes == null) return "-";
  return (bytes / 1024).toFixed(1);
}

onMounted(async () => {
  tab.value = await getCurrentTab();
  await refresh();
  setInterval(refresh, 2000);
});
</script>

<template>
  <div class="popup">
    <h2>Browser Observability</h2>

    <div class="tab-info" v-if="tab">
      <div class="tab-title">{{ tab.title }}</div>
      <div class="tab-url">{{ tab.url }}</div>
    </div>

    <div class="controls">
      <button @click="refresh">Refresh</button>
      <button @click="clearForTab">Clear</button>
    </div>

    <div v-if="loading" class="status">Loading...</div>

    <div v-else-if="requests.length === 0" class="status">
      No requests tracked yet for this tab.
    </div>

    <table v-else class="requests-table">
      <thead>
        <tr>
          <th>Domain</th>
          <th>Method</th>
          <th>Status</th>
          <th>Latency (ms)</th>
          <th>Size (KB)</th>
          <th>Type</th>
          <th>Tracker?</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="req in requests" :key="req.id + req.startTime">
          <td class="url-cell" :title="req.url">
            {{ extractDomain(req.url) }}
          </td>
          <td>{{ req.method }}</td>
          <td>{{ req.statusCode ?? "-" }}</td>
          <td>{{ formatDuration(req.durationMs) }}</td>
          <td>{{ formatSize(req.encodedDataLength) }}</td>
          <td>{{ req.type }}</td>
          <td>
            <span v-if="req.isTracker" class="tracker-yes">Yes</span>
            <span v-else class="tracker-no">No</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.popup {
  min-width: 600px;
  max-height: 600px;
  overflow: auto;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  padding: 10px;
}

h2 {
  margin-top: 0;
  font-size: 18px;
}

.tab-info {
  margin-bottom: 8px;
  font-size: 12px;
}

.tab-title {
  font-weight: 600;
}

.tab-url {
  color: #555;
  font-size: 11px;
  word-break: break-all;
}

.controls {
  margin-bottom: 8px;
  display: flex;
  gap: 8px;
}

button {
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f6f6f6;
}

button:hover {
  background: #e9e9e9;
}

.status {
  font-size: 12px;
  color: #666;
}

.requests-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
}

.requests-table th,
.requests-table td {
  padding: 4px 6px;
  border-bottom: 1px solid #eee;
  text-align: left;
}

.url-cell {
  max-width: 180px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.tracker-yes {
  color: #b00020;
  font-weight: 600;
}

.tracker-no {
  color: #2e7d32;
}
</style>
