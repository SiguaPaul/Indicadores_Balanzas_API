import uvicorn
from fastapi import FastAPI, APIRouter, HTTPException
from services.indicators import get_indicator_bal1_vs_bal1ab
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.login import get_user_results

app = FastAPI(
    title="Indicadores Balanzas API",
    description="API para el manejo de indicadores de balanza",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # o ["*"] para permitir cualquier origen
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Bienvenido a la API Indicadores Balanzas"}

@app.get("/indicator-daily")
def get_indicator_daily():
    # Implementación de la lógica para obtener los indicadores diarios
    return get_indicator_bal1_vs_bal1ab()

# Definición del router y endpoint de login
router = APIRouter()

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post('/login')
async def login(data: LoginRequest):
    try:
        result = await get_user_results(data.username, data.password)

        if not result:
            raise HTTPException(status_code=401, detail="Credenciales incorrectas")

        return result

    except Exception as e:
        print(f"Error en el backend: {str(e)}")
        raise HTTPException(status_code=500, detail="Error interno del servidor")

# Incluir el router en la aplicación FastAPI
app.include_router(router)

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=9999)
