import React from 'react';

function Cart(props) {
    return (
        <section class="h-100 h-custom">
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col" class="h2">Shopping Cart</th>
                                        <th scope="col">Format</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <img src="https://i.imgur.com/2DsA49b.webp" class="img-fluid rounded-3"
                                                    style={{ width: '120px' }} alt="Book" />
                                                <div class="flex-column ms-4">
                                                    <h4 class="mb-2 text-black">Thinking, Fast and Slow</h4>
                                                    <p class="mb-0 text-muted" >Daniel Kahneman</p>
                                                </div>
                                            </div>
                                        </th>
                                        <td class="align-middle">
                                            <p class="mb-0" style={{ fontWeight: 500 }}>Digital</p>
                                        </td>
                                        <td class="align-middle">
                                            <div class="d-flex flex-row">
                                                <input id="form1" min="0" name="quantity" value="2" type="number"
                                                    class="form-control form-control-sm" style={{ width: '50px' }} />
                                            </div>
                                        </td>
                                        <td class="align-middle">
                                            <p class="mb-0" style={{ fontWeight: 500 }}>$9.99</p>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                        <div className="card shadow-2-strong mb-5 mb-lg-0" style={{ borderRadius: '16px', margin: '0 -8px' }}>
                            <div className="card-body p-4">
                                <div className="row">
                                    <div className="col-lg-8 col-xl-9">
                                        {/* Content on the left */}
                                    </div>
                                    <div className="col-lg-4 col-xl-3">
                                        <div className="d-flex justify-content-between" style={{ fontWeight: 500 }}>
                                            <p className="mb-2">Subtotal</p>
                                            <p className="mb-2">$23.49</p>
                                        </div>

                                        <div className="d-flex justify-content-between" style={{ fontWeight: 500 }}>
                                            <p className="mb-0">Shipping</p>
                                            <p className="mb-0">$2.99</p>
                                        </div>
                                        <hr className="my-4" />
                                        <div className="d-flex justify-content-between mb-4" style={{ fontWeight: 500 }}>
                                            <p className="mb-2">Total</p>
                                            <p className="mb-2">$26.48</p>
                                        </div>

                                        <button type="button" className="btn btn-primary btn-block btn-lg">
                                            <div className="d-flex justify-content-between">
                                                {`Checkout $30.00`}
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Cart;