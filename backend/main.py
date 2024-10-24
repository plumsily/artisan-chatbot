from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from uuid import UUID, uuid4

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow frontend to access the backend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)

# Model for messages
class Message(BaseModel):
    id: UUID
    sender: str  # 'user' or 'agent'
    content: str
    timestamp: datetime
class MessageCreate(BaseModel):
    content: str

# In-memory storage for messages to test endpoint functionality first
messages = []

@app.get('/messages/', response_model=list[Message])
async def read_messages():
    return messages

@app.post('/messages/', response_model=Message)
def create_message(message: MessageCreate):

    user_message = Message(
        id=uuid4(),
        content=message.content,
        sender='user',
        timestamp=datetime.now()
    )
    messages.append(user_message)

    return user_message