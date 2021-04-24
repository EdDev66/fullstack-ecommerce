import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from '../Spinner/Spinner';
import Alert from 'react-bootstrap/Alert';
import Paginate from '../Paginate';
import { Link } from 'react-router-dom';
import { listProducts, deleteProduct, createProduct } from '../../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants';


const ProductList = ({ history, match }) => {
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products, page, pages } = productList;
    
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

    const productCreate = useSelector(state => state.productCreate);
    const { 
        loading: loadingCreate, 
        error: errorCreate, 
        success: successCreate,
        product: createdProduct
     } = productCreate;

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if(!userInfo.isAdmin){
            history.push('/login');
        } 

        if(successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts('', pageNumber));
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?')) {
            dispatch(deleteProduct(id));
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct());
    }

    const editHandler = () => {
        // EDIT PRODUCT
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col>
                    <Button 
                    onClick={createProductHandler}
                    className='my-3'>
                        Create Product
                    </Button>
                </Col>
            </Row>
        {loadingDelete ? <Spinner /> : null}
        {errorDelete ? <Alert variant='danger'>{errorDelete}</Alert> : null} 

        {loadingCreate ? <Spinner /> : null}
        {errorCreate ? <Alert variant='danger'>{errorCreate}</Alert> : null}
         {loading ? <Spinner /> : error ? <Alert variant='danger'>{error}</Alert> : (
             <>
             <Table striped bordered hover responsive className='table-sm'>
                 <thead>
                     <tr>
                         <th>ID</th>
                         <th>TITLE</th>
                         <th>PRICE</th>
                         <th>CATEGORY</th>
                         <th>BRAND</th>
                         <th></th>
                     </tr>
                 </thead>
                 <tbody>
                     {products.map(product => (
                         <tr key={product._id}>
                             <td>{product._id}</td>
                             <td>{product.title}</td>
                             <td>${product.price}</td>
                             <td>{product.category}</td>
                             <td>
                                 <Link to={`/admin/product/${product._id}/edit`}>
                                     <Button variant='light' className='btn-sm' onClick={editHandler}>
                                         Edit
                                     </Button>
                                 </Link>
                                 <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                     Delete
                                 </Button>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </Table>
             <Paginate pages={pages} page={page} isAdmin={true}/>
             </>
         )}
        </>
    )
}

export default ProductList
