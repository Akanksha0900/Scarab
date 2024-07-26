import { createContext, useReducer } from "react";
import { favoriteReducer } from "../globalstate/Favorites.reducer";
const initialState = {
  favorites: [],
};

export const FavoriteContext = createContext(initialState);

export const FavoriteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoriteReducer, initialState);

  return (
    <FavoriteContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoriteContext.Provider>
  );
};
