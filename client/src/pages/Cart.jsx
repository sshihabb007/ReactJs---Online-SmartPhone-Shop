import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { items, total, removeFromCart } = useCart();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-bg py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-txt mb-8">Your Cart</h1>

                {items.length === 0 ? (
                    <div className="bg-surface rounded-xl border border-bdr p-12 text-center">
                        <p className="text-txt-dim text-lg mb-4">Your cart is empty</p>
                        <Link to="/" className="inline-block px-6 py-2 gradient-bg text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">Continue Shopping</Link>
                    </div>
                ) : (
                    <>
                        <div className="bg-surface rounded-xl border border-bdr overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-bdr text-left">
                                        <th className="p-4 text-xs font-semibold text-txt-dim uppercase tracking-wider">Product</th>
                                        <th className="p-4 text-xs font-semibold text-txt-dim uppercase tracking-wider">Qty</th>
                                        <th className="p-4 text-xs font-semibold text-txt-dim uppercase tracking-wider">Price</th>
                                        <th className="p-4 text-xs font-semibold text-txt-dim uppercase tracking-wider">Total</th>
                                        <th className="p-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-bdr">
                                    {items.map(item => (
                                        <tr key={item.C_ID}>
                                            <td className="p-4 text-sm text-txt font-medium">{item.Model}</td>
                                            <td className="p-4 text-sm text-txt-dim">{item.Quantity}</td>
                                            <td className="p-4 text-sm text-txt-dim">৳{item.Price.toLocaleString()}</td>
                                            <td className="p-4 text-sm text-txt font-semibold">৳{item.TPrice.toLocaleString()}</td>
                                            <td className="p-4">
                                                <button onClick={() => removeFromCart(item.C_ID)} className="text-danger text-xs hover:underline">Remove</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="border-t-2 border-bdr">
                                        <td colSpan="3" className="p-4 text-right text-sm font-bold text-txt uppercase">Total:</td>
                                        <td className="p-4 text-lg font-bold gradient-text">৳{total.toLocaleString()}</td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        <div className="flex justify-between items-center mt-6">
                            <Link to="/" className="text-txt-dim text-sm hover:text-txt transition-colors">← Continue Shopping</Link>
                            <button onClick={() => navigate('/checkout')} className="px-8 py-3 gradient-bg text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity">
                                Checkout →
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
