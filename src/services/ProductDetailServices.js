import axios from 'axios';

import { apiUrl } from '~/config/constants';

class ProductDetailServices {
   async get({ product_id }) {
      try {
         const response = await axios.get(`${apiUrl}/product_details/6603db4674ce368028f6974f`, { params: { _id: product_id } });
         return response.data;
      } catch (error) {
         return { success: false, message: error.message };
      }
   }
}

export default new ProductDetailServices();
