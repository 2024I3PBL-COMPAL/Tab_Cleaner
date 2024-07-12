document.getElementById('checkDuplicates').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "toggle" }, (response) => {
        document.getElementById('status').textContent = response.isActive ? "Duplicate tab closer is ON" : "Duplicate tab closer is OFF";
    });
});
