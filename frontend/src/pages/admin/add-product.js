import React, { useState } from 'react';
import UploadImageIcon from '../../assets/img/upload-image-icon.png';
import Form from 'react-bootstrap/Form';
import { categories } from '../../assets/assets';
import { useAppContext } from '../../context/app-context';
import toast from 'react-hot-toast';

const AddProduct = () => {

    const [files, setFiles] = useState([]);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');
    const [description, setDescription] = useState('');
    const {axios} = useAppContext();

    const onSubmitHandler = async (e)=>{
        try {
            e.preventDefault();
            const productData = {
                name,
                description: description.split('\n'),
                category,
                price,
                offerPrice
            }

            const formData = new FormData();
            formData.append('productData', JSON.stringify(productData));
            for (let i = 0; i < files.length; i++) {
                formData.append('images', files[i]);
            }

            const {data} = await axios.post('/api/product/add', formData)
            if (data.success) {
                toast.success(data.message);
                setFiles([]);
                setName('');
                setCategory('');
                setPrice('');
                setOfferPrice('');
                setDescription('');
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
                        <h2 className='admin-hero-heading'>Add Product</h2>
                   </div>
                   <div className='col-12 mt-4'>
                       <form onSubmit={onSubmitHandler} className='admin-product-form'>

                          <div className='row'>
                            <div className='col-12'>
                                <p className='form-label mb-3'>Product Image</p>
                                <div className='d-flex gap-3 flex-wrap mb-4'>
                                        {Array(4).fill('').map((_, index) => (
                                        <label key={index} htmlFor={`image${index}`} className='upload-image-box'>
                                            <input onChange={(e)=>{
                                                const updatedFiles = [...files];
                                                updatedFiles[index] = e.target.files[0];
                                                setFiles(updatedFiles);
                                            }} accept="image/*" type="file" id={`image${index}`} hidden />
                                            <img className="upload-image c-pointer" src={ files[index] ? URL.createObjectURL(files[index]) : UploadImageIcon } alt="uploadArea" />
                                        </label>
                                        ))}
                                </div>                               
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-xl-4'>
                                <p className='form-label mb-2'>Product Name</p>
                                <input onChange={(e)=> setName(e.target.value)} value={name} type='text' class="form-control admin-form-controll mb-3" placeholder="Enter product name" required />
                            </div>
                            <div className='col-xl-4'>
                                <p className='form-label mb-2'>Product Category</p>
                                <Form.Select
                                onChange={(e)=> setCategory(e.target.value)} value={category}
                                aria-label="Default select example" className='form-select mb-3'>
                                    <option value=''>Select category</option>
                                    {categories.map((category, index)=>(
                                        <option key={index} value={category.path}>{category.path}</option>
                                    ))}
                                </Form.Select>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-xl-4'>
                                <p className='form-label mb-2'>Product Price</p>
                                <input onChange={(e)=> setPrice(e.target.value)} value={price} type='text' class="form-control admin-form-controll mb-3" placeholder="Enter product price" required />
                            </div>
                            <div className='col-xl-4'>
                                <p className='form-label mb-2'>Offer Price</p>
                                <input onChange={(e)=> setOfferPrice(e.target.value)} value={offerPrice} type='text' class="form-control admin-form-controll mb-3" placeholder="Enter offer price" required />
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-xl-8'>
                                <p className='form-label mb-2'>Product Description</p>
                                <textarea onChange={(e)=> setDescription(e.target.value)} value={description} className='form-control admin-form-controll text-area-min-height mb-4' rows="4" placeholder='Enter product description' required></textarea>
                                <button type='submit' className='site-btn-orange'>Add Product</button>
                            </div>
                          </div>
                       </form>
                   </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;