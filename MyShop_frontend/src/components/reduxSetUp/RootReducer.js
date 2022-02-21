const initialState={
    cart:{},
    user:{},
}
export default function RootReducer(state=initialState,action){
    switch(action.type){
        case "ADD_Product":
            state.cart[action.payload[0]]=action.payload[1];
            return state;
        case "ADD_USER":
                state['user']['token']=action.payload;
                return state;
        case "Update_Product":
            state.cart[action.payload[0]].qty+=action.payload[1];
            return state;    
        case "Delete_Product":
            delete state.cart[action.payload]
            return state
        default:
            return state;
    }
}