import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import API from '../api';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeBrand, setActiveBrand] = useState('');
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    useEffect(() => {
        API.get('/products/brands').then(res => setBrands(res.data.brands)).catch(() => {});
    }, []);

    useEffect(() => {
        setLoading(true);
        let url = '/products';
        if (searchQuery) url += `?search=${encodeURIComponent(searchQuery)}`;
        else if (activeBrand) url += `?brand=${encodeURIComponent(activeBrand)}`;

        API.get(url)
            .then(res => { setProducts(res.data.products); setLoading(false); })
            .catch(() => setLoading(false));
    }, [searchQuery, activeBrand]);

    return (
        <div className="min-h-screen bg-bg">
            {/* Hero */}
            {!searchQuery && (
                <div className="relative overflow-hidden bg-gradient-to-b from-surface to-bg py-20 px-4 text-center border-b border-bdr">
                    <div className="absolute inset-0 opacity-20" style={{background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.3), transparent 70%)'}} />
                    <h1 className="relative text-4xl md:text-5xl font-bold mb-4 gradient-text">Experience the Future of Mobile</h1>
                    <p className="relative text-txt-dim text-lg max-w-xl mx-auto">Discover our curated selection of premium smartphones from top brands worldwide.</p>
                </div>
            )}

            {/* Search result header */}
            {searchQuery && (
                <div className="pt-6 px-4 max-w-7xl mx-auto">
                    <p className="text-txt-dim text-sm">Search results for: <span className="text-txt font-semibold">"{searchQuery}"</span></p>
                </div>
            )}

            {/* Brand Filter */}
            <div className="max-w-7xl mx-auto px-4 pt-8">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    <button
                        onClick={() => setActiveBrand('')}
                        className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${!activeBrand ? 'gradient-bg text-white' : 'bg-surface border border-bdr text-txt-dim hover:text-txt'}`}
                    >
                        All Brands
                    </button>
                    {brands.map(b => (
                        <button
                            key={b.Id}
                            onClick={() => setActiveBrand(b['Brand Name'])}
                            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeBrand === b['Brand Name'] ? 'gradient-bg text-white' : 'bg-surface border border-bdr text-txt-dim hover:text-txt'}`}
                        >
                            {b['Brand Name']}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <section className="max-w-7xl mx-auto px-4 py-10">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : products.length === 0 ? (
                    <p className="text-center text-txt-dim py-20 text-lg">No products found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map(product => (
                            <Link
                                to={`/product/${product.Id}`}
                                key={product.Id}
                                className="group bg-surface rounded-xl overflow-hidden border border-bdr hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
                            >
                                <div className="h-56 p-6 bg-white flex items-center justify-center overflow-hidden">
                                    <img
                                        src={`http://localhost:5000${product.Image.replace('..', '')}`}
                                        alt={product.Model}
                                        onError={(e) => { e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect fill="%23f1f5f9" width="200" height="200"/><text fill="%2394a3b8" font-size="14" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">No Image</text></svg>' }}
                                        className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-5">
                                    <span className="text-[10px] uppercase tracking-widest text-primary font-semibold">{product.Brand}</span>
                                    <h3 className="mt-1 text-base font-semibold text-txt truncate">{product.Model}</h3>
                                    <div className="mt-3 flex items-center justify-between">
                                        <p className="text-xl font-bold gradient-text">৳{product.Price.toLocaleString()}</p>
                                        <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${product.Quantity > 4 ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                                            {product.Quantity > 4 ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
