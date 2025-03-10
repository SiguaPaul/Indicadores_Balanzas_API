# Imagen base de Python
FROM python:3.12

# Definir carpeta de trabajo
WORKDIR /app

# Copiar e instalar dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código restante de la API
COPY . .

# Exponer el puerto de FastAPI
EXPOSE 9999

# Comando para iniciar FastAPI con Uvicorn
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
