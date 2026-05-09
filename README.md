# Holly's Garden - E-Commerce Frontend

A full-stack e-commerce web application for a flower bouquet shop. This frontend communicates with a Spring Boot REST API backend and implements session-based authentication with CSRF protection.

## Authors
- **Novio, Mariel Kimberly B.** - Frontend development, Fetch API, Session Auth, Documentation
- **Cosino, Vivian Faith C.** - HTML structure, CSS styling, Cart, Checkout, Signup

## Project Overview
Holly's Garden is a flower bouquet e-commerce site that allows users to:
- Browse and view flower bouquet products
- Add products to cart
- Register and login securely
- Checkout (protected route — requires login)
- View order history in account page

## Setup Instructions

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge)
- [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for VS Code
- Spring Boot backend running on `http://localhost:8080`

### How to Run
1. Clone the repository:
`git clone https://github.com/your-username/your-frontend-repo.git`
2. Open the project folder in VS Code
3. Make sure the backend is running at `http://localhost:8080`
4. Right click on `landing.html` and click **Open with Live Server**
5. The site will open at `http://localhost:5500`

## Security Architecture

### Session-Based Authentication
This application uses **Spring Security's session-based authentication**:

1. **Registration**: User submits username and password to `POST /api/v1/auth/register`. Password is encrypted using BCrypt before storing.

2. **Login Flow**:
   - Frontend makes `GET /login` to initialize the session
   - User submits credentials to `POST /login`
   - Spring Security validates credentials and creates a server-side session
   - Browser receives and stores `JSESSIONID` cookie automatically
   - All subsequent requests include `JSESSIONID` cookie to identify the session

3. **CSRF Protection**:
   - Spring Security sets an `XSRF-TOKEN` cookie on the first request
   - Frontend reads this cookie and includes it in POST requests as `X-CSRF-TOKEN` header
   - This prevents Cross-Site Request Forgery attacks

4. **Protected Routes**:
   - `checkout.html` checks authentication on page load by calling `/api/v1/auth/me`
   - If the response is a redirect (302) or 401, user is redirected to `login.html`
   - If response is 403, user sees "Access Denied" message

5. **401/403 Error Handling**:
   - `401 Unauthorized`: User is not logged in → redirect to `login.html`
   - `403 Forbidden`: User is logged in but lacks permission → show "Access Denied"

## Validation Rules

| Field | Rule |
|-------|------|
| Username | Required, minimum 3 characters, maximum 50 characters |
| Password | Required, minimum 6 characters |
| Role | Required, cannot be blank |
| Product Name | Required, minimum 2 characters |
| Price | Must be a positive number |
| Category | Required, cannot be empty |
| Stock Quantity | Must be non-negative (0 or more) |

## API Reference

Base URL: `http://localhost:8080`

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/login` | Get login page / initialize CSRF token | No |
| `POST` | `/login` | Login with username and password | No |
| `POST` | `/logout` | Logout and invalidate session | Yes |
| `POST` | `/api/v1/auth/register` | Register a new user | No |
| `GET` | `/api/v1/auth/me` | Get current logged in user | Yes |

### Product Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/v1/products` | Get all products | No |
| `GET` | `/api/v1/products/{id}` | Get product by ID | No |
| `GET` | `/api/v1/products/filter` | Filter products | No |
| `POST` | `/api/v1/products` | Create a product | Yes |
| `PUT` | `/api/v1/products/{id}` | Update a product | Yes |
| `PATCH` | `/api/v1/products/{id}` | Partially update a product | Yes |
| `DELETE` | `/api/v1/products/{id}` | Delete a product | Yes |

## Known Limitations
- Session data is lost when the backend restarts (in-memory storage)
- No token refresh mechanism implemented
- No role-based access control on the frontend
- CSRF token handling depends on cookies being enabled in the browser