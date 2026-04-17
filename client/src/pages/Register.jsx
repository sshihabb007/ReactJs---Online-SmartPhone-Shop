import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', gender: 'Male', dob: '', password: '', phone: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
        setLoading(true);
        try {
            await register(form);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-bg px-4 py-8">
            <div className="bg-surface p-8 md:p-10 rounded-2xl w-full max-w-md border border-bdr shadow-2xl shadow-black/20">
                <h2 className="text-center text-2xl font-bold text-txt mb-2">Create Account</h2>
                <p className="text-center text-txt-dim text-sm mb-8">Join SmartPhoneShop today</p>

                {error && <div className="bg-danger/10 text-danger text-sm p-3 rounded-lg mb-6">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1.5 text-txt-dim text-xs font-medium uppercase tracking-wider">First Name</label>
                            <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required className="input-field" />
                        </div>
                        <div>
                            <label className="block mb-1.5 text-txt-dim text-xs font-medium uppercase tracking-wider">Last Name</label>
                            <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required className="input-field" />
                        </div>
                    </div>
                    <div>
                        <label className="block mb-1.5 text-txt-dim text-xs font-medium uppercase tracking-wider">Email</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required className="input-field" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1.5 text-txt-dim text-xs font-medium uppercase tracking-wider">Gender</label>
                            <select name="gender" value={form.gender} onChange={handleChange} className="input-field">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1.5 text-txt-dim text-xs font-medium uppercase tracking-wider">Date of Birth</label>
                            <input type="date" name="dob" value={form.dob} onChange={handleChange} required className="input-field" />
                        </div>
                    </div>
                    <div>
                        <label className="block mb-1.5 text-txt-dim text-xs font-medium uppercase tracking-wider">Phone</label>
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} required className="input-field" />
                    </div>
                    <div>
                        <label className="block mb-1.5 text-txt-dim text-xs font-medium uppercase tracking-wider">Password</label>
                        <input type="password" name="password" value={form.password} onChange={handleChange} required className="input-field" placeholder="Min 6 characters" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full py-3 gradient-bg text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 mt-2">
                        {loading ? 'Creating...' : 'Create Account'}
                    </button>
                </form>

                <p className="text-center text-txt-dim text-sm mt-6">
                    Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
