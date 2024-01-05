import type { ISignInRequest } from '@/core/interfaces/requests/auth.request'
import api from './axios.service'
import type { ISignInResponse } from '@/core/interfaces/responses/auth.response'
import auth from '@/core/helper/api/endpoints/auth'
import type { AxiosError } from 'axios'

export const signin = async (body: ISignInRequest) => {
  try {
    const res = await api.post<ISignInResponse>(auth.signIn, body)
    console.log(res)

    if (res) return res as unknown as { token: string }
  } catch (err) {
    throw new Error((err as AxiosError).message)
  }
}
