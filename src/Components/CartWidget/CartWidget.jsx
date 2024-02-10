import cart from './assets/cart.svg'
import { useContext } from 'react'
import { useCart } from '../../context/CartContext'

const CartWidget = () => {
    const { totalQuantity } = useCart()
    return (
        <div>
            <img src={cart}/>
            {totalQuantity}
        </div>
    )
}

export default CartWidget