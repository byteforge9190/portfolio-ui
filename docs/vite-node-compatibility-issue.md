# Vite and Node.js Compatibility Issue

## Problem

The project was encountering an `EBADENGINE` warning during `npm install`. This was because the version of Vite specified in `package.json` was not compatible with the version of Node.js being used (`v22.2.0`).

## Solution

The issue was resolved by switching to a compatible version of Node.js using the Node Version Manager (nvm).

1.  **Switched to Node.js v20:**
    ```bash
    nvm install 20
    nvm use 20
    ```
2.  **Re-installed dependencies:**
    ```bash
    npm install
    ```

This aligned the Node.js version with Vite's requirements, resolving the warning and ensuring a stable development environment.