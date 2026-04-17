import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-bg px-4">
            <div className="bg-surface p-8 md:p-10 rounded-2xl w-full max-w-md border border-bdr shadow-2xl shadow-black/20">
                <h2 className="text-center text-2xl font-bold text-txt mb-2">Welcome Back</h2>
                <p className="text-center text-txt-dim text-sm mb-8">Sign in to your account</p>

                {error && <div className="bg-danger/10 text-danger text-sm p-3 rounded-lg mb-6">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-1.5 text-txt-dim text-xs font-medium uppercase tracking-wider">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-field" placeholder="you@example.com" />
                    </div>
                    <div>
                        <label className="block mb-1.5 text-txt-dim text-xs font-medium uppercase tracking-wider">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-field" placeholder="••••••••" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full py-3 gradient-bg text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p className="text-center text-txt-dim text-sm mt-6">
                    Don't have an account? <Link to="/register" className="text-primary font-medium hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
