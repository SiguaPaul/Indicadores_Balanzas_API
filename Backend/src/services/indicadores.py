from src.config.db import execute_select_query, indicator_querys

def get_daily_logs():
    return execute_select_query(indicator_querys[0])