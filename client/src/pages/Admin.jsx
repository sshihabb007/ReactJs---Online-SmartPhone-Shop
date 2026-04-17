import { useState, useEffect } from 'react';
import API from '../api';

const Admin = () => {
    const [tab, setTab] = useState('dashboard');
    const [stats, setStats] = useState(null);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [orderFilter, setOrderFilter] = useState('pending');
    const [loading, setLoading] = useState(false);

    useEffect(() => { if (tab === 'dashboard') fetchStats(); }, [tab]);
    useEffect(() => { if (tab === 'orders') fetchOrders(); }, [tab, orderFilter]);
    useEffect(() => { if (tab === 'users') fetchUsers(); }, [tab]);

    const fetchStats = async () => {
        setLoading(true);
        try { const res = await API.get('/admin/stats'); setStats(res.data.stats); } catch {}
        setLoading(false);
    };

    const fetchOrders = async () => {
        setLoading(true);
        try { const res = await API.get(`/admin/orders?status=${orderFilter}`); setOrders(res.data.orders); } catch {}
        setLoading(false);
    };

    const fetchUsers = async () => {
        setLoading(true);
        try { const res = await API.get('/admin/users'); setUsers(res.data.users); } catch {}
        setLoading(false);
    };

    const toggleOrderStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'deleverd' ? 'not deleverd' : 'deleverd';
        await API.put(`/admin/orders/${id}/status`, { status: newStatus });
        fetchOrders();
    };

    const tabs = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'orders', label: 'Orders' },
        { id: 'users', label: 'Users' },
    ];

    return (
        <div className="min-h-screen bg-bg py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold text-txt mb-6">Admin Panel</h1>

                {/* Tabs */}
                <div className="flex gap-1 bg-surface rounded-lg p-1 border border-bdr mb-8 w-fit">
                    {tabs.map(t => (
                        <button key={t.id} onClick={() => setTab(t.id)}
                            className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${tab === t.id ? 'gradient-bg text-white' : 'text-txt-dim hover:text-txt'}`}>
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Dashboard */}
                {tab === 'dashboard' && stats && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: 'Total Products', value: stats.totalProducts, color: 'text-primary' },
                            { label: 'Total Users', value: stats.totalUsers, color: 'text-accent' },
                            { label: 'Pending Orders', value: stats.pendingOrders, color: 'text-warning' },
                            { label: 'Revenue', value: `৳${stats.totalRevenue.toLocaleString()}`, color: 'text-success' },
                        ].map((card, i) => (
                            <div key={i} className="bg-surface rounded-xl border border-bdr p-6">
                                <p className="text-xs text-txt-dim uppercase tracking-wider mb-2">{card.label}</p>
                                <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Orders */}
                {tab === 'orders' && (
                    <div>
                        <div className="flex gap-2 mb-6">
                            {['pending', 'delivered'].map(f => (
                                <button key={f} onClick={() => setOrderFilter(f)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium ${orderFilter === f ? 'gradient-bg text-white' : 'bg-surface border border-bdr text-txt-dim hover:text-txt'}`}>
                                    {f === 'pending' ? 'Pending' : 'Delivered'}
                                </button>
                            ))}
                        </div>
                        {loading ? (
                            <div className="flex justify-center py-12"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
                        ) : orders.length === 0 ? (
                            <p className="text-txt-dim text-center py-12">No orders found</p>
                        ) : (
                            <div className="bg-surface rounded-xl border border-bdr overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="border-b border-bdr">
                                        <tr className="text-left text-txt-dim">
                                            <th className="p-4">Product</th>
                                            <th className="p-4">Email</th>
                                            <th className="p-4">Date</th>
                                            <th className="p-4">Address</th>
                                            <th className="p-4">Price</th>
                                            <th className="p-4">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-bdr">
                                        {orders.map(o => (
                                            <tr key={o.O_ID}>
                                                <td className="p-4 text-txt">{o.Product}</td>
                                                <td className="p-4 text-txt-dim">{o.Email}</td>
                                                <td className="p-4 text-txt-dim">{o.Date}</td>
                                                <td className="p-4 text-txt-dim max-w-[200px] truncate">{o.Address}</td>
                                                <td className="p-4 text-txt font-semibold">৳{o.Price.toLocaleString()}</td>
                                                <td className="p-4">
                                                    <button onClick={() => toggleOrderStatus(o.O_ID, o.Stutas)}
                                                        className={`text-xs px-3 py-1.5 rounded-md font-medium ${o.Stutas === 'deleverd' ? 'bg-warning/10 text-warning hover:bg-warning/20' : 'bg-success/10 text-success hover:bg-success/20'} transition-colors`}>
                                                        {o.Stutas === 'deleverd' ? 'Mark Pending' : 'Mark Delivered'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Users */}
                {tab === 'users' && (
                    <div className="bg-surface rounded-xl border border-bdr overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b border-bdr">
                                <tr className="text-left text-txt-dim">
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Phone</th>
                                    <th className="p-4">Role</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-bdr">
                                {users.map((u, i) => (
                                    <tr key={i}>
                                        <td className="p-4 text-txt">{u.firstName} {u.lastName}</td>
                                        <td className="p-4 text-txt-dim">{u.Email}</td>
                                        <td className="p-4 text-txt-dim">{u.Phone}</td>
                                        <td className="p-4">
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${u.Type === 'admin' ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'}`}>
                                                {u.Type}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
