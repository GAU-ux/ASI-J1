const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = 3000;

// Replace with your GPT-3 API credentials
const apiKey = "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";
const apiUrl = "https://api.openai.com/v1/engines/davinci-codex/completions";

app.use(express.json());

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    // Send the user message to GPT-3
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: userMessage,
            max_tokens: 50 // Adjust the token limit as needed
        })
    });

    if (response.ok) {
        const data = await response.json();
        const botResponse = data.choices[0].text;

        res.json({ message: botResponse });
    } else {
        console.error("Error from GPT-3 API:", response.statusText);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
