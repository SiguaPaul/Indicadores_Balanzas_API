from fastapi import HTTPException
from config.db import get_user_db
import bcrypt  # Para comparar el hash de la contraseña

async def get_user_results(username: str, password: str):
    try:
        # Validar que se hayan recibido ambas credenciales
        if not username or not password:
            raise HTTPException(status_code=400, detail="Faltan credenciales")
        
        # Buscar el usuario en la base de datos
        user_list = get_user_db(username)
        if not user_list:
            raise HTTPException(status_code=401, detail="Usuario no encontrado")
        
        # Se asume que la consulta retorna (username, stored_password_hash)
        stored_username = user_list[0][0]
        stored_password_hash = user_list[0][1]
        
        return {"message": "Inicio de sesión exitoso", "username": stored_username}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al intentar iniciar sesión: {str(e)}")
    
def get_post_result(username, password):
    return username, password
