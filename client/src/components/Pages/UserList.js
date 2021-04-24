import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from '../Spinner/Spinner';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import { listUsers, deleteUser } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const UserList = ({ history }) => {
    const dispatch = useDispatch();

    const userList = useSelector(state => state.userList);
    const { loading, error, users } = userList;
    
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    
    const userDelete = useSelector(state => state.userDelete);
    const { success: successDelete } = userDelete;

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers());
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?')) {
            dispatch(deleteUser(id));
        }
    }

    return (
        <>
         <h1 className='mt-4 mb-3'>Users</h1>   
         {loading ? <Spinner /> : error ? <Alert variant='danger'>{error}</Alert> : (
             <Table striped bordered hover responsive className='table-sm'>
                 <thead>
                     <tr>
                         <th>ID</th>
                         <th>NAME</th>
                         <th>EMAIL</th>
                         <th>ADMIN</th>
                         <th></th>
                     </tr>
                 </thead>
                 <tbody>
                     {users.map(user => (
                         <tr key={user._id}>
                             <td>{user._id}</td>
                             <td>{user.name}</td>
                             <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                             <td>{user.isAdmin ? 'Admin' : 'Not Admin'}</td>
                             <td>
                                 <Link to={`/admin/user/${user._id}/edit`}>
                                     <Button variant='light' className='btn-sm'>
                                         Edit
                                     </Button>
                                 </Link>
                                 <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                     Delete
                                 </Button>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </Table>
         )}
        </>
    )
}

export default UserList
