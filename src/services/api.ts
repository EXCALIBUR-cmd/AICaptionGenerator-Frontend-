import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

console.log('🔗 API URL:', API_URL);

export const uploadImage = async (imageFile: File) => {
  try {
    const endpoint = `${API_URL}/predict`;
    console.log("📤 Uploading to:", endpoint);
    
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const response = await axios.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000
    });
    
    console.log("✅ Response:", response.data);
    
    // Validate response has caption
    if (!response.data.caption) {
      throw new Error('No caption in response');
    }
    
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Error uploading image:', error.message);
    } else {
      console.error('❌ Error uploading image:', String(error));
    }
    throw error;
  }
};