import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { useCart } from '../context/CartContext';

const Checkout = () => {
    const [address, setAddress] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { items, total, fetchCart } = useCart();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!address.trim()) { setError('Please enter your address'); return; }
        if (!paymentType) { setError('Please select a payment type'); return; }
        setLoading(true);
        setError('');
        try {
            await API.post('/orders/checkout', { address, paymentType });
            await fetchCart();
            navigate('/orders');
        } catch (err) {
            setError(err.response?.data?.message || 'Checkout failed');
        }
        setLoading(false);
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-bg flex items-center justify-center">
                <div className="text-center">
                    <p className="text-txt-dim text-lg mb-4">Your cart is empty</p>
                    <button onClick={() => navigate('/')} className="px-6 py-2 gradient-bg text-white rounded-lg text-sm font-medium">Go Shopping</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg py-8 px-4">
            <div className="max-w-lg mx-auto">
                <h1 className="text-2xl font-bold text-txt mb-8">Checkout</h1>

                {/* Order Summary */}
                <div className="bg-surface rounded-xl border border-bdr p-6 mb-6">
                    <h3 className="text-sm font-semibold text-txt-dim uppercase tracking-wider mb-4">Order Summary</h3>
                    <div className="space-y-2">
                        {items.map(item => (
                            <div key={item.C_ID} className="flex justify-between text-sm">
                                <span className="text-txt-dim">{item.Model} × {item.Quantity}</span>
                                <span className="text-txt">৳{item.TPrice.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-bdr flex justify-between">
                        <span className="text-sm font-bold text-txt">Total</span>
                        <span className="text-lg font-bold gradient-text">৳{total.toLocaleString()}</span>
                    </div>
                </div>

                {error && <div className="bg-danger/10 text-danger text-sm p-3 rounded-lg mb-6">{error}</div>}

                <form onSubmit={handleSubmit} className="bg-surface rounded-xl border border-bdr p-6 space-y-5">
                    <div>
                        <label className="block mb-1.5 text-txt-dim text-xs font-medium uppercase tracking-wider">Delivery Address</label>
                        <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows="4" required className="input-field resize-none" placeholder="Enter your full address..." />
                    </div>
                    <div>
                        <label className="block mb-1.5 text-txt-dim text-xs font-medium uppercase tracking-wider">Payment Type</label>
                        <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)} required className="input-field">
                            <option value="">Select Payment Type</option>
                            <option value="Cash on Delevery">Cash on Delivery</option>
                        </select>
                    </div>
                    <button type="submit" disabled={loading} className="w-full py-3 gradient-bg text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
                        {loading ? 'Placing Order...' : 'Confirm Order'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
