from datetime import datetime
from pydantic import BaseModel

class UserBase(BaseModel):
    email: str
    username: str
    first_name: str
    last_name: str
    password: str

    # class Config:
    #     orm_mode = True

class PassBase(BaseModel):
    username: str
    password: str

    # class Config:
    #     orm_mode = True


class Todos(BaseModel):
    id: int
    title: str
    description: str
    priority: int
    complete: bool
    owner_id: int
    
    class Config:
        orm_mode = True
