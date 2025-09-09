# Forgot Password and Reset Password Feature Implementation

This document outlines the frontend implementation details for the "Forgot Password" and "Reset Password" functionalities.

## Overview

The feature allows users to reset their forgotten passwords by requesting a password reset link via email and then setting a new password using a unique token.

## Frontend Changes

### 1. `src/pages/Login.tsx`

*   Added a "Forgot Password?" link that navigates to the `/forgot-password` route.

### 2. `src/components/ForgotPasswordForm.tsx`

*   **Purpose:** A reusable form component to collect the user's email address for password reset requests.
*   **Props:**
    *   `onSubmit: (email: string) => void`: Callback function triggered on form submission with the entered email.
    *   `loading: boolean`: Boolean to indicate loading state, disabling the submit button.
*   **Styling:** Uses Tailwind CSS for a modern, responsive look.

### 3. `src/pages/ForgotPassword.tsx`

*   **Purpose:** The main page for handling "Forgot Password" requests.
*   **Components Used:** Renders `ForgotPasswordForm`.
*   **API Integration:**
    *   Calls `authAPI.forgotPassword(email)` (POST `/api/v1/auth/forgotpassword`) to send the password reset email.
    *   Handles loading states, success messages (e.g., "Password reset email sent. Check your inbox."), and error messages using `react-toastify`.
*   **Styling:** Uses Tailwind CSS for layout and appearance.

### 4. `src/api/services.ts`

*   **`authAPI.forgotPassword(email: string)`:**
    *   Sends a `POST` request to `/auth/forgotpassword` with the user's email in the request body (`{ email }`).
    *   Expected response: `ApiResponse<string>` (e.g., `{ success: true, data: "Email sent" }`).
*   **`authAPI.resetPassword(token: string, password: string)`:**
    *   Sends a `PUT` request to `/auth/resetpassword/:token` with the new password in the request body (`{ password }`).
    *   Expected response: `AuthResponse` (e.g., `{ status: "success", token: "...", user: {...} }`).

### 5. `src/components/ResetPasswordForm.tsx`

*   **Purpose:** A reusable form component to collect the new password and its confirmation.
*   **Props:**
    *   `onSubmit: (password: string) => void`: Callback function triggered on form submission with the new password.
    *   `loading: boolean`: Boolean to indicate loading state, disabling the submit button.
*   **Validation:** Includes client-side validation to ensure passwords match and meet minimum length requirements (e.g., 8 characters).
*   **Styling:** Uses Tailwind CSS.

### 6. `src/pages/ResetPassword.tsx`

*   **Purpose:** The main page for handling password reset using a token.
*   **Route Parameter:** Extracts the `resettoken` from the URL using `useParams()`.
*   **Components Used:** Renders `ResetPasswordForm`.
*   **API Integration:**
    *   Calls `authAPI.resetPassword(resettoken, password)` (PUT `/api/v1/auth/resetpassword/:resettoken`) to update the user's password.
    *   Handles loading states, success messages (e.g., "Your password has been reset successfully. Please login."), and error messages using `react-toastify`.
    *   Redirects to the `/login` page on successful password reset.
*   **Error Handling:** Displays an error if the `resettoken` is missing or invalid.
*   **Styling:** Uses Tailwind CSS.

### 7. `src/App.tsx`

*   **Routing:**
    *   Added a new route: `<Route path="/forgot-password" element={<ForgotPassword />} />`
    *   Added a new route: `<Route path="/reset-password/:resettoken" element={<ResetPassword />} />`
*   **Imports:** Imported `ForgotPassword` and `ResetPassword` components.

## Backend API Endpoints (for reference)

*   **Forgot Password Request:**
    *   `POST /api/v1/auth/forgotpassword`
    *   Request Body: `{ "email": "user@example.com" }`
    *   Success Response: `{ "success": true, "data": "Email sent" }`

*   **Reset Password (using token):**
    *   `PUT /api/v1/auth/resetpassword/:resettoken`
    *   Request Body: `{ "password": "newStrongPassword123" }`
    *   Success Response: `{ "status": "success", "token": "jwt_token_here", "user": { ... } }`

## Troubleshooting

*   **404 Error on API Calls:** Ensure your backend server is running and the `VITE_API_URL` in your frontend's `.env` file is correctly configured to point to your backend's base URL (e.g., `http://localhost:3000/api/v1`). Also, verify that the backend has the correct routes defined for `POST /api/v1/auth/forgotpassword` and `PUT /api/v1/auth/resetpassword/:resettoken`.
*   **"data, missing or empty" Error:** This indicates the backend received the request but is expecting specific data in the request body that is either missing or not in the expected format. Double-check the backend's parsing and validation logic for the request body, especially the `email` field for forgot password and `password` for reset password.
