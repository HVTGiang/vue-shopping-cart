import type { IGetAllProductRequest } from '@/core/interfaces/requests/product.request'
import api from './axios.service'
import type { AxiosError } from 'axios'
import type { IProduct } from '@/core/interfaces/models/product'
import products from '@/core/helper/api/endpoints/products'
export const getAllProduct = async (request?: IGetAllProductRequest) => {
  try {
    let url = products.getAll

    if (request) {
      const { limit, sort } = request
      if (limit && sort) url = `${url}?limit=${limit}&sort=${sort}`
      else if (sort) url = `${url}?sort=${sort}`
      else if (limit) url = `${url}?limit=${limit}`
    }

    const res = await api.get<IProduct[]>(url)

    if (res) {
      return res as unknown as IProduct[]
    }
  } catch (err) {
    // custom message here
    throw new Error((err as AxiosError).message)
  }
}

export const getProductById = async (id: string) => {
  try {
    const res = await api.get<IProduct>(products.getById(id))

    if (res) {
      return res as unknown as IProduct
    }
  } catch (err) {
    // custom message here
    throw new Error((err as AxiosError).message)
  }
}
