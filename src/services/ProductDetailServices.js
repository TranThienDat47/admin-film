import axios from 'axios';

import { apiUrl } from '~/config/constants';

class ProductDetailServices {
   async get({ product_id }) {
      try {
         const response = await axios.get(`${apiUrl}/product_details/${product_id}`);
         return response.data;
      } catch (error) {
         return { success: false, message: error.message };
      }
   }
}

export default new ProductDetailServices();
