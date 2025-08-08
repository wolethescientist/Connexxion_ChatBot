import { toast } from '@/hooks/use-toast';

// @ts-ignore
const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:8000';

interface User {
  id: string;
  username: string;
}

interface Chatbot {
  id: number;
  organization_name: string;
  chatbot_name: string;
  website_url?: string;
  created_at: string;
  owner_id: number;
}

interface ChatMessage {
  message: string;
}

interface ChatResponse {
  response: string;
}

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Helper function to handle API errors
const handleApiError = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.detail || 'An error occurred';
    toast({
      title: 'Error',
      description: errorMessage,
      variant: 'destructive',
    });
    throw new Error(errorMessage);
  }
  return response;
};

// Register a new user
export const registerUser = async (username: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  
  await handleApiError(response);
  return await response.json();
};

// Login user and get access token
export const loginUser = async (username: string, password: string) => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  
  const response = await fetch(`${API_BASE_URL}/token`, {
    method: 'POST',
    body: formData,
  });
  
  await handleApiError(response);
  return await response.json();
};

// Create a new chatbot
export const createChatbot = async (
  organization_name: string,
  chatbot_name: string,
  pdf_file?: File,
  website_url?: string
) => {
  const formData = new FormData();
  formData.append('organization_name', organization_name);
  formData.append('chatbot_name', chatbot_name);
  
  if (pdf_file) {
    formData.append('pdf_file', pdf_file);
  }
  
  if (website_url) {
    formData.append('website_url', website_url);
  }
  
  const response = await fetch(`${API_BASE_URL}/create_chatbot`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
    },
    body: formData,
  });
  
  await handleApiError(response);
  return await response.json();
};

// Get user's chatbots
export const getUserChatbots = async () => {
  const response = await fetch(`${API_BASE_URL}/chatbots`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });
  
  await handleApiError(response);
  return await response.json();
};

// Delete a chatbot
export const deleteChatbot = async (chatbotId: number) => {
  const response = await fetch(`${API_BASE_URL}/chatbots/${chatbotId}`, {
    method: 'DELETE',
    headers: {
      ...getAuthHeaders(),
    },
  });
  
  await handleApiError(response);
  return response.status === 204;
};

// Chat with a bot
export const chatWithBot = async (chatbotId: number, message: string) => {
  const response = await fetch(`${API_BASE_URL}/chat/${chatbotId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ message }),
  });
  
  await handleApiError(response);
  return await response.json();
};

// Public chat with a bot (for embedded chatbots)
export const publicChatWithBot = async (chatbotId: number, message: string) => {
  const response = await fetch(`${API_BASE_URL}/public/chat/${chatbotId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });
  
  await handleApiError(response);
  return await response.json();
};
