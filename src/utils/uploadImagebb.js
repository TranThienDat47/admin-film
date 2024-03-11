import axios from 'axios';

const apiKey = process.env.REACT_APP_KEY_UPLOAD_IMAGEBB;

const blobToBuffer = (blob) => {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
   });
};

const uploadImage = async (blobImageUrl = '') => {
   try {
      const response = await fetch(blobImageUrl);
      const blob = await response.blob();
      const buffer = await blobToBuffer(blob);

      const formData = new FormData();
      formData.append('key', apiKey);
      formData.append('image', new Blob([buffer]));

      const imgBBResponse = await axios.post('https://api.imgbb.com/1/upload', formData);

      return { success: true, data: imgBBResponse.data.data };
   } catch (error) {
      console.error('Error uploading image:', error.message);
      return { success: false, error: error.message };
   }
};

export default uploadImage;
