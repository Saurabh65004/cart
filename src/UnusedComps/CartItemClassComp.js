import React from 'react';
import './index.css';

class CartItem extends React.Component{


    render(){
    //{this.state.title} either we use this.state. syntax or object destructuring.
    //const {title, price, qty} = this.state; 
    //this.state.qty=this.props.qty;
    const {product, increaseQuantity, decreaseQuantity, deleteProduct} = this.props;
    const {title, price, qty, img} = product
    
    console.log("this.props", this.props)
    console.log("render")
     return <div className="cart-item">
            <div className="left-block">
                <img style={styles.image}/>
            </div>
            <div className="right-block">
                <div style={ {fontSize: 25} }>{title}</div>
                <div style={ {color: '#777'} }>Rs {price}</div>
                <div style={ {color: '#777'} }>Qty: {qty}</div>

                <div className="cart-item-actions">
                    <img 
                        alt="increase" 
                        onClick={()=>increaseQuantity(product)}
                        //onClick={()=>this.props.increaseQuantity(product)}
                        //onClick={this.increaseQuantity.bind(this)}
                        // onClick={this.increaseQuantity}
                        className="action-icons" 
                        src="https://image.flaticon.com/icons/png/128/1828/1828926.png"
                    />
                    <img 
                        alt="decrease" 
                        onClick={()=>decreaseQuantity(product)}
                        //onClick={this.decreaseQuantity}
                        className="action-icons" 
                        src="https://image.flaticon.com/icons/png/128/992/992683.png"
                    />
                    <img 
                        alt="delete"
                        onClick= {()=>deleteProduct(product.id)}
                        className="action-icons" 
                        src="https://img-premium.flaticon.com/png/128/484/premium/484662.png?token=exp=1628928288~hmac=e49d91bf02d87f64c2ffd9e424e7d46f"
                    /> 
                </div>
            </div>
            
        </div>
    }

};

const styles={
    image:{
        height: 110,
        width: 110,
        borderRadius:4,
        background: '#ccc',
    }
};

export default CartItemClassComp;


// { {} } means object inside jsx
// two ways to bind: 
/*
  1]  {this.increaseQuantity.bind(this)} in event Listener
    this.increaseQuantity=this.increaseQuantity.bind(this) in constructor

  2] Arrow Functions - Whereever we use arrow functions
   arrow functions will automatically bind the value of this to the instance of this class.


   If we'll call setState() inside render function it will give a stack overflow error, as 
   call to setState invokes render(), and it would get to an infinite loop.


    handleClick=()=>{
        this.setState({number:2},()=>{
            console.log(this.state.number)
        });

        
        this.setState({number:3},()=>{
            console.log(this.state.number)
        });

        output: 3 3
    }

    this is because when setState is called multiple times it is batched together and re-render happens only once.
    And the callback of both setState will fire after re-render.

    prop is an object with all the properties transfered from parent components.
*/

/*

    constructor(){
        super();
    //     this.state={
    //         title: "Mobile Phone",
    //         price: 99   ,
    //         qty: 2,
    //         img: '',
    //     };
       this.testing();
//        this.increaseQuantity=this.increaseQuantity.bind(this);
    }

    // increaseQuantity(){
    //     console.log(this.state);
    // }

//   increaseQuantity=()=>{
//         this.state.qty+=1;
//         console.log(this.state);
//     }

    // our value of property quantity in state object is changing, but no UI change as React doesn't know that value has been changed.
    //thus react doesn't refresh or re-render the component.
    //For this purpose react has provided us with setState() function.

    testing(){
        const promise=new Promise((resolve, reject)=>{
             setTimeout(()=>{
                resolve('done')
             }, 5000)
        });
/*
        promise.then(()=>{
            this.setState({qty: this.state.qty+10});

            this.setState({qty: this.state.qty+10});
            
            this.setState({qty: this.state.qty+10});

            console.log('state', this.state);
          
          
            //Inside a promise setState acts as a synchronous call and console.log() will execute when all three setState() occured.
            //Concept of batching is holds true in case of every event handler.
            //But in some cases like if we are making AJAX calls or using promises, inside of those react won't undergo batching, and setState() calls will run as synchoronous calls
            // and our component will re-render every time setState() is called inside them.
            // React Won't be Asynchronous and won't undergo batching if calls are made inside promises Ajax or other asynchronous calls.
            //This is a flaw of react and will be fixed in future functions.
        })

    }

    increaseQuantity=()=>{
        //SetState has 2 forms:
        //    1]
        this.setState({
            qty:this.state.qty+1
        },()=>{
            console.log("this.state", this.state)
        });  //pass object as a parameter.
    
        // this.setState({
        //         qty:this.state.qty+2
        //     });
            
        // this.setState({
        //     qty:this.state.qty+1
        // });
        
        // this.setState({
        //     qty:this.state.qty+1
        // });  
        // this.setState({
        //     qty:this.state.qty+3
        // });  //pass object as a parameter.
        /*
        Batching- In an event handler no matter how many times you call set state react will merge these call in 
        single setstate call and that is why our component is rendered once. 
        This is done by react for efficiency so that we don't have to re-render 5-6 times.
        It will merge all calls shallowly, meaning it will take the last call and take the last object 
        we are passing and change the state.
        
        setState() calls in a any event handler is asynchronous and undergoes batching and shallow merging.
        //2]
        
        // this.setState((prevState)=>{
        //     return {qty: prevState.qty+1};
        // })
        
        // this.setState((prevState)=>{
        //     return {qty: prevState.qty+1};
        // })
        
        // either we simply pass an object as parameter, or in second form we use a callback function which provides us with prevState
        // and we do neccessary changes and return the object
        // when you  simply want to change the value use first form, if you want to use prevState to perform certain operations and change then use second form.
        //Both forms use Shallow Merging, means if it wants to change qty it will simply go and change the value of qty in state object and rerender, 
        // but won't touch other properties such as title, price etc.
        
        //In second form, if we call multiple setstate calls of form2 then react will add all the callbacks to the queue.
        //And since then those will be exceuted in fifo. and if we change a state it will be update and react updates it, and since we ask for prevState in next function
        // we will receive a updated value, which will further change it, still React undergoes shallow merging and batching in this case too, as our component will only be rendered once.
        

        // Setstate calls are asynchronous so if we want to perfom certain operation as soon as state gets updated, setState({},()=>{}) function has a second parameter
        //where we can pass a callback function to do something as soon as state gets updated. This is available in both the forms.


    }

    decreaseQuantity=()=>{
        const {qty}= this.state.qty;
        if(qty<=0){
            return;
        }

        this.setState((prevState)=>{
            return {qty : prevState.qty-1}
        })
    }



        */
