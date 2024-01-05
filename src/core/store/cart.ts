import { defineStore } from 'pinia'
import type { ICartItem } from '../interfaces/models/cart'
import type { IProduct } from '../interfaces/models/product'
import { CART_LOCAL_KEY } from '../constants/app'
import localStorageHandle from '../helper/localHandler'

interface IState {
  listItems: ICartItem[]
}

export const useCart = defineStore('cart', {
  state: (): IState => {
    return {
      listItems: localStorageHandle('get', CART_LOCAL_KEY) || []
    }
  },
  getters: {},
  actions: {
    addToCart(product: IProduct, quantity: number) {
      const item = this.listItems.find((item: ICartItem) => item.item.id === product.id)
      if (item) {
        if (quantity > 0) {
          item.quantity += quantity
        } else if (quantity + item.quantity > 0) {
          item.quantity += quantity
        } else {
          this.listItems = this.listItems.filter((item: ICartItem) => item.item.id !== product.id)
        }
      } else {
        if (quantity > 0)
          this.listItems.push({
            item: product,
            quantity
          })
      }
      this.persistCart()
    },
    deleteItem(product: IProduct) {
      this.listItems = this.listItems.filter((item: ICartItem) => item.item.id !== product.id)
      this.persistCart()
    },
    persistCart() {
      localStorageHandle('set', CART_LOCAL_KEY, this.listItems)
    }
  }
})
