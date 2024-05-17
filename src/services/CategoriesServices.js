import axios from 'axios';

import { apiUrl } from '~/config/constants';

class CategoriesServices {
   async get() {
      try {
         const response = await axios.get(`${apiUrl}/categories`);
         return response.data;
      } catch (error) {
         return { success: false, message: error.message };
      }
   }
}

export default new CategoriesServices();
