# 🍔 React Food Delivery App

A full-stack food delivery web application built with the **MERN stack** (MongoDB, Express, React, Node.js). The project is organized as a monorepo with three separate apps — a customer-facing frontend, an admin dashboard, and a REST API backend.

---

## 📁 Project Structure

```
React-Food-Delivery/
├── frontend/          # Customer-facing React app (Vite)
├── admin/
│   └── vite-project/  # Admin dashboard React app (Vite)
└── backend/           # Node.js + Express REST API
```

---

## ✨ Features

### 🛒 Customer Frontend
- Browse food items by category
- Add / remove items from cart
- User registration & login (JWT authentication)
- Place orders with Stripe payment integration
- View order history & track order status

### 🛠️ Admin Dashboard
- Add new food items with image upload
- View and manage all food listings
- Manage and update customer orders

### ⚙️ Backend API
- RESTful API with Express 5
- MongoDB database via Mongoose
- JWT-based authentication & authorization
- Secure file uploads with Multer
- Stripe payment processing
- Password hashing with bcrypt

---

## 🧰 Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Frontend  | React 19, React Router, Axios, Vite             |
| Admin     | React 19, React Router, React Toastify, Vite    |
| Backend   | Node.js, Express 5, Mongoose, JWT, Multer       |
| Database  | MongoDB Atlas                                   |
| Payments  | Stripe                                          |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- A [MongoDB Atlas](https://cloud.mongodb.com/) account
- A [Stripe](https://stripe.com/) account

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/React-Food-Delivery.git
cd React-Food-Delivery
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Fill in the values in `.env`:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Start the backend server:

```bash
npm run server
```

> The API will run on **http://localhost:4000**

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

> The customer app will run on **http://localhost:5173**

---

### 4. Admin Dashboard Setup

```bash
cd admin/vite-project
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Fill in the values in `.env`:

```env
VITE_ADMIN_TOKEN=your_admin_jwt_token
```

Start the admin app:

```bash
npm run dev
```

> The admin dashboard will run on **http://localhost:5174**

---

## 🔌 API Endpoints

| Method | Endpoint              | Description                  | Auth Required |
|--------|-----------------------|------------------------------|---------------|
| GET    | `/api/food/list`      | Get all food items           | No            |
| POST   | `/api/food/add`       | Add a new food item          | Admin         |
| DELETE | `/api/food/remove`    | Remove a food item           | Admin         |
| POST   | `/api/user/register`  | Register a new user          | No            |
| POST   | `/api/user/login`     | Login and receive JWT token  | No            |
| POST   | `/api/cart/add`       | Add item to cart             | Yes           |
| POST   | `/api/cart/remove`    | Remove item from cart        | Yes           |
| GET    | `/api/cart/get`       | Get user's cart              | Yes           |
| POST   | `/api/order/place`    | Place an order (Stripe)      | Yes           |
| POST   | `/api/order/verify`   | Verify Stripe payment        | No            |
| GET    | `/api/order/userorders` | Get user's orders          | Yes           |
| GET    | `/api/order/list`     | Get all orders               | Admin         |
| POST   | `/api/order/status`   | Update order status          | Admin         |

---

## 📂 Environment Variables

Each sub-project has a `.env.example` file. Copy it to `.env` and fill in your values.

| File | Variables |
|------|-----------|
| `backend/.env.example` | `MONGODB_URI`, `JWT_SECRET`, `STRIPE_SECRET_KEY` |
| `admin/vite-project/.env.example` | `VITE_ADMIN_TOKEN` |
| `frontend/.env.example` | `VITE_API_URL` |

> ⚠️ **Never commit your `.env` files.** They are listed in `.gitignore`.

---

## 📜 Scripts

### Backend
| Command | Description |
|---------|-------------|
| `npm run server` | Start the dev server with nodemon |

### Frontend & Admin
| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Express](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Stripe](https://stripe.com/)
