const Support = () => (
    <div className="min-h-screen bg-bg py-12 px-4">
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold gradient-text text-center mb-8">Customer Support</h1>
            <div className="bg-surface border border-bdr rounded-xl p-8">
                <p className="text-txt-dim mb-6 leading-relaxed">
                    If you are experiencing any issues with your orders or our services, please let us know. Our team is available 24/7 to help.
                </p>
                <form className="space-y-5">
                    <div>
                        <label className="block mb-1.5 text-txt-dim text-xs font-medium uppercase tracking-wider">Your Email</label>
                        <input type="email" placeholder="you@example.com" className="input-field" />
                    </div>
                    <div>
                        <label className="block mb-1.5 text-txt-dim text-xs font-medium uppercase tracking-wider">Question or Issue</label>
                        <textarea rows="5" placeholder="Describe your issue in detail..." className="input-field resize-none" />
                    </div>
                    <button type="submit" className="w-full py-3 gradient-bg text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity">
                        Submit Ticket
                    </button>
                </form>
            </div>
        </div>
    </div>
);

export default Support;
