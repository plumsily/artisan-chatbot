from typing import Optional
from sqlmodel import Field, Session, SQLModel
from datetime import datetime
from uuid import UUID

# Model for messages
class MessageBase(SQLModel):
    content: str
    
class Message(MessageBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    sender: str  # 'user' or 'agent'
    timestamp: datetime = Field(default_factory=datetime.now)
    