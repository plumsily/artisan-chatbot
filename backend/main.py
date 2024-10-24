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
class MessageUpdate(BaseModel):
    content: str

# In-memory storage for messages to test endpoint functionality first
messages:list[Message] = []

# Agent response handler - a simple echo of user message
def get_agent_response(user_message: str) -> str :
    return f"Hi there, you said: '{user_message}'"

# API Endpoints

@app.get('/messages/', response_model=List[Message])
async def read_messages():
    return messages

@app.post('/messages/', response_model=dict)
async def create_message(message: MessageCreate):

    user_message = Message(
        id=uuid4(),
        content=message.content,
        sender='user',
        timestamp=datetime.now()
    )
    messages.append(user_message)
    
    agent_message = Message(
        id=uuid4(),
        content=get_agent_response(message.content),
        sender='agent',
        timestamp=datetime.now()
    )
    messages.append(agent_message)

    return {
        "user_message": user_message,
        "agent_message": agent_message
    }
    
@app.delete('/messages/{message_id}')
async def delete_message(message_id: str):
    for index, message in enumerate(messages):
        if message.id == message_id and message.sender == 'user':
            messages.pop(index)
            return {"detail": "Message deleted."}
        
@app.put('/messages/{message_id}')
async def update_message(message_id: UUID, message_update: MessageUpdate):
    for message in enumerate(messages):
        if message.id == message_id:
            message.content = message_update.content
            return message
