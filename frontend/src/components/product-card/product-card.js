import React from 'react';
import StarYellow from '../../assets/img/star-yellow.png';
import StarBlack from '../../assets/img/star-black.png';
import { useAppContext } from '../../context/app-context';
import { useNavigate } from 'react-router-dom';


const ProductCard = ({product}) => {

    const {currency, addToCart, removeFromCart, cartItems} = useAppContext();

    const navigate = useNavigate();
    const scrollToTop = () => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 0);
    }

    return product && (
        <div className='col-xl-3 col-lg-4 col-md-6'>
            <div className='product-card' onClick={()=> {navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollToTop();}}>
                <img src={product.image[0]} alt={product.name} className='product-image' />
                <span className='product-category-text'>{product.category}</span>
                <h4>{product.name}</h4>
                <div className='d-flex'>
                    <img src={StarYellow} alt='star-icon' className='star-icon'/>
                    <img src={StarYellow} alt='star-icon' className='star-icon'/>
                    <img src={StarYellow} alt='star-icon' className='star-icon'/>
                    <img src={StarYellow} alt='star-icon' className='star-icon'/>
                    <img src={StarBlack} alt='star-icon' className='star-icon-fade'/>
                    <span className='ms-2 product-rating-text'>(4.5)</span>
                </div>
                <div className='d-flex justify-content-between align-items-center mt-2'>
                    <div className='d-flex'>
                        <span className='product-offer-price'>{currency}{product.offerPrice}</span>
                        <span className='product-price'>{currency}{product.price}</span>
                    </div>
                    <div onClick={(e)=>{e.stopPropagation();}}>
                        {!cartItems[product._id] ?(
                            <button onClick={()=>{addToCart(product._id);}} className='site-btn'>Add to cart</button>
                        ):(
                            <div className='d-flex'>
                                <button onClick={()=>{removeFromCart(product._id);}} className='site-btn3'>-</button>
                                <span className='product-count'>{cartItems[product._id]}</span>
                                <button onClick={()=>{addToCart(product._id);}} className='site-btn2'>+</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;