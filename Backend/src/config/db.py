import pyodbc
import os
from dotenv import load_dotenv

load_dotenv()

# Diccionario global para almacenar conexiones a la base de datos
DB_CONNECTIONS = {}

# Diccionario de configuraciones para múltiples bases de datos
DB_CONFIG = {
    1: {"name": "Balanzas"},
    # 2: {"name": "AsistenciasStar"},
}

def get_db_connection(db_id):
    global DB_CONNECTIONS

    conn = DB_CONNECTIONS.get(db_id)
    if conn is not None:
        # Verificamos que la conexión sigue activa
        try:
            with conn.cursor() as cursor:
                cursor.execute("SELECT 1")
            return conn
        except Exception:
            # La conexión está rota o inválida
            print(f"La conexión para DB {db_id} está rota. Reconectando...")
            DB_CONNECTIONS[db_id] = None

    # Si no había conexión o está rota, creamos una nueva
    try:
        if db_id not in DB_CONFIG:
            raise ValueError(f"ID de base de datos no reconocido: {db_id}")

        DB_CONNECTIONS[db_id] = pyodbc.connect(
            f"DRIVER={{ODBC Driver 17 for SQL Server}};"
            f"SERVER={os.getenv('DB_SERVER')};"
            f"DATABASE={DB_CONFIG[db_id]['name']};"
            f"UID={os.getenv('DB_USERNAME')};"
            f"PWD={os.getenv('DB_PASSWORD')};"
        )
        print(f"Conexión establecida con {DB_CONFIG[db_id]['name']}")
        return DB_CONNECTIONS[db_id]
    except Exception as e:
        print(f'Error al conectar con la base de datos {DB_CONFIG[db_id]["name"]}: {e}')
        return None

def db_conn_endpoint_test():
    conn = get_db_connection(1)
    message_conn = f'Coneccion correcta {conn.cursor().getTypeInfo()}'
    print(message_conn)
    conn.close()
    return message_conn

def execute_select_query(query: str):
    try:
        conn = get_db_connection(1)
        cursor = conn.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return rows
    except Exception as e:
        print(f'Error al ejecutar la consulta: {e}')
        return None
    
def execute_select_query_dictionary(query: str):
    try:
        conn = get_db_connection(1)
        cursor = conn.cursor()
        cursor.execute(query)
        # Obtener nombres de columnas
        columns = [column[0] for column in cursor.description]
        # Convertir cada fila a un diccionario
        rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
        cursor.close()
        conn.close()
        return rows
    except Exception as e:
        print(f'Error al ejecutar la consulta: {e}')
        return None

    
def execute_insert_query(query: str):
    try:
        conn = get_db_connection(1)
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