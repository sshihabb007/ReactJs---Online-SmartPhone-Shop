const About = () => (
    <div className="min-h-screen bg-bg py-12 px-4">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold gradient-text text-center mb-10">About Us</h1>

            {/* Developer Profile */}
            <div className="bg-surface border border-bdr rounded-2xl mb-8">
                <div className="h-36 gradient-bg rounded-t-2xl" />
                <div className="px-8 pb-8">
                    <img
                        src="https://avatars.githubusercontent.com/sshihabb007"
                        alt="Mehedi Hasan Shihab"
                        className="w-28 h-28 rounded-full border-4 border-surface object-cover shadow-lg -mt-16 relative z-10"
                    />
                    <h2 className="text-2xl font-bold text-txt mt-3">Mehedi Hasan Shihab</h2>
                    <p className="text-primary text-sm font-medium mt-1">Sr. Software Engineer | Full-Stack Developer | AI Developer</p>
                    <p className="text-txt-dim text-sm mt-3 leading-relaxed max-w-2xl">
                        An intelligent, self-motivated Web & Software Developer exploring Web Development, ASP.NET, MySQL, React, Node.js, and beyond.
                        Currently serving as Senior Software Engineer at Bangladesh Education and Research Institute (BERI) and Remote Web Developer at MAC Technology Australia.
                    </p>

                    {/* Social Links */}
                    <div className="flex gap-3 mt-5 flex-wrap">
                        <a href="https://www.linkedin.com/in/mehedi-hasan-shihab-30a445b6/" target="_blank" rel="noopener noreferrer"
                            className="px-4 py-2 rounded-lg bg-[#0077b5]/10 text-[#0077b5] text-xs font-semibold hover:bg-[#0077b5]/20 transition-colors">
                            LinkedIn
                        </a>
                        <a href="https://github.com/sshihabb007" target="_blank" rel="noopener noreferrer"
                            className="px-4 py-2 rounded-lg bg-txt/5 text-txt text-xs font-semibold hover:bg-txt/10 transition-colors">
                            GitHub
                        </a>
                        <a href="mailto:sshihabb007@gmail.com"
                            className="px-4 py-2 rounded-lg bg-danger/10 text-danger text-xs font-semibold hover:bg-danger/20 transition-colors">
                            Email
                        </a>
                        <a href="https://www.facebook.com/sshihabb007/" target="_blank" rel="noopener noreferrer"
                            className="px-4 py-2 rounded-lg bg-[#1877f2]/10 text-[#1877f2] text-xs font-semibold hover:bg-[#1877f2]/20 transition-colors">
                            Facebook
                        </a>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { value: '19', label: 'Projects' },
                    { value: '7+', label: 'Years Experience' },
                    { value: '14', label: 'Tech Skills' },
                    { value: '3.77', label: 'M.Sc. CGPA' },
                ].map((stat, i) => (
                    <div key={i} className="bg-surface border border-bdr rounded-xl p-5 text-center">
                        <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                        <p className="text-txt-dim text-xs mt-1 uppercase tracking-wider">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* About the Shop */}
            <div className="bg-surface border border-bdr rounded-xl p-8 space-y-5">
                <h3 className="text-xl font-bold text-txt">About SmartPhoneShop</h3>
                <p className="text-txt-dim leading-relaxed">
                    <strong className="text-txt">SmartPhoneShop</strong> is a full-stack e-commerce platform built and maintained by Mehedi Hasan Shihab.
                    Originally developed using PHP, JavaScript, and jQuery, it has been modernized to use <strong className="text-txt">React.js</strong> on the frontend
                    and <strong className="text-txt">Node.js (Express)</strong> on the backend, with MySQL as the database.
                </p>
                <p className="text-txt-dim leading-relaxed">
                    The platform allows customers to browse premium smartphones from top brands, add them to cart, and checkout seamlessly.
                    Administrators have full control over product inventory and order management through a dedicated admin panel.
                </p>
                <div className="pt-4">
                    <a href="https://sshihabb007.github.io/Shihab/" target="_blank" rel="noopener noreferrer"
                        className="inline-block px-6 py-2.5 gradient-bg text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                        Visit Developer Portfolio →
                    </a>
                </div>
            </div>
        </div>
    </div>
);

export default About;
