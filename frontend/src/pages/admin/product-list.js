import React from 'react';
import { useAppContext } from '../../context/app-context';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';

const ProductList = () => {
    const {products, currency, axios, fetchProducts} = useAppContext();
    const toggleStock = async (id, inStock)=>{
        try {
            const {data} = await axios.post('/api/product/stock', {id, inStock});
            if (data.success) {
                fetchProducts();
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className='admin-common-gapping'>
            <div className='container-fluid pb-5'>
                <div className='row'>
                   <div className='col-12'>
                        <h2 className='admin-hero-heading'>All Products</h2>
                   </div>
                </div>
                <div className='row mt-4 mb-3'>
                    <div className='col-xl-5 col-lg-5 col-md-5'>
                        <p className='admin-table-head d-md-block d-none'>Product</p>
                    </div>
                    <div className='col-xl-3 col-lg-3 col-md-3'>
                        <p className='admin-table-head d-md-block d-none'>Category</p>
                    </div>
                    <div className='col-xl-2 col-lg-2 col-md-2'>
                        <p className='admin-table-head d-md-block d-none'>Selling Price</p>
                    </div>
                    <div className='col-xl-2 col-lg-2 col-md-2'>
                        <p className='admin-table-head d-md-block d-none'>In Stock</p>
                    </div>
                </div>
                {products.map((product)=>(
                    <div key={product._id} className='row mb-3'>
                        <div className='col-xl-5 col-lg-5 col-md-5 col-12'>
                            <div className='d-flex gap-3'>
                                <img src={product.image[0]} alt={product.name} className='admin-product-list-img' />
                                <p className='admin-table-txt'>{product.name}</p>
                            </div>
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-5'>
                            <p className='admin-table-txt'>{product.category}</p>
                        </div>
                        <div className='col-xl-2 col-lg-2 col-md-2 col-4'>
                            <p className='admin-table-txt'>{currency || '$'}{product.offerPrice}</p>
                        </div>
                        <div className='col-xl-2 col-lg-2 col-md-2 col-3 admin-switch-mt'>
                            <Form.Check
                                defaultChecked
                                type="switch"
                                id="custom-switch"
                                label={product.inStock}
                                checked={product.inStock}
                                onClick={()=>toggleStock(product._id, !product.inStock)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;