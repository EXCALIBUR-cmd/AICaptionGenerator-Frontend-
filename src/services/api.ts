import axios from 'axios';

// Use the correct backend URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

console.log('API URL:', API_URL);

export const uploadImage = async (imageFile: File) => {
  try {
    console.log("Uploading image to:", `${API_URL}/predict`);
    
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const response = await axios.post(`${API_URL}/predict`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    console.log("Response from backend:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    
    if (axios.isAxiosError(error)) {
      console.error("Error status:", error.response?.status);
      console.error("Error data:", error.response?.data);
      console.error("Error message:", error.message);
    }
    
    throw error;
  }
};