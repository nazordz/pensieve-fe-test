import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/authenticationSlice";
import snackbarReducer from "./slices/snackbarSlice";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage' 

const authenticatePersistConfig = {
  key: 'authenticate',
  storage,
}

const persistedAuthenticateReducer = persistReducer(authenticatePersistConfig, authenticationReducer);

const reducers = combineReducers({
  authentication: persistedAuthenticateReducer,
  snackbar: snackbarReducer,

})

export const store = configureStore({
  reducer: reducers,
  middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      });
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
