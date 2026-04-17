import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        API.get(`/products/${id}`)
            .then(res => { setProduct(res.data.product); setLoading(false); })
            .catch(() => { setLoading(false); });
    }, [id]);

    const handleAddToCart = async () => {
        if (!user) { navigate('/login'); return; }
        setAdding(true);
        try {
            await addToCart(product.Id, quantity);
            setMsg('Added to cart!');
            setTimeout(() => setMsg(''), 2000);
        } catch (err) {
            setMsg(err.response?.data?.message || 'Failed to add');
        }
        setAdding(false);
    };

    if (loading) return <div className="flex justify-center items-center min-h-screen bg-bg"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
    if (!product) return <div className="flex justify-center items-center min-h-screen bg-bg text-txt-dim">Product not found.</div>;

    const available = product.Quantity > 4;

    const specs = [
        { category: 'Network', items: [['Technology', product.Technology]] },
        { category: 'Body', items: [['Dimensions', product.Dimensions], ['Weight', product.Weight], ['Build', product['Body Build']], ['SIM', product.Sim]] },
        { category: 'Display', items: [['Type', product['Display Type']], ['Size', product['Display Size']], ['Protection', product['Display Protection']], ['Multitouch', product.Multitouch]] },
        { category: 'Platform', items: [['OS', product.OS], ['Chipset', product.Chipset], ['CPU', product.CPU], ['GPU', product.GPU]] },
        { category: 'Memory', items: [['Card Slot', product['Card Slort']], ['Internal', product['Internal Memory']]] },
        { category: 'Camera', items: [['Primary', product['Primary Camera']], ['Features', product['Camera Feature']], ['Video', product['Video Quality']], ['Secondary', product['Secondary Camera']]] },
        { category: 'Sound', items: [['Alert', product.Alert], ['Loudspeaker', product.Loudspeaker]] },
    ];

    return (
        <div className="min-h-screen bg-bg py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <button onClick={() => navigate(-1)} className="text-txt-dim text-sm hover:text-txt mb-6 inline-flex items-center gap-1 transition-colors">
                    ← Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Image */}
                    <div className="bg-white rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
                        <img
                            src={`http://localhost:5000${product.Image.replace('..', '')}`}
                            alt={product.Model}
                            className="max-w-full max-h-[400px] object-contain"
                            onError={(e) => { e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400"><rect fill="%23f1f5f9" width="300" height="400"/><text fill="%2394a3b8" font-size="16" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">No Image</text></svg>' }}
                        />
                    </div>

                    {/* Info */}
                    <div>
                        <span className="text-xs uppercase tracking-widest text-primary font-semibold">{product.Brand}</span>
                        <h1 className="text-3xl font-bold text-txt mt-2">{product.Model}</h1>
                        <div className="mt-3">
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${available ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                                {available ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>
                        <p className="text-4xl font-bold gradient-text mt-6">৳{product.Price.toLocaleString()}</p>

                        {available && (
                            <div className="mt-8 flex items-center gap-4">
                                <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="input-field w-24">
                                    {[1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                                <button onClick={handleAddToCart} disabled={adding} className="flex-1 py-3 gradient-bg text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
                                    {adding ? 'Adding...' : 'Add to Cart'}
                                </button>
                            </div>
                        )}
                        {msg && <p className="mt-3 text-success text-sm font-medium">{msg}</p>}
                    </div>
                </div>

                {/* Specifications Table */}
                <div className="mt-12 bg-surface rounded-2xl border border-bdr overflow-hidden">
                    <h2 className="text-xl font-bold text-txt p-6 border-b border-bdr">Specifications</h2>
                    <div className="divide-y divide-bdr">
                        {specs.map(section => (
                            <div key={section.category}>
                                {section.items.map(([label, value], i) => (
                                    <div key={label} className="flex">
                                        {i === 0 && (
                                            <div className="w-28 shrink-0 p-4 text-sm font-semibold text-primary border-r border-bdr flex items-start" style={{ gridRow: `span ${section.items.length}` }}>
                                                {section.category}
                                            </div>
                                        )}
                                        {i !== 0 && <div className="w-28 shrink-0 border-r border-bdr" />}
                                        <div className="w-32 shrink-0 p-4 text-sm text-txt-dim border-r border-bdr">{label}</div>
                                        <div className="flex-1 p-4 text-sm text-txt">{value}</div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
