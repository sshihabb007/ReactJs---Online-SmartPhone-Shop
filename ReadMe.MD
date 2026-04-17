# ReactJs - Online SmartPhone Shop

A full-stack, modern e-commerce platform rebuilt from the ground up using **React.js** and **Node.js (Express)**. Originally a legacy PHP/jQuery application, this project has been fully migrated to a robust, scalable architecture while retaining the original MySQL database schema. Built and maintained by **Mehedi Hasan Shihab**.

![SmartPhoneShop Preview](client/src/assets/hero.png)

## 🚀 Features

*   **Modern SPA Authentication:** Secure login and registration using JWT (JSON Web Tokens).
*   **Dynamic Product Catalog:** Browse premium smartphones with dynamic search functionality and brand filters.
*   **Shopping Cart State:** Real-time cart management utilizing React Context API.
*   **Secure Checkout:** Smooth checkout process that saves order details to the database.
*   **User Order History:** Users can securely view their past orders and track their delivery status.
*   **Admin Dashboard:** Comprehensive admin panel providing visual metrics, order fulfillment toggles, and user management.
*   **Premium UI/UX:** Responsive, dark-themed, glassmorphism design powered by Tailwind CSS v4.

## 🛠️ Technology Stack

*   **Frontend:** React 18, Vite, React Router v6, Tailwind CSS v4, Axios.
*   **Backend:** Node.js, Express.js, JSON Web Tokens (JWT).
*   **Database:** MySQL (using `mysql2` with connection pooling).

## 📋 Prerequisites

Before running the project locally, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v16+ recommended)
*   [XAMPP](https://www.apachefriends.org/) or any other MySQL environment

## ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sshihabb007/ReactJs---Online-SmartPhone-Shop.git
    cd ReactJs---Online-SmartPhone-Shop
    ```

2.  **Database Configuration:**
    *   Start Apache and MySQL via your XAMPP control panel.
    *   Open phpMyAdmin (`http://localhost/phpmyadmin/`) and create a database named `project`.
    *   Import the SQL file from the original PHP project (if available) or ensure the tables (`user`, `brands`, `cart`, `categories`, `order`, `product`, `qnty`, `specification`) are set up correctly.

3.  **Install Backend Dependencies:**
    ```bash
    cd server
    npm install
    ```

4.  **Install Frontend Dependencies:**
    ```bash
    cd ../client
    npm install
    ```

## 🚀 How to Run

You need to run both the Node.js backend and the React Vite frontend simultaneously.

**1. Start the Backend Server (Port 5000):**
Open a terminal, navigate to the `server` folder, and run:
```bash
cd server
node server.js
```
*You should see: "SmartPhoneShop Server by Shihab running on http://localhost:5000"*

**2. Start the Frontend Server (Port 5173):**
Open a new terminal, navigate to the `client` folder, and run:
```bash
cd client
npm run dev
```
*Your frontend will be accessible at: `http://localhost:5173`*

## 🔑 Admin Credentials

To access the admin panel (`/admin`), you can log in using the default administrative account:

*   **Email:** `abc@g.com`
*   **Password:** `88888888`

## 📁 Project Structure

```text
ReactJs---Online-SmartPhone-Shop/
│
├── client/                 # React Frontend
│   ├── src/
│   │   ├── api.js          # Centralized Axios API configuration
│   │   ├── components/     # Reusable UI components (Navbar, Footer)
│   │   ├── context/        # Global State (AuthContext, CartContext)
│   │   ├── pages/          # Application routes (Home, Login, Admin, etc.)
│   │   ├── index.css       # Tailwind configuration and global styles
│   │   └── App.jsx         # Main router setup
│   └── vite.config.js      # Vite and Tailwind v4 configuration
│
├── server/                 # Express Backend
│   ├── config/
│   │   └── db.js           # MySQL database connection pool by Shihab
│   ├── routes/             # API Endpoints (auth, products, summary, cart)
│   └── server.js           # Main Express server entry point
│
├── Image/                  # Legacy product images (served statically by Node)
└── README.md
```

## 👨‍💻 Developer

Developed with ❤️ by [Mehedi Hasan Shihab](https://sshihabb007.github.io/Shihab/).
*   **LinkedIn**: [Mehedi Hasan Shihab](https://www.linkedin.com/in/mehedi-hasan-shihab-30a445b6/)
*   **GitHub**: [sshihabb007](https://github.com/sshihabb007)
