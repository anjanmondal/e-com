import React from 'react';
import { useAppContext } from '../../context/app-context';
import { useParams } from 'react-router-dom';
import { categories } from '../../assets/assets';
import ProductCard from '../../components/product-card/product-card';

const ProductCategory = () => {
    const {products} = useAppContext()
    const { category } = useParams()
    const searchCategory = categories.find((item)=> item.path.toLocaleLowerCase() === category)
    const filteredProducts = products.filter(
        (product) => product.category && product.category.toLocaleLowerCase() === category
    )

    return (
        <div className='page-common-margin-top'>
           <div className='container my-5'>
              <div className='row'>
                    { searchCategory && (
                        <div className='col-12'>
                            <h2 className='site-heading mb-4 pt-5'>{searchCategory.text}</h2>
                        </div>
                    )}
              </div>
              { filteredProducts.length > 0 ? (
                    <div className='row'>
                      {filteredProducts.map((product)=>(
                        <ProductCard key={product._id} product={product} />
                      ))}    
                    </div>
                    ) : (
                    <div className='row'>
                        <div className='col-12'>
                          <p className='ptxt'>No products found in this category</p>
                        </div>
                    </div>
               )}
           </div>
        </div>
    );
};

export default ProductCategory;