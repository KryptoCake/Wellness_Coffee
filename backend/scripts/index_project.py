import sys
import os
import glob

# Ensure backend modules can be imported
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from app.services.dev_context_service import dev_context_service

# Configuracion de carpetas a ignorar y extensiones a leer
IGNORE_DIRS = {'node_modules', '.git', '__pycache__', 'venv', '.venv', '.next', 'lancedb', 'project_context_db', 'dist', 'build'}
EXTENSIONS = {'.py', '.ts', '.tsx', '.md', '.json', '.sql'}

def should_ignore(path):
    parts = path.split(os.sep)
    return any(part in IGNORE_DIRS for part in parts)

def index_project():
    root_dir = os.getcwd()
    print(f"Starting Project Indexing from: {root_dir}")
    
    # 1. Limpiar DB anterior (Opcional: podrías querer hacer upsert, pero limpiar asegura frescura)
    dev_context_service.clear_database()
    
    count = 0
    
    for root, dirs, files in os.walk(root_dir):
        # Filtrar directorios in-place
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        
        if should_ignore(root):
            continue

        for file in files:
            file_path = os.path.join(root, file)
            _, ext = os.path.splitext(file)
            
            if ext in EXTENSIONS:
                if should_ignore(file_path): continue
                
                try:
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                        
                    # Skip empty or very small files
                    if len(content) < 50: continue
                    
                    # Determine type
                    doc_type = "documentation" if ext == ".md" else "code"
                    
                    # Relative path for cleaner storage
                    rel_path = os.path.relpath(file_path, root_dir)
                    
                    # Chunking simple (si el archivo es muy grande, tomar los primeros 8000 caracteres para el MVP)
                    # TODO: Mejorar chunking inteligente
                    chunks = [content[i:i+8000] for i in range(0, len(content), 8000)]
                    
                    for chunk in chunks:
                        print(f"Indexing: {rel_path}...")
                        success = dev_context_service.add_context(chunk, rel_path, doc_type)
                        if success:
                            count += 1
                        else:
                            print(f"Failed to index: {rel_path}")
                            
                except Exception as e:
                    print(f"Could not read {file_path}: {e}")

    print(f"Indexing Complete. {count} fragments stored in Project Brain.")

if __name__ == "__main__":
    index_project()