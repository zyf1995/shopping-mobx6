import '../../styles/appleBasket.scss'
import { observer } from "mobx-react-lite"
import AppleItem from '../AppleItem/AppleItem'
import { useAppleStore } from '../../stores/AppleStore/AppleStore'

function AppleBasket () {
  const appleStore = useAppleStore()
  let {
    appleNow: { quantity:notEatenQuantity, weight:notEatenWeight },
    appleEaten: { quantity:EatenQuantity, weight:EatenWeight}
  } = appleStore.status
  const getAppleItem = () => {
    let data = []
    appleStore.apples.forEach(apple => {
      if (!apple.isEaten) {
        data.push(
          <AppleItem
            eatApple={appleStore.eatApple}
            apple={apple}
            key={apple.id}
          />
        )
      }
    })
    if (!data.length) return <div>苹果篮子空空如也</div>
    return data
  }
  return (
    <div className="appleBusket">
        <div className="title">苹果篮子</div>
        <div className="stats">
            <div className="section">
                <div className="head">当前</div>
                <div className="content">{notEatenQuantity}个苹果，{notEatenWeight}克
                </div>
            </div>
            <div className="section">
                <div className="head">已吃掉</div>
                <div className="content">{EatenQuantity}个苹果，{EatenWeight}克</div>
            </div>
        </div>

        <div className="appleList">
          { getAppleItem() }
        </div>

        <div className="btn-div">
            <button className={appleStore.isPicking ? 'disabled' : ''}  onClick={() => appleStore.pickApple() }>{appleStore.buttonText}</button>
        </div>
    </div>
  )
}

export default observer(AppleBasket)