import { callApi } from '../helpers/apiHelper';

class FighterService {
  async getFighters() { // получаем массив fighters
      try {
        const endpoint = 'fighters.json';
        const apiResult = await callApi(endpoint, 'GET');

        return JSON.parse(atob(apiResult.content));
      } catch (error) {
          throw error;
      }
  }

  async getFighterDetails(_id) {
      try {
          const endpoint = `details/fighter/${_id}.json`;
          const apiResult = await callApi(endpoint, 'GET');

          return JSON.parse(atob(apiResult.content));
      } catch (error) {
          throw error;
      }
    // implement this method
    // endpoint - `details/fighter/${_id}.json`;

  }
}

export const fighterService = new FighterService();
