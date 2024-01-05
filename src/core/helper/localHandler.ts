const localStorageHandle = (type: 'get' | 'set' | 'remove', itemName: string, value?: any) => {
  switch (type) {
    case 'get': {
      const getItem = localStorage.getItem(itemName)
      return getItem ? JSON.parse(getItem) : null
    }
    case 'set':
      return localStorage.setItem(itemName, JSON.stringify(value))
    case 'remove':
      return localStorage.removeItem(itemName)
  }
}

export default localStorageHandle
