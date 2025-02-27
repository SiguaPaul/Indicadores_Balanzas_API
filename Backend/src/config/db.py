import pyodbc
import os
from dotenv import load_dotenv

load_dotenv()

# Variable global para almacenar la conexión
DB_CONN = None

def db_conn():
    global DB_CONN
    if DB_CONN is not None:  # Si ya existe una conexión activa, la reutilizamos
        # print("Usando la conexión existente.")
        return DB_CONN

    try:
        # Establecer una nueva conexión si no existe una activa
        DB_CONN = pyodbc.connect(
            r'DRIVER={ODBC Driver 17 for SQL Server};'
            f'SERVER={os.getenv("DB_SERVER")};'
            f'DATABASE={os.getenv("DB_NAME")};'
            f'UID={os.getenv("DB_USERNAME")};'
            f'PWD={os.getenv("DB_PASSWORD")};'
        )
        print("Conexión con la base de datos establecida")
        return DB_CONN
    except Exception as e:
        print(f'Error al conectar con la base de datos: {e}')
        return None  # Retornar None si hay un error al conectar

def db_conn_endpoint_test():
    conn = db_conn()
    message_conn = f'Coneccion correcta {conn.cursor().getTypeInfo()}'
    print(message_conn)
    conn.close()
    return message_conn

def execute_select_query(query: str, tuple: tuple):
    try:
        conn = db_conn()
        cursor = conn.cursor()
        cursor.execute(query, tuple)
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return rows
    except Exception as e:
        print(f'Error al ejecutar la consulta: {e}')
        return None
    
def execute_insert_query(query: str):
    try:
        conn = db_conn()
        cursor = conn.cursor()
        cursor.execute(query)
        conn.commit()
        cursor.close()
        conn.close()
        return 'Query ejecutada con éxito'
    except Exception as e:
        print(f'Error al ejecutar la consulta: {e}')
        return None

    
# Test de obtencion de datos desde SQL Server
indicator_querys = [
    """SELECT COUNT(*) FROM Peso;""",
]