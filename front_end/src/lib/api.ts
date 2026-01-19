const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Helper to extract error message from potentially nested error objects
const getErrorMessage = (errorData: Record<string, unknown>, fallback: string): string => {
  if (typeof errorData.detail === 'string') return errorData.detail;
  if (typeof errorData.detail === 'object' && errorData.detail !== null) {
    const detail = errorData.detail as Record<string, unknown>;
    if (typeof detail.message === 'string') return detail.message;
  }
  if (typeof errorData.error === 'string') return errorData.error;
  if (typeof errorData.message === 'string') return errorData.message;
  return fallback;
};

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
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(getErrorMessage(errorData, 'Failed to save memory'));
        }
        return await response.json();
      } catch (error) {
        console.error('Error adding memory:', error);
        return null;
      }
    },

    search: async (query: string) => {
      try {
        const response = await fetch(`${API_BASE_URL}/v1/memory/search?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(getErrorMessage(errorData, 'Failed to search memory'));
        }
        return await response.json();
      } catch (error) {
        console.error('Error searching memory:', error);
        return [];
      }
    },
  },

  chat: {
    send: async (message: string, personality: string = 'ZEN', context: object = {}) => {
      try {
        // Normalize personality to match Backend Enums (uppercase)
        let backendPersonality = personality.toUpperCase();
        if (backendPersonality === 'STANDARD') {
            backendPersonality = 'ZEN';
        }

        const response = await fetch(`${API_BASE_URL}/v1/ai/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message,
            personality: backendPersonality,
            context
          }),
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const specificMessage = getErrorMessage(errorData, 'Unknown error');
          throw new Error(`Failed to send chat message (${response.status} ${response.statusText}): ${specificMessage}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error sending chat message:', error);
        return null;
      }
    }
  }
};