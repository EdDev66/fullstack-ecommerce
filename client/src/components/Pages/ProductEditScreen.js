import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Spinner from '../Spinner/Spinner';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import { listSingleProduct, updateProduct } from '../../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants';

const ProductEditScreen = ({ history, match }) => {
    const productId = match.params.id;

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate
    
    const singleProduct = useSelector(state => state.singleProduct)
    const { loading, error, product } = singleProduct
    

    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {
            if(!product.title || product._id !== productId) {
                dispatch(listSingleProduct(productId));
            } else {
                setTitle(product.title)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
        
    }, [dispatch, productId, product, successUpdate])


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: productId,
            title,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
            rating

        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const res = await axios.post('/upload', formData, config)

            setImage(res.data)
            setUploading(false);
        } catch (error) {
            console.log(error)
            setUploading(false);
        }
    }


    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                &#8592; Go back
            </Link>
        <Container>
        <div className="signIn-container">

            <h3 className='mb-4'>Edit Product</h3>
            {loadingUpdate ? <Spinner /> : null}
            {errorUpdate ? <Alert variant='danger'>{errorUpdate}</Alert> : null}
            {loading ? <Spinner /> : error ? <Alert variant='danger'>{error}</Alert> : (
            <Form onSubmit={submitHandler}>
                
                <Col md={6} className="offset-md-3">
                <Form.Group>
                    <Form.Label className="h6">Title</Form.Label>
                    <InputGroup>
                    <Form.Control 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"/>
                    </InputGroup>
                </Form.Group>
                </Col>
                
                <Col md={6} className="offset-md-3">
                <Form.Group>
                    <Form.Label className="h6">Price</Form.Label>
                    <InputGroup>
                    <Form.Control 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"/>
                    </InputGroup>
                </Form.Group>
                </Col> 
                
                <Col md={6} className="offset-md-3">
                <Form.Group>
                    <Form.Label className="h6">Image</Form.Label>
                    <InputGroup>
                    <Form.Control 
                    type="text" 
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Price"/>
                   
                   
                    </InputGroup>
                </Form.Group>
                </Col> 

                <Col md={6} className="offset-md-3">
                <Form.File 
                    id='image-file' 
                    label='Choose file' 
                    custom 
                    onChange={uploadFileHandler}></Form.File>
                    {uploading && <Spinner />}
                </Col>
                
                <Col md={6} className="offset-md-3">
                <Form.Group>
                    <Form.Label className="h6">Brand</Form.Label>
                    <InputGroup>
                    <Form.Control 
                    type="text" 
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Price"/>
                    </InputGroup>
                </Form.Group>
                </Col> 
                
                <Col md={6} className="offset-md-3">
                <Form.Group>
                    <Form.Label className="h6">Count In Stock</Form.Label>
                    <InputGroup>
                    <Form.Control 
                    type="text" 
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                    placeholder="Price"/>
                    </InputGroup>
                </Form.Group>
                </Col> 

                <Col md={6} className="offset-md-3">
                <Form.Group>
                    <Form.Label className="h6">Rating</Form.Label>
                    <InputGroup>
                    <Form.Control 
                    type="number" 
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    placeholder="Rating"/>
                    </InputGroup>
                </Form.Group>
                </Col> 
                
                <Col md={6} className="offset-md-3">
                <Form.Group>
                    <Form.Label className="h6">Category</Form.Label>
                    <InputGroup>
                    <Form.Control 
                    type="text" 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Price"/>
                    </InputGroup>
                </Form.Group>
                </Col> 
                
                <Col md={6} className="offset-md-3">
                <Form.Group>
                    <Form.Label className="h6">Description</Form.Label>
                    <InputGroup>
                    <Form.Control 
                    type="text" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Price"/>
                    </InputGroup>
                </Form.Group>
                </Col> 

                <Button type="submit" variant="danger">Update</Button>
            </Form>
            )}
            
        </div>
        </Container>
        </>
    )
}

export default ProductEditScreen
