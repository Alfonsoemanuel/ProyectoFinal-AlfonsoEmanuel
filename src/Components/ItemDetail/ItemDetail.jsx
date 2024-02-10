import { useState } from "react";
import { Link } from "react-router-dom";
import { useNotification } from "../notification/NotificationService";
import ItemCount from '../ItemCount/ItemCount'
import { useCart } from '../../context/CartContext' 

const ItemDetail = ({id, name, img, category, description, price, stock}) => {
    const [quantityAdded, setQuantityAdded] = useState(0)
    const {addItem} = useCart()
    const {showNotification} = useNotification()

    const handleOnAdd = (quantity) => {
        const objProductToAdd = {
            id, name, price, quantity
        }
        addItem(objProductToAdd)
        showNotification('info' , `se agregaron corrctamente ${quantity} ${name}`)
        setQuantityAdded(quantity)
    }

    return (
        <article className="CardItem">
            <header className="Header">
                <h2 className="ItemHeader"></h2>
                    {name}
                    </header>
                    <picture>
                        <img src={img} alt={name} className="ItemImg"/>
                    </picture>
                    <section>
                        <p className="Info">
                            Categoria: {category}
                        </p>
                        <p className="Info">
                            Descripción: {description}
                        </p>
                        <p className="Info">
                            Precio: ${price}
                        </p>
                    </section>
                    <footer className="ItemFooter">
                        {
                            quantityAdded > 0 ? (
                                <Link to='/cart' className='Option'>Terminar compra</Link>
                            ) : (
                                <ItemCount initial={1} stock={stock} onAdd={handleOnAdd}/>
                            )
                        }
                    </footer>
                </article>
    )
}

export default ItemDetail