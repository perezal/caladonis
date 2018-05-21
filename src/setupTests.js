const localStorageMock = (function() {
  let store = {}
  return {
    getItem: function(key) {
      return store[key] || null
    },
    setItem: function(key, value) {
      store[key] = value.toString()
    },
    removeItem: function(key) {
      delete store[key]
    },
    clear: function() {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// temporary mock to test render App.js
const fetchMock = function() {
  return new Promise((resolve, reject) => {

  })
}

Object.defineProperty(window, 'fetch', {
  value: fetchMock,
})