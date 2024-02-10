import { useState, useEffect } from "react"
//import { getProductById } from "../../asyncMock"
import { useParams } from "react-router-dom"
import ItemDetail from "../ItemDetail/ItemDetail"
import { useNotification } from "../notification/NotificationService"
import  { db } from "../../Services/Firebase/FirebaseConfig"
import { getDoc, doc } from "firebase/firestore"

const ItemDetailContainer = () => {
    const [product, setProduct] = useState({})

    const { id } = useParams()

    const {showNotification} =useNotification()

    useEffect(() => {
        if(product) document.title = product.name
        
        return () => {
            document.title = 'Ecommerce'
        }
    })

    useEffect(() => {
        setLoading(true)

        const productDocument = doc(db, 'products', productId)

        getDoc(productsDocument)
            .then(queryDocumentSnapshot => {
                const fields = queryDocumentSnapshot.data()
                const productAdapted = { id: QueryDocumentSnapshot.id, ...fields}
                    setProducts(productsAdapted)
                })
                .catch(error => {
                    showNotification('error', 'hubo un error')
                })
                .finally(() => {
                    setLoading(false)
                })
/*        getProductById(id)
            .then(response => {
                setProduct(response)
            })*/
    }, [id])

    if(!product) {
        return <h1>El producto no existe</h1>
    }
    return (
        <div>
            <h1>Detalle</h1>
            <h2>{product?.name}</h2>
            <a href="#">
            <img src={product?.img} alt=""/>
            </a>
            <h3>{product?.description}</h3>
            <h3>${product?.price}</h3>
            <button>Comprar</button>
        </div>
    )
}

export default ItemDetailContainer