import React, { useState } from 'react';
import { useEffect } from 'react';
import { fetchUserOrders } from '../redux/ordersApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function UserOrders(props) {

    const navigate = useNavigate();
    const { username } = useSelector(state => state.authReducer);
    const [listOrders, setListOrders] = useState([]);

    useEffect(() => {
        const asyncFunction = async () => {
            const res = await fetchUserOrders(username);
            setListOrders(res.sort((a, b) => new Date(b.time) - new Date(a.time)));
        }
        asyncFunction();
    }, [navigate])

    const formatTimestamp = (timestamp) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };

        const formattedDate = new Date(timestamp).toLocaleString('en-US', options);
        return formattedDate;
    }

    const selectColor = (status) => {
        switch (status) {
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

    return (
        <div className='container' style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <h1>Your Orders</h1>
            {listOrders.length > 0 ? <table className="table table-striped table-bordered" >
                <thead className="table-primary">
                    <tr>
                        <th>Receiver's name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Date Ordered</th>
                        <th>Total</th>
                        <th>Payment Status</th>
                        <th>Order Status</th>
                    </tr>
                </thead>

                <tbody>
                    {listOrders.map(order =>
                        <tr key={order.id} className='row-hover' onClick={() => navigate(`/user-orders/${order.id}`, { state: { orderStatus: order.orderStatus, listOrderBooks: order.listOrderBooks, orderId: order.id } })}>
                            <td>{order.name}</td>
                            <td>{order.phoneNumber}</td>
                            <td>{order.address}</td>
                            <td>{formatTimestamp(order.time)}</td>
                            <td>{`${(order.listOrderBooks.reduce((res, curr) => {
                                return res + curr.book.price * curr.quantity;
                            }, 0) + 30000).toLocaleString()} vnđ`}</td>
                            <td>{order.paymentStatus}</td>
                            <td style={{ color: `${selectColor(order.orderStatus)}`, fontWeight: 'bold' }}>{order.orderStatus} </td>
                        </tr>
                    )}
                </tbody>
            </table> : <h5>You have not placed any orders yet.</h5>}
        </div>
    );
}

export default UserOrders;