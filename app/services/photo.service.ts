import { http } from './http.service';

import type { TResponse } from './types';

export function Send(photos: FormData): Promise<TResponse> {
  return http.post(`/take`, photos).then(res => {
    return res.data
  }).catch(({ response }) => {
    return response.data;
  });
}