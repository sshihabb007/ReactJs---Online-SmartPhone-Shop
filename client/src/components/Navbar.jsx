import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { user, logout, isAdmin } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full h-16 glass border-b border-bdr z-50">
            <div className="max-w-7xl h-full mx-auto px-4 lg:px-8 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold text-txt shrink-0">
                    Smart<span className="gradient-text">Phone</span>Shop
                </Link>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="hidden md:flex items-center mx-6 flex-1 max-w-md">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search phones..."
                        className="w-full px-4 py-2 rounded-l-lg bg-bg border border-bdr text-txt text-sm focus:outline-none focus:border-primary"
                    />
                    <button type="submit" className="px-4 py-2 gradient-bg text-white rounded-r-lg text-sm font-medium hover:opacity-90 transition-opacity">
                        Search
                    </button>
                </form>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/" className="text-txt-dim text-sm font-medium hover:text-txt transition-colors">Home</Link>
                    <Link to="/about" className="text-txt-dim text-sm font-medium hover:text-txt transition-colors">About</Link>

                    {user ? (
                        <>
                            <Link to="/cart" className="text-txt-dim text-sm font-medium hover:text-txt transition-colors relative">
                                Cart
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-4 w-5 h-5 gradient-bg text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            <Link to="/orders" className="text-txt-dim text-sm font-medium hover:text-txt transition-colors">Orders</Link>
                            {isAdmin && (
                                <Link to="/admin" className="text-warning text-sm font-medium hover:text-txt transition-colors">Admin</Link>
                            )}
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-txt-dim">{user.firstName || user.Email}</span>
                                <button onClick={logout} className="px-3 py-1.5 text-xs rounded-md border border-bdr text-txt-dim hover:text-danger hover:border-danger transition-colors">
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/login" className="px-4 py-2 text-sm rounded-lg border border-bdr text-txt hover:bg-surface-2 transition-colors">Sign In</Link>
                            <Link to="/register" className="px-4 py-2 text-sm rounded-lg gradient-bg text-white font-medium hover:opacity-90 transition-opacity">Sign Up</Link>
                        </div>
                    )}
                </div>

                {/* Mobile toggle */}
                <button className="md:hidden text-txt text-xl" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-surface border-t border-bdr px-4 py-4 flex flex-col gap-3">
                    <form onSubmit={handleSearch} className="flex">
                        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="flex-1 px-3 py-2 rounded-l-lg bg-bg border border-bdr text-txt text-sm" />
                        <button type="submit" className="px-3 py-2 gradient-bg text-white rounded-r-lg text-sm">Go</button>
                    </form>
                    <Link to="/" onClick={() => setIsOpen(false)} className="text-txt-dim text-sm py-2 hover:text-txt">Home</Link>
                    <Link to="/about" onClick={() => setIsOpen(false)} className="text-txt-dim text-sm py-2 hover:text-txt">About</Link>
                    {user ? (
                        <>
                            <Link to="/cart" onClick={() => setIsOpen(false)} className="text-txt-dim text-sm py-2 hover:text-txt">Cart ({cartCount})</Link>
                            <Link to="/orders" onClick={() => setIsOpen(false)} className="text-txt-dim text-sm py-2 hover:text-txt">Orders</Link>
                            {isAdmin && <Link to="/admin" onClick={() => setIsOpen(false)} className="text-warning text-sm py-2 hover:text-txt">Admin</Link>}
                            <button onClick={() => { logout(); setIsOpen(false); }} className="text-left text-danger text-sm py-2">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" onClick={() => setIsOpen(false)} className="text-txt-dim text-sm py-2 hover:text-txt">Sign In</Link>
                            <Link to="/register" onClick={() => setIsOpen(false)} className="text-primary text-sm py-2 font-medium">Sign Up</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
