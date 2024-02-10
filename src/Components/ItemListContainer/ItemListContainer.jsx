import { useState, useEffect } from "react"
//import { getProducts , getProductByCategory} from "../../asyncMock"
import ItemList from "../ItemList/ItemList"
import { useParams } from "react-router-dom"
import { useNotification } from "../notification/NotificationService"
import { db } from "../../Services/Firebase/FirebaseConfig"
import { getDocs, collection, query, where } from "firebase/firestore" 


const ItemListContainer = ({ greeting}) => {
    const [products, setProducts] = useState([])

    const { categoryId } = useParams()

    const { showNotification } = useNotification()

    useEffect(() => {
        if(categoryId) document.title = 'Ecommerce: ' + categoryId 
        return () => {
            document.title = 'Ecommerce'
        }
    })

    useEffect(() => {
        setProducts(true)

        const productsCollection = categoryId
        ? query(collection(db, 'products'), where('category','==', categoryId))
        : collection(db, 'products')

        getDoc(productsCollection)
            .then(querySnapshot => {
                const productAdapted = querySnapshot.docs.map(doc=> {
                    const fields = doc.data()
                    return {id: doc.id, ...fields}
                })
                    setProducts(productsAdapted)
                })
                .catch(error => {
                    showNotification('error', 'hubo un error')
                })
                .finally(() => {
                    setProducts(false)
                })
/*(asyncmock)        const asyncFunction = categoryId ? getProductByCategory : getProducts
    
        asyncFunction(categoryId)
            .then(response => {
                setProducts(response)
            })*/
    }, [categoryId])
    console.log(products)

    return (
        <>
            <h1>{greeting}</h1>
            <ItemList products={products}/>
        </>
    )
}

export default ItemListContainer