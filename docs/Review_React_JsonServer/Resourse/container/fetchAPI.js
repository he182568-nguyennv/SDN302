// small wrapper around fetch for json-server endpoints
const timeout = (ms) => new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms));

export const fetchData = async (endpoint) => {
  const url = `http://localhost:3000/${endpoint}`;
  try {
    const res = await Promise.race([fetch(url), timeout(5000)]);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch (err) {
    // rethrow to let caller decide; keep message consistent
    throw new Error(`fetchData(${endpoint}) failed: ${err.message}`);
  }
};