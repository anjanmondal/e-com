import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/app-context';
import ProductCard from '../../components/product-card/product-card';

const AllProducts = () => {

    const { products, SearchQuery } = useAppContext();
    const [ FilteredProducts, setFilteredProducts ] = useState([]);

    useEffect(()=>{
        if (SearchQuery.length > 0){
            setFilteredProducts(products.filter(
                product => product.name.toLowerCase().includes(SearchQuery.toLowerCase())
            ))
        } else {
            setFilteredProducts(products)
        }
    }, [products, SearchQuery])

    return (
        <div className='page-common-margin-top'>
            <div className='container my-5'>
                <div className='row'>
                    <div className='col-12'>
                        <h2 className='site-heading mb-4 pt-5'>Search Results</h2>
                    </div>
                    <div className='row'>
                      {FilteredProducts.filter((product)=> product.inStock).map((product, index)=>(
                        <ProductCard key={index} product={product} />
                      ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;