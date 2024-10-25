import pytest
from httpx import ASGITransport, AsyncClient
from app.main import app, get_session
from sqlmodel import SQLModel, Session, create_engine
from app.database import engine

# Create a test db
sqlite_url = f"sqlite:///./test.db"

connect_args = {"check_same_thread" : False}
engine = create_engine(sqlite_url, connect_args=connect_args)

# Override get_session dependency
def get_session_override():
    with Session(engine) as session:
        yield session
        
app.dependency_overrides[get_session] = get_session_override

@pytest.fixture(autouse=True)
def create_test_database():
    SQLModel.metadata.create_all(engine)
    yield
    SQLModel.metadata.drop_all(engine)
    
@pytest.mark.asyncio
async def test_create_message():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        # Create a message
        response = await ac.post("/messages/", json={"content": "Test message"})
        assert response.status_code == 200
        data = response.json()
        
        # Verify that two responses are returned, where [user_message, agent_message]
        assert len(data) == 2 
        assert data[0]["content"] == "Test message"
        assert data[1]["content"] == "Hi there, you said: 'Test message'"
        assert data[0]["sender"] == "user"
        assert data[1]["sender"] == "agent"
        
@pytest.mark.asyncio
async def test_get_messages():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        # First, create a message
        await ac.post("/messages/", json={"content": "Test message"})
        
        # Get messages
        response = await ac.get("/messages/")
        assert response.status_code == 200
        data = response.json()
        
        # Verify that two responses are returned, where [user_message, agent_message]
        assert len(data) == 2
        assert data[0]["content"] == "Test message"
        assert data[1]["content"] == "Hi there, you said: 'Test message'"
        assert data[0]["sender"] == "user"
        assert data[1]["sender"] == "agent"
        
@pytest.mark.asyncio
async def test_update_message():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        # First, create a message
        create_response = await ac.post("/messages/", json={"content": "Old content"})
        user_message = create_response.json()[0]
        message_id = user_message["id"]
        
        # Update the message
        update_response = await ac.put(f"/messages/{message_id}", json={"content": "Updated content"})
        
        # Verify the message content was updated to the new content
        assert update_response.status_code == 200
        updated_message = update_response.json()
        assert updated_message["content"] == "Updated content"


@pytest.mark.asyncio
async def test_delete_message():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        # First, create a message
        create_response = await ac.post("/messages/", json={"content": "To be deleted"})
        user_message = create_response.json()[0]
        message_id = user_message["id"]
        
        # Delete the message
        delete_response = await ac.delete(f"/messages/{message_id}")
        
                
        # Verify deletion
        assert delete_response.status_code == 200
        get_response = await ac.get("/messages/")
        data = get_response.json()
        
        # The agent response should still exist
        assert len(data) == 1
        assert data[0]["sender"] == "agent"