import { Example } from '../lib/Example';
import request from './request';

export default {
  async getAll() {
    return request.get<Example[]>('examples');
  },
};
