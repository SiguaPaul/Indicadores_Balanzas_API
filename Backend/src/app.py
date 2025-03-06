import uvicorn
from fastapi import FastAPI
from services.indicators import get_indicator_bal1_vs_bal1ab
from fastapi.middleware.cors import CORSMiddleware

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

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=9999)