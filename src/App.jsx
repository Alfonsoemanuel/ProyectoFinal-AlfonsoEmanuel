import NavBar from './Components/NavBar/NavBar'
import { BrowserRouter, Routes , Route} from 'react-router-dom'
import ItemListContainer from './Components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './Components/ItemDetailContainer/ItemDetailContainer'
import { CartProvider } from './context/CartContext'
import { NotificationProvider } from './Components/notification/NotificationService'
function App() {

  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <NotificationProvider>
    <CartProvider>
      <Routes>
        <Route path='/' element={<ItemListContainer greeting={'Listado de todos los productos'}/>} />
        <Route path='/category/:categoryId' element={<ItemListContainer greeting={'Listado de los productos filtrados'}/>} />
        <Route path='/detail/:id' element={<ItemDetailContainer/>} />
        <Route path='/*' element={<h2>No existe sitio</h2>} />
      </Routes>
      </CartProvider>
      </NotificationProvider>
    </BrowserRouter>
    </>
  )
}

export default App
