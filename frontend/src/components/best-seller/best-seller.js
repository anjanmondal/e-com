import React from 'react';
import ProductCard from '../product-card/product-card';
import { useAppContext } from '../../context/app-context';

const BestSeller = () => {

    const {products} = useAppContext();

    return (
        <div className='container mt-3 mb-5'>
            <div className='row'>
                <div className='col-12'>
                    <h2 className='site-heading'>Best Seller</h2>
                </div>
                {products.filter((product)=>product.inStock).slice(0,8).map((product, index)=>(
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
};

export default BestSeller;