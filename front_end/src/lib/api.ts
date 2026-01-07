const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface MemoryItem {
  text: string;
  source: string;
  metadata?: string;
}

export const api = {
  memory: {
    add: async (text: string, source: string = 'frontend', metadata: object = {}) => {
      try {
        const response = await fetch(`${API_BASE_URL}/v1/memory/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text,
            source,
            metadata: JSON.stringify(metadata),
          }),
        });
        if (!response.ok) throw new Error('Failed to save memory');
        return await response.json();
      } catch (error) {
        console.error('Error adding memory:', error);
        return null;
      }
    },

    search: async (query: string) => {
      try {
        const response = await fetch(`${API_BASE_URL}/v1/memory/search?query=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Failed to search memory');
        return await response.json();
      } catch (error) {
        console.error('Error searching memory:', error);
        return [];
      }
    }
  }
};
