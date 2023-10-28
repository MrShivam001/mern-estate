// import{ configureStore } from '@reduxjs/toolkit';
// import { userReducer } from './user/userSlice';

// export const store=configureStore({
//     reducer :{user:userReducer},
//     middleware:(getDefaultMiddleware)=> 
//     getDefaultMiddleware({
//         serializableCheck:false,
//     }),
// });
// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './user/userSlice';  // import the default export and name it userReducer

// export const store = configureStore({
//     reducer: {
//         user: userReducer  // use userReducer here
//     },
//     middleware: (getDefaultMiddleware) => 
//         getDefaultMiddleware({
//             serializableCheck: false,
//         }),
// });
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
