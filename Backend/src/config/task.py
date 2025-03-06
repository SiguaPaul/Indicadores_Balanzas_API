from services.indicators import get_indicator_bal1_vs_bal1ab

def get_indicator_bal1_vs_bal1ab_task():
    try:
        print("Ejecutando tarea para obtener indicador Bal1 vs Bal1AB...")
        result = get_indicator_bal1_vs_bal1ab()
        print("Tarea ejecutada con éxito.")
        return result
    except Exception as e:
        print(f"Error al ejecutar la tarea: {e}")
        return None