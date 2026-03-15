const express = require("express");
const app = express();
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/ask", async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "No message" });

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "คุณคือ NPC ในเกม Roblox ตอบสั้นๆ ภาษาไทย" },
                    { role: "user", content: message }
                ],
                max_tokens: 150
            })
        });
        const data = await response.json();
        res.json({ reply: data.choices[0].message.content });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(process.env.PORT || 3000, () => console.log("Server running!"));
