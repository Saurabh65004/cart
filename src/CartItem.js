import React from 'react';
import './index.css';

const CartItem=(props)=>{
    const {product, increaseQuantity, decreaseQuantity, deleteProduct}=props;
    const {img, title, price, qty}=product;


    return <div className="cart-item">
        <div className="left-block">
            <img src={img} style={styles.image} alt="product-Image"/>
        </div>
        <div className="right-block">
            <div style={ {fontSize: 25} }>{title}</div>
            <div style={ {color: '#777'} }>Rs {price}</div>
            <div style={ {color: '#777'} }>Qty: {qty}</div>

            <div className="cart-item-actions">
                <img 
                    alt="increase" 
                    onClick={()=>increaseQuantity(product)}
                    className="action-icons" 
                    src="https://image.flaticon.com/icons/png/128/1828/1828926.png"
                />
                <img 
                    alt="decrease" 
                    onClick={()=>decreaseQuantity(product)}
                    className="action-icons" 
                    src="https://image.flaticon.com/icons/png/128/992/992683.png"
                />
                <img 
                    alt="delete"
                    onClick= {()=>deleteProduct(product.id)}
                    className="action-icons" 
                    src="https://image.flaticon.com/icons/png/128/812/812853.png"
                /> 
            </div>
        </div>
            
        </div>
}

const styles={
    image:{
        height: 110,
        width: 110,
        borderRadius:4,
        background: '#ccc',
    }
};

export default CartItem;