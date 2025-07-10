# 📧 Resilient Email Sending Service

A fault-tolerant, feature-rich email sending simulation service built using **JavaScript (Node.js)**.  
This service is designed to mimic real-world email systems by incorporating **retry logic**, **provider fallback**, **rate limiting**, **idempotency**, **status tracking**, and **circuit breaker patterns**.

---

## ✅ Features

- ✅ **Retry Mechanism** – Retries email sends with **exponential backoff**
- ✅ **Fallback Provider** – Automatically switches to a second provider if the first fails
- ✅ **Idempotency** – Prevents duplicate email sends using a unique key
- ✅ **Rate Limiting** – Blocks excessive emails from the same user (5 emails/minute)
- ✅ **Circuit Breaker** – Prevents overloading a failing provider
- ✅ **Status Tracking** – Tracks the state of each send (success, failure, duplicate, rate-limited)
- ✅ **Logging** – Logs every significant action and result

---

## 🏗️ Project Structure

email-service/
├── index.js # Entry point
├── services/
│ └── emailService.js # Core logic for sending emails
├── providers/
│ ├── mockProviderA.js # Simulated email provider A (70% fail rate)
│ └── mockProviderB.js # Simulated email provider B (50% fail rate)
├── utils/
│ ├── retry.js # Retry with exponential backoff
│ ├── rateLimiter.js # Simple in-memory rate limiter
│ ├── circuitBreaker.js # Basic circuit breaker class
│ ├── logger.js # Console-based logger
├── tests/
│ └── emailService.test.js # Unit tests using Jest
└── README.md


## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/email-service.git
cd email-service

2. Install Dependencies
bash
Copy
Edit
npm install


3. Run the Service
bash
Copy
Edit
node index.js


4. Run Tests
bash
Copy
Edit
npm jest


🧪 Tests Included
✔️ Sends email and returns success or failed

✔️ Blocks duplicate sends (status: duplicate)

✔️ Rate-limiting is enforced (optional to test)

All tests run via Jest. See emailService.test.js.


📌 Assumptions
Mock providers are used (no real emails sent)

Memory is used for tracking (no database for idempotency, logs, or rate limits)

Designed for demo/learning purposes, not production-scale

Circuit breakers reset after 30 seconds of cooldown

🔧 Technologies Used
JavaScript (Node.js)

Jest (for testing)

uuid (for generating idempotency keys)

No heavy frameworks or external services

📚 Learning Goals
This project demonstrates how to:

Build fault-tolerant systems

Use retries and fallbacks

Implement rate limiting and idempotency

Use clean code and follow SOLID principles

🙋‍♂️ Author
Sai Kishore Veeranki
Feel free to connect or ask questions.