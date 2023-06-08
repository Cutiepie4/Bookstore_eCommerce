import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { changeStatusOrder, deleteOrder } from '../redux/ordersApi';
import { useSelector } from 'react-redux';

function OrderDetail() {

    const navigate = useNavigate();
    const { role } = useSelector(state => state.authReducer);
    const { listOrderBooks, orderId, orderStatus } = useLocation().state;
    const [toggleDisplay, setToggleDisplay] = useState(false);

    const selectColor = () => {
        switch (orderStatus) {
            case 'Pending':
                return 'darkgoldenrod';

            case 'In Shipping':
                return '#0dcaf0';

            case 'Delivered':
                return 'green';
            default:
                return 'black';
        }
    }

    const handleChangeStatus = (status) => {
        const asyncFunction = async () => {
            await changeStatusOrder({ id: orderId, orderStatus: status });
            navigate('/orders');
        }
        if (window.confirm('Are you sure to change this ?'))
            asyncFunction();
    }

    const handleDeleteOrder = () => {
        const asyncFunction = async () => {
            await deleteOrder(orderId);
            navigate('/orders');
        }
        if (window.confirm('Are you sure to delete this ?'))
            asyncFunction();
    }

    return (
        <div className='container'>
            <div className='d-flex justify-content-between' >
                <h1 className='custom-hover' onClick={() => { role === 'ADMIN' ? navigate('/orders') : navigate('/user-orders') }}>{`Order ID: ${orderId}`}</h1>
                <div className="d-flex align-items-center position-relative">
                    <h3>Order Status: <span className='ms-2' style={{ color: `${selectColor()}` }}>{`${orderStatus}`}</span></h3>
                    {role === 'ADMIN' && <i className="fa-solid fa-caret-down fa-2xl ms-2 hover-red" onClick={() => setToggleDisplay(!toggleDisplay)}></i>}
                    {toggleDisplay && <ul className="card dropdown-option position-absolute bg-white border p-0 list-unstyled" style={{ width: 'max-content', right: 0 }}>
                        {/* <li className="border-bottom p-2" onClick={() => handleChangeStatus('Pending')}>
                            Set to <span style={{ color: 'darkgoldenrod', fontWeight: 'bold' }}>Pending</span>
                        </li> */}
                        {orderStatus !== 'In Shipping' && orderStatus !== 'Delivered' && <li className="border-bottom p-2 disabled" onClick={() => handleChangeStatus('In Shipping')}>
                            Set to <span style={{ color: '#0dcaf0', fontWeight: 'bold' }}>In Shipping</span>
                        </li>}
                        {orderStatus !== 'Delivered' && <li className="border-bottom p-2" onClick={() => handleChangeStatus('Delivered')}>
                            Set to <span style={{ color: 'green', fontWeight: 'bold' }}>Delivered</span>
                        </li>}
                        <li className="border-bottom p-2" style={{ color: 'red', fontWeight: 'bold' }} onClick={handleDeleteOrder}>
                            Delete this order
                        </li>
                    </ul>}
                </div>
            </div>
            <table className="table table-striped table-bordered" >
                <thead className="table-primary">
                    <tr>
                        <th>Book Id</th>
                        <th>Book Title</th>
                        <th>Book Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>

                <tbody>
                    {listOrderBooks.map(orderBook =>
                        <tr key={orderBook.id} className='row-hover'>
                            <td>{orderBook.book.id}</td>
                            <td>{orderBook.book.title}</td>
                            <td>{`${orderBook.book.price.toLocaleString()} vnđ`}</td>
                            <td>{orderBook.quantity}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default OrderDetail;