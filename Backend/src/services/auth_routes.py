# auth_routes.py
from fastapi import APIRouter, HTTPException, Depends
from datetime import timedelta
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from jose import jwt
from config.auth import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, SECRET_KEY, ALGORITHM, is_session_expired
from config.db import get_user_db, save_login_timestamp
from datetime import datetime

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Modelo para la solicitud de login
class LoginRequest(BaseModel):
    username: str
    password: str

# Función para validar el login
async def login_(username: str, password: str):
    if not username or not password:
        print("Faltan credenciales")
        raise HTTPException(status_code=400, detail="Faltan credenciales")
    
    user_list = get_user_db(username)
    stored_username = user_list[0][0]
    stored_password = user_list[0][1]

    # print(f'Credenciales HTTP: {username} - {password}')
    # print(f'Credenciales db: {stored_username} - {stored_password}')

    if not user_list:
        print("Usuario no encontrado")
        raise HTTPException(status_code=401, detail="Usuario no encontrado")
    
    if stored_username != username or stored_password != password:
        print("Nombre de Usuario o contraseña incorrectos")
        raise HTTPException(status_code=401, detail="Nombre de Usuario o contraseña incorrectos")
    else:
        save_login_timestamp(stored_username)
        return {"username": stored_username}

@router.post('/login')
async def login(data: LoginRequest):
    try:
        result = await login_(data.username, data.password)
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": result["username"]},
            expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer"}
    except HTTPException as he:
        # Se relanza la excepción para que FastAPI la maneje correctamente
        raise he
    except Exception as e:
        # Imprime el error completo en la consola para depuración
        print(f"Error en el endpoint /login: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error interno del servidor: {str(e)}")

# Middleware para verificar el token y la sesión
async def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        exp_timestamp = payload.get("exp")
        
        if exp_timestamp and datetime.now().timestamp() > exp_timestamp:
            raise HTTPException(status_code=401, detail="Token expirado")

        username: str = payload.get("sub")

        if username is None or is_session_expired(username):
            raise HTTPException(status_code=401, detail="Sesión expirada, inicia sesión nuevamente")

        return username

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expirado")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")

    
@router.get('/protected')
async def protected_route(username: str = Depends(verify_token)):
    return {"message": "Acceso permitido", "user": username}