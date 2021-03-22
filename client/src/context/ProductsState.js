import React, { useReducer } from 'react';
import ProductContext from './ProductsContext';
import ProductsReducer from './ProductsReducer';
import { SET_PRODUCTS, SET_DISPLAY_PRODUCTS, SET_LOADING, SET_CURRENT_PRODUCT } from './types';

const ProductsState = props => {
    const initialState = {
        products: [],
        displayProducts: [],
        currentProduct: null,
        loading: false
    }

    const [state, dispatch] = useReducer(ProductsReducer, initialState);

    const generateFeatured = () => {
        return Math.floor(Math.random() * 10) + 5;
      }

    // Init products
    async function fetchData() {
        try {
          setLoading();

          let response = await fetch('https://fakestoreapi.com/products');
          const json = await response.json();
          const newShowcase = generateFeatured();
          const displayArray = json.slice(14,20);
          
          setProducts(json);
          setDisplayProducts(displayArray);

        } catch(err) {
          console.error(err.message);
        }
      }

    const fetchSingleProduct = async (id) => {
      try {
        setLoading();

        let response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const json = await response.json();
        
          setCurrentProduct(json)
        
      } catch(err) {
        console.error(err.message);
      }
    }

      // Set Products
      const setProducts = (content) => dispatch({ type: SET_PRODUCTS, payload: content })

      // Set display products
      const setDisplayProducts = (content) => dispatch({ type: SET_DISPLAY_PRODUCTS, payload: content })

      // Set current product
      const setCurrentProduct = (content) => dispatch({ type: SET_CURRENT_PRODUCT, payload: content })

      // Set loading
      const setLoading = () => dispatch({ type: SET_LOADING })

    return <ProductContext.Provider
        value={{
            products: state.products,
            currentProduct: state.currentProduct,
            displayProducts: state.displayProducts,
            loading: state.loading,
            fetchData,
            fetchSingleProduct
        }}
    >
        {props.children}
    </ProductContext.Provider>
}

export default ProductsState
