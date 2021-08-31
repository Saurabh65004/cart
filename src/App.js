import React from 'react';
import Navbar from './Navbar';
import Cart from './Cart';
import firebase from 'firebase';
import 'firebase/firestore'

class App extends React.Component{
  constructor(){
    super();
    this.state ={
      isLoading: true,
      products:[
      // {
      //     title: "Mobile",
      //     price: 12_000   ,
      //     qty: 2,
      //     img: '',
      //     img: "https://bit.ly/3xTxLHh",
      //     id:1,
      // },
      // {
      //     title: "Watch",
      //     price: 2_000   ,
      //     qty: 2,
      //     img: "https://bit.ly/3CShrKD",
      //     id:2,
      // },
      // {
      //     title: "Laptop",
      //     price: 45_000   ,
      //     qty: 1,
      //     img: 'https://bit.ly/37Wadqt',
      //     id:3,
      // },
    ],
  };
  this.db=firebase.firestore();
  }

  componentDidMount(){
    // firebase
    //   .firestore()
    //   .collection('products')         //returns a reference to that collection
    //   .get()                          //returns a promise with a query snapshot.
    //   .then((snapshot)=>{             //snapshot of that database at that particular time.
    //     console.log(snapshot);
    //     //snapshot.docs      //returns array of documents from the query snapshot.
    //     snapshot.docs.map((doc)=>{
    //       console.log(doc.data());                //retrieves all fields in the object as an object.
    //     });

    //     //we should change state as we receive our products
    //     const products=snapshot.docs.map((doc)=>{
    //       const data=doc.data();
    //       data['id']=doc.id; 
    //       //return doc.data();        //return data in each document as an object.
    //       return data;
    //     })

    //     this.setState({
    //       products,
    //       isLoading:false,
    //     })
    //   })  
    //as  we need to refresh to reflect changes, we will onSnapshot()   
    //function which will be tiggered whenever there is a change in our data in database, automatically.
    //onSnapshot():-Attaches a listener for QuerySnapshot events

    firebase
    .firestore()
    .collection('products')
    // .where('price','>', 2000)
    // .where('title', '==', 'Laptop')
    //.orderBy('price', 'desc')
    .onSnapshot((snapshot)=>{
      console.log(snapshot);

      snapshot.docs.map((doc)=>{
        console.log(doc.data());
      });

      const products=snapshot.docs.map((doc)=>{
        const data=doc.data();
        data['id']=doc.id;
        return data;
      });

      this.setState({
        products,
        isLoading:false,
      })

    })

    //To unsubscribe with your real time listener put it in compoenntWillUnmount().
  }

  handleIncreaseQuantity=(product)=>{
    //console.log("Increase Quantity",product);
      const {products}=this.state;   
      const index=products.indexOf(product);
      
      // products[index].qty+=1;
      // this.setState({
      //     products
      //     //or products: products
      // })

      //Updating in firebase, for that get the id of that document/product - documentReference
      //doc() - Get a DocumentReference for the document within the collection at the specified path. If no path is specified, an automatically-generated unique ID will be used for the returned DocumentReference.

      const docRef=this.db.collection("products").doc(products[index].id);
      //updating the reference
      console.log(docRef);      //using docRef we can update or delete document
      docRef.update(
        {qty: products[index].qty+1 ,}
      )
      .then(()=>{
        console.log("Updated Successfully. ");
      })
      .catch((err)=>{
        console.log("Error ",err);
      })

      //As we have a listener to listen to all changes, all updation in collection will automatically be reflected.

  }

  handleDecreaseQuantity=(product)=>{
      const {products}= this.state;
      const index=products.indexOf(product);
      // if(products[index].qty <= 0){
      //     return;
      // }
      // products[index].qty-=1;
      // this.setState({
      //     products
      // })
      if(product.qty <= 0){
          return;
      }

      const docRef=this.db.collection("products").doc(products[index].id);
      docRef.update(
        {qty : products[index].qty-1 ,}
      )
      .then(()=>{
        console.log("Updated Successfully");
      })
      .catch((err)=>{
        console.log("Error :",err);
      });

  }

  deleteProduct=(id)=>{
      const {products}=this.state;
      const items=products.filter((product)=>product.id !== id);
      
      // this.setState({
      //     products:items
      // });

      const docRef=this.db.collection("products")
      .doc(id).delete()
      .then(()=>{
        console.log("deleted successfully");
      })
      .catch((err)=>{
        console.log("Error :",err);
      })

  }
  
  getCartCount=()=>{
    const {products}=this.state;
    var count=0;
    products.forEach((product)=>{
      count+=product.qty;
    })
    return count;
  }

  getTotal=()=>{
    var total=0;
    const {products}=this.state;
    products.forEach((product)=>{
      total=total+product.qty*product.price;
      //total=total+Number.parseInt(product.qty)*Number.parseFloat(product.price);
    });
    return total;
  }

  getCartTotal=()=>{
    const total=this.getTotal();
    return " ₹ "+total;
  }

  addProduct=()=>{
    this.db
    .collection('products')         //to add new document in collection.
    .add(
      {
        title:"Camera",
        qty:1,
        price: 900,
        img:'https://bit.ly/3mhm2zW',
      })        //object containing data for new document. add() returns a promise with the reference of this object in firebase.
    .then((documentReference)=>{
      console.log('Product has been added ',documentReference);
    })
    .catch((err)=>{
      console.log("Error: ",err)
    })  

    //id will be generated automatically,
  }

  render(){
    const {products}=this.state;
    return (
      <div>
        {/*<Navbar getProductCount={this.getProductCount}/>*/}
        <Navbar count={this.getCartCount()}/>
        <button onClick={()=>this.addProduct()} style={{padding: 20, fontSize: 20}}>Add +</button>

        {this.state.isLoading ? <img src="https://i.pinimg.com/originals/71/3a/32/713a3272124cc57ba9e9fb7f59e9ab3b.gif" alt="Loading Products ... "/>
        :<Cart products={products} 
          handleIncreaseQuantity={this.handleIncreaseQuantity}
          handleDecreaseQuantity={this.handleDecreaseQuantity}
          deleteProduct={this.deleteProduct}
        />
      }
        <div style={{fontSize: 20, padding: 10,}}>Total: {this.getCartTotal()}{/*{this.getCartTotal()}*/}</div>
      </div>
    );
  }

}

export default App;


/*
If you want to share data between siblings you need to transfer the state to a common parent in which both are siblings.
*/
/*
<div >Total: {this.getProductCount()}</div>           
    When we pass function like this it will excute as compiler. and when passed as ()=>getProductCount(), executes when a event occurs.

    Two ways to read data from firebase:
    1] Fetch data once
    2] Attach a listener so that whenever something changes app gets replaced automatically.

*/