import os
from datetime import datetime, timedelta, timezone
from jose import jwt
from dotenv import load_dotenv
from .db import get_last_login

load_dotenv()

# Define tu clave secreta y parámetros del token
SECRET_KEY = os.getenv('SECRET_KEY')  # Cámbiala por una clave segura
ALGORITHM = os.getenv('ALGORITHM')
ACCESS_TOKEN_EXPIRE_MINUTES = 1

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.now((timezone.utc)) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def is_session_expired(username: str):
    result = get_last_login(username)
    if not result:
        return True  # Si no hay datos, forzar cierre de sesión

    last_login = result[0][0]  # Obtenemos la última fecha de login
    last_login_time = datetime.strptime(last_login, "%Y-%m-%d %H:%M:%S")  # Convertir a datetime
    
    if datetime.now() - last_login_time > timedelta(hours=12):
        return True  # Sesión expirada

    return False  # Sesión aún válida
