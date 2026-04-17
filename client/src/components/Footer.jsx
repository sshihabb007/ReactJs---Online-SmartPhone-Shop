const Footer = () => {
    return (
        <footer className="bg-surface border-t border-bdr mt-auto">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-bold text-txt mb-3">Smart<span className="gradient-text">Phone</span>Shop</h3>
                        <p className="text-txt-dim text-sm leading-relaxed">Your trusted destination for the latest smartphones at the best prices.</p>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-txt mb-3 uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-txt-dim">
                            <li><a href="/" className="hover:text-txt transition-colors">Home</a></li>
                            <li><a href="/about" className="hover:text-txt transition-colors">About Us</a></li>
                            <li><a href="/support" className="hover:text-txt transition-colors">Support</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-txt mb-3 uppercase tracking-wider">Contact</h4>
                        <ul className="space-y-2 text-sm text-txt-dim">
                            <li>Email: support@smartphoneshop.com</li>
                            <li>Phone: +880-1234-567890</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-bdr mt-8 pt-6 text-center text-xs text-txt-dim">
                    &copy; {new Date().getFullYear()} SmartPhoneShop by{' '}
                    <a href="https://sshihabb007.github.io/Shihab/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Mehedi Hasan Shihab
                    </a>. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
