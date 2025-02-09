const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

function isPrime(num) {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    for (let i = 3; i * i <= num; i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

function sumOfDivisors(num) {
    let sum = 1;
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) {
            sum += i;
            if (i !== num / i) sum += num / i;
        }
    }
    return sum;
}

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

    if (isPrime(num)) properties.push("prime");
    const isPerfect = sumOfDivisors(num) === num;

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
        is_prime: isPrime(num),
        is_perfect: isPerfect,
        properties,
        digit_sum: digits.reduce((sum, d) => sum + parseInt(d), 0),
        fun_fact: funFact
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});