const express = require('express');
const app = express();
const port = 3000;

// Dummy alert data
const alerts = [
    { lat: 12.9716, lng: 77.5946, message: 'Red Alert: Flood Warning' },
    // Add more alert locations as needed
];

app.get('/get-alerts', (req, res) => {
    const { lat, lng } = req.query;

    // Check for alerts in the given area
    const nearbyAlerts = alerts.filter(alert => {
        // Simple proximity check (you can implement more sophisticated checks)
        const distance = Math.sqrt(Math.pow(alert.lat - parseFloat(lat), 2) + Math.pow(alert.lng - parseFloat(lng), 2));
        return distance < 0.1; // Adjust the distance threshold as needed
    });

    res.json(nearbyAlerts);
});

app.listen(port, () => {
    console.log(`Alert service running on http://localhost:${port}`);
});

