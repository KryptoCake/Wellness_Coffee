import lancedb
import os
import sys

# Ajustar path para importar app
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

def inspect_memory(limit=10):
    db_path = os.path.join(os.getcwd(), "backend", "data", "lancedb")
    
    if not os.path.exists(db_path):
        print(f"No database found at {db_path}")
        return

    try:
        db = lancedb.connect(db_path)
        table_name = "memories"

        if table_name not in db.table_names():
            print(f"Table '{table_name}' does not exist yet.")
            return

        table = db.open_table(table_name)
        # Obtenemos los últimos items
        df = table.to_pandas()
        
        print(f"--- Total Memories: {len(df)} ---")
        print(f"--- Showing last {limit} entries ---")
        
        # Mostrar columnas relevantes (ocultando el vector gigante)
        subset = df[['id', 'text', 'source', 'metadata', 'timestamp']].tail(limit)
        print(subset.to_markdown(index=False))

    except Exception as e:
        print(f"Error reading LanceDB: {e}")

if __name__ == "__main__":
    inspect_memory()
