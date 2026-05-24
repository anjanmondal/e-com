import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../context/app-context';
import YellowStarIcon from '../../assets/img/star-yellow.png';
import StarIconDull from '../../assets/img/star-black.png';
import RightArrowIcon from '../../assets/img/arrow-right.png';
import ProductCard from '../../components/product-card/product-card';
// import PotatoImg1 from '../../assets/img/potato-img1.png';
// import PotatoImg2 from '../../assets/img/potato-img2.png';
// import PotatoImg3 from '../../assets/img/potato-img3.png';
// import PotatoImg4 from '../../assets/img/potato-img4.png';

const ProductDetails = () => {

    const navigate = useNavigate();

    // calling the products, currency and add to cart function from the app context
    const { products, currency, addToCart  } = useAppContext();
    const {id} = useParams();

    const [thumbnailImage, setThumbnailImage] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    // find the product by id from the products array
    const product = products.find((item)=> item._id === id);

    // related products logic
    useEffect(()=>{
        if (products.length > 0 && product?.category) {
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item)=> product.category === item.category);
            setRelatedProducts(productsCopy.slice(0, 4));
        }
    }, [products, product?.category]);

    // set the thumbnail image
    useEffect(()=>{
        setThumbnailImage(product?.image[0] ? product.image[0] : null);
    }, [product]);

    return product &&(
        <div className='page-common-margin-top'>
            <div className='container my-5'>
                <div className='row pt-5'>
                    <div className='col-xl-7'>

                        <div className='site-breadcrumb'>
                            <Link to={'/'} className='breadtxt'>Home</Link>
                            <img src={RightArrowIcon} alt='arrow-icon' className='arrow-icon' />
                            <span className='breadtxt'>Products</span>
                            <img src={RightArrowIcon} alt='arrow-icon' className='arrow-icon' />
                            <Link to={`/products/${product.category.toLowerCase()}`} className='breadtxt'>{product.category}</Link>
                            <img src={RightArrowIcon} alt='arrow-icon' className='arrow-icon' />
                            <span className='breadtxt txt-success'>{product.name}</span>
                        </div>

                        <div className='row mt-4'>
                            <div className='col-xl-2 col-md-2 col-2'>
                                
                                {product.image.map((image, index)=>(
                                    <div className='imgbox-sm' key={index} onClick={()=>setThumbnailImage(image)}>
                                        <img src={image} alt='tab-img-sm' />
                                    </div>
                                ))}

                               {/* <div className='imgbox-sm'>
                                 <img src={PotatoImg1} alt='tab-img-sm' />
                               </div>
                               <div className='imgbox-sm'>
                                 <img src={PotatoImg2} alt='tab-img-sm' />
                               </div>
                               <div className='imgbox-sm'>
                                 <img src={PotatoImg3} alt='tab-img-sm' />
                               </div>
                               <div className='imgbox-sm'>
                                 <img src={PotatoImg4} alt='tab-img-sm' />
                               </div> */}
                            </div>
                            <div className='col-xl-10 col-md-10 col-10'>
                                <div className='imgbox-lg'>
                                    <img src={thumbnailImage} alt='tab-img-lg' className='img-fluid' />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='col-xl-5 ps-xl-5 mt-5'>
                        <h2 className='site-heading mb-2'>{product.name}</h2>
                        <div className='d-flex'>
                            <img src={YellowStarIcon} alt='star-icon' className='star-icon'/>
                            <img src={YellowStarIcon} alt='star-icon' className='star-icon'/>
                            <img src={YellowStarIcon} alt='star-icon' className='star-icon'/>
                            <img src={YellowStarIcon} alt='star-icon' className='star-icon'/>
                            <img src={StarIconDull} alt='star-icon' className='star-icon op05'/>
                            <span className='rating-txt'>(4.5)</span>
                        </div>
                        <div className='d-flex mt-3'>
                            <div className='product-price'>
                                <h3>{currency}{product.price}</h3>
                            </div>
                            <div className='product-offer-price'>
                                <h3>{currency}{product.offerPrice}</h3>
                            </div>
                        </div>
                        <div className='mt-4 mb-5'>
                            <h3 className='site-amtxt-heading mb-3'>About the product</h3>
                            <ul className='abouttextlist'>
                                {product.description.map((descriptiontext, index)=>(
                                    <li key={index}><p className='listtxt'>{descriptiontext}</p></li>
                                ))}
                                {/* <li><p className='listtxt'>Fresh and organic</p></li>
                                <li><p className='listtxt'>Rich in carbohydrates</p></li>
                                <li><p className='listtxt'>Ideal for curries and fries</p></li> */}
                            </ul>
                        </div>
                        <div className='d-flex gap-3'>
                            <button onClick={()=> addToCart(product._id)} className='site-btn-inactive'>Add to cart</button>
                            <button onClick={()=> {addToCart(product._id); navigate('/cart')}} className='site-btn'>Buy Now</button>
                        </div>
                    </div>
                </div>
                <div className='row pt-5'>
                    <div className='col-12'>
                        <h2 className='site-heading'>Related Products</h2>
                    </div>
                    {relatedProducts.filter((product)=>product.inStock).map((product, index)=>(
                        <ProductCard product={product} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;