# Artisan Chatbot Project Overview

This project consists of two main parts:

1. **Backend:** FastAPI (located in the `backend/` directory)
2. **Frontend:** Next.js (located in the `frontend/` directory)

## Getting Started

Clone this repo:
## Getting Started

Clone this repo:

```bash
gh repo clone plumsily/artisan-chatbot
```

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
    fastapi dev app/main.py
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
- Ensure both the frontend and backend servers are running simultaneously.


## Development Steps

### Backend Development

1. **Setting Up FastAPI Backend**

   - Initiated the backend development by setting up a FastAPI project structure.
   - Created virtual environments for dependency management.

2. **Creating Models and API Routes**

   - Defined data models using Pydantic for data validation and serialization.
   - Developed API routes to handle user messages and agent responses.

3. **Testing API Endpoints**

   - Used `curl` commands to test the API endpoints with a temporary in-memory data store.
   - Validated the functionality of the endpoints before integrating a database.

4. **Integrating Automated Agent Response**

   - Implemented an automated agent that generates responses to user messages.
   - Ensured that the agent's responses are correctly returned via the API.

### Frontend Development

1. **Laying Out Core Components**

   - Started by designing the core components needed to interact with the backend API.
   - Built the user interface for sending messages and displaying responses.

2. **Component Design and Modularization**

   - Refactored the frontend code to modularize components for reusability.
   - Followed best practices in component design for maintainability.

3. **Design and Accessibility Enhancements**

   - Improved the UI/UX with non-critical features like chat window expansion.
   - Enhanced accessibility to ensure the app is usable by all users.

### Linking Frontend and Backend

- Integrated the frontend with the backend API endpoints.
- Tested the full communication flow to ensure that user messages are processed and responses are displayed correctly.

### Adding Data Persistence with SQLite

- Introduced a SQLite database for persistent data storage.
- Modified the API endpoints to perform CRUD operations with the database.
- Migrated from the in-memory solution to SQLite for data durability.

### Testing and Continuous Integration

- Wrote unit tests using `pytest` to verify the backend functionality.
- Configured GitHub Actions CI to automatically run tests on code pushes.
- Ensured that all endpoints are working correctly through continuous integration.

---

## Future Considerations

- **Frontend Integration Tests:**
  - Plan to write integration tests for the frontend using Jest.
  - This will help in catching issues related to component interactions and API integrations.

- **Performance Optimizations:**
  - Explore large list memoization techniques to enhance performance.
  - Optimize both frontend and backend for scalability.
