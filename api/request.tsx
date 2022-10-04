import axios from 'axios';
import { Response } from '../lib/Response';

interface Args {
  path: string;
  method: 'get' | 'post' | 'patch' | 'delete';
  data?: unknown;
}

const baseRequest = async <T,>({ method, path, data }: Args) => {
  const result = await axios.request<Response<T>>({
    url: `/api/${path}`,
    method,
    data,
  });
  if (result.data.status === 'success') return result.data.value;

  throw new Error('Something went wrong');
};

export default {
  get: async <T,>(path: string) =>
    baseRequest<T>({
      method: 'get',
      path,
    }),

  post: async <T,>(path: string, data: unknown) =>
    baseRequest<T>({
      method: 'post',
      path,
      data,
    }),
};
