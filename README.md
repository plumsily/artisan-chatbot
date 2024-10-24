# Artisan Chatbot Project Overview

This project consists of two main parts:

1. **Backend:** FastAPI (located in the `backend/` directory)
2. **Frontend:** Next.js (located in the `frontend/` directory)

## Getting Started

### Backend (FastAPI)

To get the backend (FastAPI) up and running, follow these steps:

1. Navigate to the `backend/` directory:

    ```bash
    cd backend
    ```

2. **Create a virtual environment** (if not already created):

    ```bash
    python -m venv .venv
    ```

3. **Activate the virtual environment:**

    ```bash
    source .venv/bin/activate
    ```

4. **Install the required dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

5. **Run the development server:**

    ```bash
    fastapi dev main.py
    ```

### Frontend (Next.js)

To get the frontend (Next.js) up and running, follow these steps:

1. Navigate to the `frontend/` directory:

    ```bash
    cd frontend
    ```

2. **Install the dependencies:**

    ```bash
    npm install
    ```

3. **Run the development server:**

    ```bash
    npm run dev
    ```

4. Open your browser and navigate to `http://localhost:3000` to view the Next.js app.

---

## Additional Information

- The FastAPI backend should be running on a different port (`http://localhost:8000`).