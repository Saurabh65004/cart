import React from 'react';
import CartItem from './CartItem';

const Cart =(props)=>{    

    const {products, handleIncreaseQuantity, handleDecreaseQuantity, deleteProduct}=props

    return <div className="cart">
            {
                products.map((product)=>{
                return  <CartItem product={product} 
                    increaseQuantity={handleIncreaseQuantity} 
                    decreaseQuantity={handleDecreaseQuantity} 
                    deleteProduct={deleteProduct} key={product.id}/>
                })
            }
        </div>
}


export default Cart;

