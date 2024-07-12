
import sys
import secrets

import asyncio

import bcrypt

sys.path.append("..")
from starlette.responses import JSONResponse
from fastapi.responses import JSONResponse
from fastapi import Depends, HTTPException, status, APIRouter, Request, Response, Form
from pydantic import BaseModel
from typing import Optional
import models
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi.responses import RedirectResponse
import firebase_admin
from firebase_admin import credentials, auth
import schemas

import pyrebase
from getpass import getpass

import models

SECRET_KEY = "ba58c4e2355ca9ecf71c9f64419364528e778df94608dc2cf38b91c9f4003ea7"
ALGORITHM = "HS256"

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

models.Base.metadata.create_all(bind=engine)

oauth2_bearer = OAuth2PasswordBearer(tokenUrl="token")

firebaseConfig = {
    # "apiKey": "AIzaSyBdWEHGajhJ8qS9qFx_vaNs3HufSW6xYkI",
    # "authDomain": "userverification-7f771.firebaseapp.com",
    # "projectId": "userverification-7f771",
    # "storageBucket": "userverification-7f771.appspot.com",
    # "messagingSenderId": "286930370148",
    # "appId": "1:286930370148:web:1db599fae38d3d55dc6971",
    # "measurementId": "G-EJ6VDQMVSJ",
    # "databaseURL": "sqlite:///./todosapp.db"
}

firebase = pyrebase.initialize_app(firebaseConfig)

authen = firebase.auth()

# cred = credentials.Certificate("userverification-7f771.json")
cred = credentials.Certificate("")

firebase_admin.initialize_app(cred)


def gen_salt() -> str:
    return secrets.token_urlsafe(20)


def gen_secret() -> str:
    return secrets.token_urlsafe(20)


router = APIRouter(
    prefix="/auth",
    tags=["auth"],
    responses={401: {"user": "Not authorized"}}
)

# Define models and helper functions here...

# class LoginForm:
#     def __init__(self, request: Request):
#         self.request: Request = request
#         self.username: Optional[str] = None
#         self.password: Optional[str] = None

#     async def create_oauth_form(self):
#         form = await self.request.form()
#         self.username = form.get("email")
#         self.password = form.get("password")


from typing import Optional


class LoginForm:
    def __init__(self, username: str, password: str):
        self.username: str = username
        self.password: str = password

    @classmethod
    async def create_from_json(cls, json_data: dict):
        username = json_data.get("username")
        password = json_data.get("password")
        return cls(username, password)


from pydantic import BaseModel


class LoginForm(BaseModel):
    username: str
    password: str


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


def get_password_hash(password, salt):
    return bcrypt_context.hash(password + salt)


def get_esk(salt, secretkey):
    return bcrypt_context.hash(salt + secretkey)


def verify_esk(salt, secretkey, esk):
    if bcrypt_context.verify(salt + secretkey, esk):
        return esk
    return


def verify_password(plain_password, hashed_password, salt):
    return bcrypt_context.verify(plain_password + salt, hashed_password)


def authenticate_user(username: str, password: str, db):
    # print("user ny 8")
    user = db.query(models.Users).filter(models.Users.username == username).first()
    if user:
        uid = user.uid
        salt = user.salt
        secret_key = user.secret_key
        hashed_secret_key = bcrypt.hashpw(secret_key, salt)
        # eskv = get_esk(user.salt, user.secret_key,models.Pass.esk)

        try:

            user_verify = auth.get_user(uid)
            if user_verify.email_verified:
                passes = db.query(models.Pass).filter(models.Pass.esk == hashed_secret_key).first()
                if passes:
                    return user
        except auth.UserNotFoundError:
            return "Please verify your email first."
        except Exception as e:
            print(f"Error: {e}")
            return False

    # User not found in the database or authentication failed
    return False


# def check_user_email(username: str, db):
#     user = db.query(models.Users) \
#         .filter(models.Users.username == username) \
#         .first()

#     if user:
#         user_mail = user.email
#         return user_mail

def create_access_token(username: str, user_id: int, expires_delta: Optional[timedelta] = None):
    encode = {"sub": username, "id": user_id}
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    encode.update({"exp": expire})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)


async def get_current_user(request: Request):
    try:
        # print("Tanvir 8")

        token = request.cookies.get("access_token")
        # print("Tanvir 100")
        if token is None:
            return None
        # print("Tanvir 9")

        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        user_id: int = payload.get("id")

        if username is None or user_id is None:
            logout(request)
        return {"username": username, "id": user_id}
    except JWTError:
        raise HTTPException(status_code=404, detail="Not found")


