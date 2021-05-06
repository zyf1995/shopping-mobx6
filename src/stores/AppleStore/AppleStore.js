import { makeAutoObservable } from 'mobx'
import { createContext, useContext } from 'react'

class AppleStore {
  apples = [
    {
        id: 0,
        weight: 233,
        isEaten: false
    },
    {
        id: 1,
        weight: 235,
        isEaten: false
    },
    {
        id: 2,
        weight: 256,
        isEaten: false
    }
  ]
  newAppleId = 3
  isPicking = false
  buttonText = '摘苹果'
  constructor () {
    makeAutoObservable(this)
  }
  pickApple () {
    if (this.isPicking) {
      return
    }
    this.isPicking = true
    this.buttonText = '正在采摘...'
    setTimeout(() => {
      let weight = Math.floor(200 + Math.random() * 50)
      this.isPicking = false
      this.buttonText = '摘苹果'
      this.apples.push({
          id: this.newAppleId++,
          weight: weight,
          isEaten: false
      })
    }, 1000) 
    // fetch('https://hacker-news.firebaseio.com/v0/jobstories.json')
    //   .then(res => {
    //       /** 备注这里的url只是测试用的，这个是之前hackernews的api, 这里只是确保接口是通的，至于数据还是自己mock */
    //       let weight = Math.floor(200 + Math.random() * 50)
    //       this.isPicking = false
    //       this.buttonText = '摘苹果'
    //       this.apples.push({
    //           id: this.newAppleId++,
    //           weight: weight,
    //           isEaten: false
    //       })
    //   })
  }
  eatApple = (appleId) => {
    let targetIndex = ''
    this.apples.forEach((apple,index)=>{
        if(apple.id === appleId){
            targetIndex = index
        }
    })
    this.apples[targetIndex].isEaten = true
  }
  get status () {
    let status = {
      appleNow: {
          quantity: 0,
          weight: 0
      },
      appleEaten: {
          quantity: 0,
          weight: 0
      }
    }
    this.apples.forEach(apple => {
      let selector = apple.isEaten ? 'appleEaten':'appleNow'
      status[selector].quantity ++
      status[selector].weight += apple.weight
    })
    return status
  }
}

const AppleStoreContext = createContext()

const AppleStoreProvider = ({ store, children }) => {
  return (
    <AppleStoreContext.Provider value={store}>
      {children}
    </AppleStoreContext.Provider>
  )
}

const useAppleStore = () => {
  return useContext(AppleStoreContext)
}

export {
  AppleStore,
  AppleStoreProvider,
  useAppleStore
}