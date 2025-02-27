import uvicorn
from fastapi import FastAPI
from src.services.indicadores import get_daily_logs


app = FastAPI(
    title="Indicadores Balanzas API",
    description="API para el manejo de indicadores de balanza",
    version="1.0.0",
)

@app.get("/")
async def root():
    return {"message": "Bienvenido a la API Indicadores Balanzas"}

@app.get("/db")
async def get_balance():
    return get_daily_logs()

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=9999, reload=True)