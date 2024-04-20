import axios from 'axios';

import { apiUrl } from '~/config/constants';

class ProductServices {
   async add(
      object = {
         _name: '',
         description: '',
         anotherName: '',
         _status: '',
         img: '',
         episodes: '',
         view: 0,
         releaseDate: '',
         news: true,
         reacts: 0,
         categories: [],
         country_Of_Origin: '',
         background: '',
         keySearch: '',
      },
   ) {
      try {
         const response = await axios.post(`${apiUrl}/products`, object, {});

         return response.data;
      } catch (error) {
         return { success: false, message: error.message };
      }
   }

   async get(obj = { skip: 0, limit: null, key: '', recently: false }) {
      try {
         const response = await axios.get(`${apiUrl}/products/search`, { params: obj });
         return response.data;
      } catch (error) {
         return { success: false, message: error.message };
      }
   }

   // async convert_video(formData = {}) {
   //    function Decodeuint8arr(uint8array) {
   //       return new TextDecoder('utf-8').decode(uint8array);
   //    }
   //    try {
   //       const response = await fetch(`${apiUrl}/video/convert`, {
   //          method: 'POST',
   //          body: formData,
   //       });

   //       const reader = response.body.getReader();
   //       while (true) {
   //          const { value, done } = await reader.read();
   //          if (done) break;
   //          console.log(`Received: "${Decodeuint8arr(value)}"`);
   //       }
   //       return response.data;
   //    } catch (error) {
   //       return { success: false, message: error.message };
   //    }
   // }
}

export default new ProductServices();
