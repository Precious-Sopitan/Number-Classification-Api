

A simple API that classifies numbers based on mathematical properties and provides a fun fact about them.

 Determines if a number is prime,perfect, odd/even, or an Armstrong number.  
 Calculates the sum of digits.  
Fetches a fun fact about the number from [Numbers API](http://numbersapi.com/).  
Handles  for cross-origin requests.  
Returns JSON responses with proper HTTP status codes.  

API Endpoints  

Welcome Message
GET /  
Returns a JSON welcome message.  

Response: 
json
{
  "message": "Welcome to the Number Classification API! Use /api/classify-number?number=<your_number> to get started."
}
