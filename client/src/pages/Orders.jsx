import { useState, useEffect } from 'react';
import API from '../api';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [details, setDetails] = useState([]);

    useEffect(() => {
        API.get('/orders')
            .then(res => { setOrders(res.data.orders); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const toggleDetails = async (orderId) => {
        if (expandedOrder === orderId) { setExpandedOrder(null); return; }
        try {
            const res = await API.get(`/orders/${orderId}/details`);
            setDetails(res.data.details);
            setExpandedOrder(orderId);
        } catch { /* ignore */ }
    };

    if (loading) return <div className="flex justify-center items-center min-h-screen bg-bg"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

    return (
        <div className="min-h-screen bg-bg py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold text-txt mb-8">Your Orders</h1>

                {orders.length === 0 ? (
                    <div className="bg-surface rounded-xl border border-bdr p-12 text-center">
                        <p className="text-txt-dim text-lg">No orders found</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <div key={order.O_ID} className="bg-surface rounded-xl border border-bdr overflow-hidden">
                                <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div className="flex-1">
                                        <p className="text-sm text-txt font-medium">{order.Product}</p>
                                        <p className="text-xs text-txt-dim mt-1">Date: {order.Date}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${order.Stutas === 'deleverd' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                                            {order.Stutas === 'deleverd' ? 'Delivered' : 'Pending'}
                                        </span>
                                        <span className="text-sm font-bold text-txt">৳{order.Price.toLocaleString()}</span>
                                        <button onClick={() => toggleDetails(order.O_ID)} className="text-xs text-primary hover:underline">
                                            {expandedOrder === order.O_ID ? 'Hide' : 'Details'}
                                        </button>
                                    </div>
                                </div>
                                {expandedOrder === order.O_ID && (
                                    <div className="border-t border-bdr p-4">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="text-left text-txt-dim">
                                                    <th className="py-2">Model</th>
                                                    <th className="py-2">Qty</th>
                                                    <th className="py-2">Price</th>
                                                    <th className="py-2">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {details.map((d, i) => (
                                                    <tr key={i} className="text-txt">
                                                        <td className="py-1.5">{d.Model}</td>
                                                        <td className="py-1.5">{d.Quantity}</td>
                                                        <td className="py-1.5">৳{d.Price.toLocaleString()}</td>
                                                        <td className="py-1.5 font-semibold">৳{d.Tprice.toLocaleString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
