import type { IProduct } from './product'

export interface ICartItem {
  item: IProduct
  quantity: number
}
