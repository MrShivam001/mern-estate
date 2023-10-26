// import{ configureStore } from '@reduxjs/toolkit';
// import { userReducer } from './user/userSlice';

// export const store=configureStore({
//     reducer :{user:userReducer},
//     middleware:(getDefaultMiddleware)=> 
//     getDefaultMiddleware({
//         serializableCheck:false,
//     }),
// });
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';  // import the default export and name it userReducer

export const store = configureStore({
    reducer: {
        user: userReducer  // use userReducer here
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
