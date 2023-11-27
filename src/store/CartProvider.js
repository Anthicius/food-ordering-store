import { useReducer } from "react";

import CartContext from "./cart-context";

const initialValue = {
    items: [],
    totalAmount:0
}

const reducer = (state, action) => {
    switch(action.type){
        case "ADD":
            let updatedTotalAmountAdd = state.totalAmount+action.item.price*action.item.amount;
            const existingCartItemIndexAdd = state.items.findIndex(item=> item.id === action.item.id);
            const existingCartItem = state.items[existingCartItemIndexAdd];
            let updatedItemAdd;
            let updatedItemsAdd;

            if(existingCartItem) {
                updatedItemAdd = {
                    ...existingCartItem,
                    amount:existingCartItem.amount + action.item.amount
                }
                updatedItemsAdd = [...state.items];
                updatedItemsAdd[existingCartItemIndexAdd] = updatedItemAdd
            } else {
                updatedItemAdd = {...action.item};
                updatedItemsAdd = state.items.concat(action.item)
            }
            return {
                items: updatedItemsAdd,
                totalAmount: updatedTotalAmountAdd
            }
            case "REMOVE":
                const existingCartItemIndexRemove = state.items.findIndex(item=> item.id === action.id);
                const existingItem = state.items[existingCartItemIndexRemove]
                const updatedTotalAmountRemove= state.totalAmount - existingItem.price
                let updatedItemsRemove;
                if(existingItem.amount === 1){
                    updatedItemsRemove = state.items.filter(item => item.id !== action.id);
                }
                else {
                    let updatedItemRemove = {...existingItem, amount: existingItem.amount - 1};
                    updatedItemsRemove = [...state.items];
                    updatedItemsRemove[existingCartItemIndexRemove] = updatedItemRemove;
                }
                return {
                    items: updatedItemsRemove,
                    totalAmount: updatedTotalAmountRemove 
                }
            default:
                return initialValue;
    }
}

const CartProvider = (props) => {

    const [state,dispatch] = useReducer(reducer,initialValue)

    const addItemToCartHandler = (item) => {
        dispatch({type:"ADD", item:item})
    }
    const removeItemToCartHandler = (id) => {
         dispatch({type:"REMOVE", id:id})
    }
    const cartContext = {
        items: state.items,
        totalAmount: state.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler
    };
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;