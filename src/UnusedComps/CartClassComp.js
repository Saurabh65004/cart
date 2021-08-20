import React from 'react';
import CartItem from './CartItem';

class Cart extends React.Component{
    
    constructor(){
        super();
        this.state={
          products :[
            {
                title: "Mobile",
                price: 99   ,
                qty: 2,
                img: '',
                id:1,
            },
            {
                title: "Watch",
                price: 99   ,
                qty: 2,
                img: '',
                id:2,
            },
            {
                title: "Laptop",
                price: 199   ,
                qty: 1,
                img: '',
                id:3,
            },
          ],
        };
    }

    handleIncreaseQuantity=(product)=>{
        //console.log("Increase Quantity",product);
        const {products}=this.state;
        const index=products.indexOf(product);
        
        products[index].qty+=1;
        this.setState({
            products
            //or products: products
        })
    }

    handleDecreaseQuantity=(product)=>{
        const {products}= this.state;
        const index=products.indexOf(product);
        if(products[index].qty <= 0){
            return;
        }
        products[index].qty-=1;
        this.setState({
            products
        })
    }

    deleteProduct=(id)=>{
        const {products}=this.state;
        const items=products.filter((product)=>product.id !== id);
        
        this.setState({
            products:items
        })
    }

render(){
   // const arr=[1,2,3,4,5];
    const {products}=this.state

    return <div className="cart">
            {
                products.map((product)=>{
                    return <CartItem product={product} increaseQuantity={this.handleIncreaseQuantity} decreaseQuantity={this.handleDecreaseQuantity} deleteProduct={this.deleteProduct} key={product.id}/>
                })
            }
            
            { /*arr*/ }            
            {/*<CartItem qty={2} title={"Mobile"} price={10} comp={<CartItem />} jsx={<h1>Test  </h1>} func={()=>console.log("sdsd")} isLoggedIn={false}/>
             */
            }            
            {/* <CartItem />
            <CartItem />
            <CartItem /> */}
        </div>
    }
}

export default Cart;

/*
props in react cannot be change in the component.
props can be used to pass properties, functions, jsx, components etc. 

Cart should modify cartItem's state and cartItem should not modify cart's state.
Raise an event from a child.



Lets say we pass arguments, and make a change in one of them and react do not 
know which component to change therefore we pass key to child components, so that it changes only that particular component
key is not a prop but it is internally used by react
for faster access and improve effieciency.

We will handle the items from cart.

this.increaseQuantity - passing the reference of this function as props to components
()=>this.props.increaseQuantity() calling the function, when a event happens.


*/