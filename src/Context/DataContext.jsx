import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);

    const [gifs, setGifs] = useState([]);
    const [filter, setFilter] = useState("gifs")
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favoriteGIFs")) || [];
        setFavorites(favorites);
      }, []);
    
      const addToFavorites = (id) => {
        if (favorites.includes(id)) {
          // If the item is already in favorites, remove it
          const updatedFavorites = favorites.filter((itemId) => itemId !== id);
          localStorage.setItem("favoriteGIFs", JSON.stringify(updatedFavorites));
          setFavorites(updatedFavorites);
        } else {
          // If the item is not in favorites, add it
          const updatedFavorites = [...favorites];
          updatedFavorites.push(id);
          localStorage.setItem("favoriteGIFs", JSON.stringify(updatedFavorites));
          setFavorites(updatedFavorites);
        }
      };
    return <DataContext.Provider
        value={
            {gf, gifs, setGifs, filter, setFilter, favorites,addToFavorites}
        }
    >{children}</DataContext.Provider>
}

export const GifState = () => {
    return useContext(DataContext)
}

export default DataProvider