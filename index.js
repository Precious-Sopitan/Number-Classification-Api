const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000; // Ensure it works on Render

app.use(cors());
app.use(express.json());

// Handle number classification
app.get("/api/classify-number", async (req, res) => {
    if (!req.query.number) {
        return res.send("Welcome to the Number Classification API! Use /api/classify-number?number=YOUR_NUMBER");
    }

    const { number } = req.query;
    if (isNaN(number)) {
        return res.status(400).json({ number, error: true });
    }

    const num = parseInt(number, 10);
    const properties = [];

    properties.push(num % 2 === 0 ? "even" : "odd");

    const isPrime = num > 1 && [...Array(num).keys()].slice(2).every(i => num % i !== 0);
    if (isPrime) properties.push("prime");

    const sumDivisors = [...Array(num).keys()].slice(1).filter(i => num % i === 0).reduce((a, b) => a + b, 0);
    const isPerfect = sumDivisors === num;

    const digits = num.toString().split("");
    const armstrongSum = digits.reduce((sum, d) => sum + Math.pow(parseInt(d), digits.length), 0);
    if (armstrongSum === num) properties.push("armstrong");

    let funFact = "No fun fact available.";
    try {
        const response = await axios.get(`http://numbersapi.com/${num}?json`);
        funFact = response.data.text;
    } catch (error) {
        console.error("Error fetching fun fact:", error.message);
    }

    res.json({
        number: num,
        is_prime: isPrime,
        is_perfect: isPerfect,
        properties,
        digit_sum: digits.reduce((sum, d) => sum + parseInt(d), 0),
        fun_fact: funFact
    });
});

app.listen(PORT, () => {
    console.log(Server running on port ${PORT});
});