@router.post("/token")
async def login_for_access_token(req_user: schemas.PassBase, response: Response,
                                 db: Session = Depends(get_db)):
    # Attempt user authentication
    user = authenticate_user(req_user.username, req_user.password, db)
    # Print form data for debugging purposes (optional)  # print(form_data)  # Uncomment if needed
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    token_expires = timedelta(minutes=60)
    token = create_access_token(user.username, user.id, expires_delta=token_expires)
    # Return data with both token and cookie setting for flexibility
    return {
        "access_token": token, "token_type": "bearer"
    }, response.set_cookie(key="access_token", value=token, httponly=True)


# @router.get("/")
# async def authentication_page(request: Request):
#     return JSONResponse(content={"message": "This endpoint is not supported in the API."}, status_code=404)


# @router.post("/")
# async def login(request: Request, db: Session = Depends(get_db)):
#     try:
#         form = LoginForm(request)
#         await form.create_oauth_form()
#         response = RedirectResponse(url="/todos", status_code=status.HTTP_302_FOUND)
#
#         validate_user_cookie = await login_for_access_token(response=response, form_data=form, db=db)
#
#         if not validate_user_cookie:
#             return JSONResponse(content={"message": "Incorrect Username or Password"}, status_code=401)
#         return response
#     except HTTPException:
#         return JSONResponse(content={"message": "Unknown Error (please verify your account first)"}, status_code=401)


@router.get("/logout")
async def logout(request: Request):
    response = JSONResponse(content={"message": "Logout successful"})
    response.delete_cookie(key="access_token")
    return response


@router.post("/register/")
async def register_user(requested_user: schemas.UserBase, db: Session = Depends(get_db)):
    # Add registration logic here...

    # email = user_data.get("email")
    # username = user_data.get("username")
    # firstname = user_data.get("firstname")
    # lastname = user_data.get("lastname")
    # password = user_data.get("password")
    # password2 = user_data.get("password2")


    validation1 = db.query(models.Users).filter(models.Users.username == requested_user.username).first()
    validation2 = db.query(models.Users).filter(models.Users.email == requested_user.email).first()

    if validation1 is not None or validation2 is not None:
        raise HTTPException(status_code=422, detail="Invalid registration request")

    user_model = models.Users()
    # pass_model = models.Pass()
    # user_model.username = username
    # user_model.email = email
    # user_model.first_name = firstname
    # user_model.last_name = lastname
    # salt = gen_salt()
    # test code
    salt = bcrypt.gensalt()
    hash_password = bcrypt.hashpw(requested_user.password.encode(), bcrypt.gensalt())
    # secret_key = gen_secret()
    secret_key = bcrypt.hashpw(requested_user.email.encode(), bcrypt.gensalt())
    # user_model.secret_key = secret_key
    # user_model.is_active = False  # User is inactive until verified

    user = authen.create_user_with_email_and_password(requested_user.email, hash_password.decode())
    Login = authen.sign_in_with_email_and_password(requested_user.email, hash_password.decode())
    authen.send_email_verification(Login['idToken'])
    uid = user['localId']
    new_user = models.Users(email = requested_user.email, username = requested_user.username, first_name = requested_user.first_name, last_name =requested_user.last_name, secret_key = secret_key, salt = salt, uid=uid)



    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    hashed_secret_key = bcrypt.hashpw(secret_key, salt)
    new_user_password = models.Pass(esk = hashed_secret_key, hashed_password = hash_password)
    db.add(new_user_password)
    db.commit()
    db.refresh(new_user_password)

    # pass_model.hashed_password = hash_password
    #
    # pass_model.esk = hashed_secret_key
    # user_model.updated_at = datetime.utcnow()
    # ++++++++++++++++++++++++

    # db.add(pass_model)
    # db.commit()
    # db.refresh(pass_model)

    # db.add(user_model)
    # db.commit()
    # db.add(pass_model)
    # db.commit()
    # Send email verification

    # try:
    #     # user = auth.create_user_with_email_and_password(email, hash_password)
    #     # auth.send_email_verification(user['idToken'])
    #     user = authen.create_user_with_email_and_password(requested_user.email, hash_password)
    #     Login = authen.sign_in_with_email_and_password(requested_user.email, hash_password)
    #     authen.send_email_verification(Login['idToken'])
    #     uid = user['localId']
    #     new_user.uid = uid
    #     db.commit()
    #     msg = "User created successfully. Please check your email to verify your account."
    #
    # except Exception as e:
    #     db.rollback()
    #     msg = f"Error creating user: {str(e)}"

    return {"message": "Registration successful"}


@router.post("/forgetPass")
async def forget_password(email: str = Form(...), db: Session = Depends(get_db)):
    # Add forget password logic here...
    return {"message": "Password reset email sent"}


@router.post("/verifyEmail")
async def verify_email(email: str = Form(...), db: Session = Depends(get_db)):
    # Add email verification logic here...
    return {"message": "Email verified"}

# Additional endpoints can be added as needed...


# def authenticate_user(username: str, password: str, db):
#     # Add authentication logic here...
#     return None
