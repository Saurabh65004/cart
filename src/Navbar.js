import React from 'react';


//functional component;

const Navbar=(props)=>{
    const {count}=props;
    return <div style={styles.nav}>
           
            <div style={styles.cartIconContainer}>
                <img 
                style={styles.cartIcon}
                src="https://image.flaticon.com/icons/png/512/3144/3144456.png"
                alt="cart" 
                />
                <span style={styles.cartCount}>{count}</span>           
            </div>
        </div>
}

const styles={
    cartIcon:{
        height: 32,
        marginRight: 20 
    },
    nav:{
        height: 70,
        background: '#4267b2',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    cartCount:{
        background: 'yellow',
        borderRadius: '50%',
        padding: '4px 8px',
        position: 'absolute',
        right: 0,
        top: -9,
    },
    cartIconContainer:{
        position:'relative',
    },
    image:{
        height: 110,
        width: 110,
        borderRadius: 4,
        background: '#ccc'
    }
}

export default Navbar;
//props are passed by default in functional component.
/*
<span style={styles.cartCount}>{getProductCount()}</span>           
    When we pass function like this it will excute as compiler. and when passed as ()=>getProductCount(), executes when a event occurs.
*/