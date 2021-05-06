import AppleBasket from './components/AppleBasket/AppleBasket'
import { AppleStore, AppleStoreProvider } from './stores/AppleStore/AppleStore'

const appleStore = new AppleStore()

function App() {
  return (
    <AppleStoreProvider store={appleStore}>
      <AppleBasket/>
    </AppleStoreProvider>
  )
}

export default App
