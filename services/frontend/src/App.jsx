import { useState, useEffect } from 'react';
import { Recycle, TrendingUp, Package, LogOut, DollarSign, Clock, CheckCircle, MapPin, AlertCircle, Loader2 } from 'lucide-react';

// API Configuration
const API_BASE = '/api';

// Home Page Component - MOVED OUTSIDE App
const HomePage = ({ setCurrentPage }) => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 backdrop-blur-3xl"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <div className="flex justify-center mb-6 animate-bounce">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-2xl shadow-2xl">
              <Recycle className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Scrapzee
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Turn your waste into wealth. The smart way to recycle.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => setCurrentPage('login')}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Get Started
            </button>
            <button
              onClick={() => setCurrentPage('pricing')}
              className="px-8 py-4 bg-white text-green-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-green-200"
            >
              View Prices
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { 
            icon: DollarSign, 
            title: 'Best Prices', 
            desc: 'Get competitive rates for your scrap materials with transparent pricing',
            color: 'from-green-400 to-green-500' 
          },
          { 
            icon: MapPin, 
            title: 'Doorstep Pickup', 
            desc: 'Convenient collection service from your location at your preferred time',
            color: 'from-blue-400 to-blue-500' 
          },
          { 
            icon: Clock, 
            title: 'Quick Service', 
            desc: 'Fast processing and instant payment confirmation within 24 hours',
            color: 'from-purple-400 to-purple-500' 
          }
        ].map((feat, i) => (
          <div 
            key={i} 
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <div className={`bg-gradient-to-r ${feat.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
              <feat.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{feat.title}</h3>
            <p className="text-gray-600">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Login Page Component - MOVED OUTSIDE App
const LoginPage = ({ loginForm, setLoginForm, handleLogin, loading, error, setCurrentPage, setError }) => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4 py-12">
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-green-500 to-blue-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Recycle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
        <p className="text-gray-600 mt-2">Sign in to your account</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="login-email"
            type="email"
            value={loginForm.email}
            onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
            placeholder="you@example.com"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            value={loginForm.password}
            onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
            placeholder="••••••••"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      <div className="mt-6 text-center space-y-3">
        <button
          onClick={() => {
            setCurrentPage('register');
            setError(null);
          }}
          className="text-green-600 hover:text-green-700 font-medium transition-colors"
        >
          Don't have an account? Sign up
        </button>
        <div>
          <button
            onClick={() => {
              setCurrentPage('home');
              setError(null);
            }}
            className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
          >
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Register Page Component - MOVED OUTSIDE App
const RegisterPage = ({ registerForm, setRegisterForm, handleRegister, loading, error, setCurrentPage, setError }) => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4 py-12">
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-green-500 to-blue-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Recycle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
        <p className="text-gray-600 mt-2">Start recycling today</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-6">
        <div>
          <label htmlFor="register-name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            id="register-name"
            type="text"
            value={registerForm.name}
            onChange={(e) => setRegisterForm(prev => ({ ...prev, name: e.target.value }))}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
            placeholder="John Doe"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="register-email"
            type="email"
            value={registerForm.email}
            onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
            placeholder="you@example.com"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            id="register-password"
            type="password"
            value={registerForm.password}
            onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
            required
            minLength={6}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
            placeholder="••••••••"
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Creating account...</span>
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      <div className="mt-6 text-center space-y-3">
        <button
          onClick={() => {
            setCurrentPage('login');
            setError(null);
          }}
          className="text-green-600 hover:text-green-700 font-medium transition-colors"
        >
          Already have an account? Sign in
        </button>
        <div>
          <button
            onClick={() => {
              setCurrentPage('home');
              setError(null);
            }}
            className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
          >
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Dashboard Page Component - MOVED OUTSIDE App
const DashboardPage = ({ user, dashboard, dashboardLoading, setCurrentPage, handleLogout }) => (
  <div className="min-h-screen bg-gray-50">
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Recycle className="w-8 h-8 text-green-600" />
            <span className="text-xl font-bold text-gray-800">Scrapzee</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => setCurrentPage('dashboard')} 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Dashboard
            </button>
            <button 
              onClick={() => setCurrentPage('pricing')} 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Prices
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 hidden sm:block truncate max-w-xs">
              {user?.full_name || user?.email}
            </span>
            <button 
              onClick={handleLogout} 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>
      
      {dashboardLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-12 h-12 animate-spin text-green-600" />
        </div>
      ) : dashboard ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { 
                label: 'Total Requests', 
                value: dashboard.stats.total_requests, 
                icon: Package, 
                bgColor: 'bg-blue-100',
                textColor: 'text-blue-600'
              },
              { 
                label: 'Pending', 
                value: dashboard.stats.pending_requests, 
                icon: Clock, 
                bgColor: 'bg-yellow-100',
                textColor: 'text-yellow-600'
              },
              { 
                label: 'Completed', 
                value: dashboard.stats.completed_requests, 
                icon: CheckCircle, 
                bgColor: 'bg-green-100',
                textColor: 'text-green-600'
              },
              { 
                label: 'Total Earnings', 
                value: `₹${dashboard.stats.total_earnings}`, 
                icon: DollarSign, 
                bgColor: 'bg-purple-100',
                textColor: 'text-purple-600'
              }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`${stat.bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Requests</h2>
            {dashboard.recent_requests?.length > 0 ? (
              <div className="space-y-4">
                {dashboard.recent_requests.map(req => (
                  <div 
                    key={req.id} 
                    className="flex justify-between items-center p-4 border-2 border-gray-100 rounded-xl hover:border-green-200 hover:shadow-md transition-all duration-300"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">Request #{req.id}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(req.created_at).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">₹{req.estimated_price}</p>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        req.status === 'completed' ? 'bg-green-100 text-green-700' :
                        req.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-4">No requests yet</p>
                <button 
                  onClick={() => setCurrentPage('pricing')}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  View Pricing & Create Request
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500">Unable to load dashboard data</p>
        </div>
      )}
    </div>
  </div>
);

// Pricing Page Component - MOVED OUTSIDE App
const PricingPage = ({ user, categories, categoriesLoading, setCurrentPage }) => (
  <div className="min-h-screen bg-gray-50">
    {user && (
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Recycle className="w-8 h-8 text-green-600" />
              <span className="text-xl font-bold text-gray-800">Scrapzee</span>
            </div>
            <button 
              onClick={() => setCurrentPage('dashboard')} 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </nav>
    )}
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Current Prices</h1>
      <p className="text-gray-600 mb-8">Updated rates for all scrap categories</p>
      
      {categoriesLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-12 h-12 animate-spin text-green-600" />
        </div>
      ) : categories.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(cat => (
            <div 
              key={cat.id} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-green-400 to-blue-400 h-32 flex items-center justify-center">
                <Package className="w-16 h-16 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{cat.name}</h3>
                <p className="text-gray-600 text-sm mb-4 min-h-[40px]">{cat.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-3xl font-bold text-green-600">₹{cat.base_price}</p>
                    <p className="text-sm text-gray-500">per {cat.unit}</p>
                  </div>
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No categories available</p>
        </div>
      )}
      
      {!user && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setCurrentPage('home')}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Back to home
          </button>
        </div>
      )}
    </div>
  </div>
);

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [categories, setCategories] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    const savedToken = localStorage.getItem('scrapzee_token');
    if (savedToken) {
      setToken(savedToken);
      verifyToken(savedToken);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    if (token && user) {
      fetchDashboard();
    }
  }, [token, user]);

  const verifyToken = async (tkn) => {
    try {
      const res = await fetch(`${API_BASE}/auth/verify`, {
        headers: { 'Authorization': `Bearer ${tkn}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        handleLogout();
      }
    } catch (err) {
      console.error('Token verification failed', err);
      handleLogout();
    }
  };

  const fetchCategories = async () => {
    setCategoriesLoading(true);
    try {
      const res = await fetch(`${API_BASE}/pricing/categories`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error('Failed to fetch categories', err);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const fetchDashboard = async () => {
    if (!token) return;
    
    setDashboardLoading(true);
    try {
      const res = await fetch(`${API_BASE}/users/dashboard`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setDashboard(data);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard', err);
    } finally {
      setDashboardLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });

      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('scrapzee_token', data.token);
        setToken(data.token);
        setUser(data.user);
        setCurrentPage('dashboard');
        setLoginForm({ email: '', password: '' });
      } else {
        setError(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: registerForm.email,
          password: registerForm.password,
          full_name: registerForm.name
        })
      });

      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('scrapzee_token', data.token);
        setToken(data.token);
        setUser(data.user);
        setCurrentPage('dashboard');
        setRegisterForm({ name: '', email: '', password: '' });
      } else {
        setError(data.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('scrapzee_token');
    setToken(null);
    setUser(null);
    setDashboard(null);
    setCurrentPage('home');
    setError(null);
  };

  // Render current page
  if (!token) {
    if (currentPage === 'register') {
      return (
        <RegisterPage 
          registerForm={registerForm}
          setRegisterForm={setRegisterForm}
          handleRegister={handleRegister}
          loading={loading}
          error={error}
          setCurrentPage={setCurrentPage}
          setError={setError}
        />
      );
    }
    if (currentPage === 'login') {
      return (
        <LoginPage 
          loginForm={loginForm}
          setLoginForm={setLoginForm}
          handleLogin={handleLogin}
          loading={loading}
          error={error}
          setCurrentPage={setCurrentPage}
          setError={setError}
        />
      );
    }
    if (currentPage === 'pricing') {
      return (
        <PricingPage 
          user={user}
          categories={categories}
          categoriesLoading={categoriesLoading}
          setCurrentPage={setCurrentPage}
        />
      );
    }
    return <HomePage setCurrentPage={setCurrentPage} />;
  }

  if (currentPage === 'pricing') {
    return (
      <PricingPage 
        user={user}
        categories={categories}
        categoriesLoading={categoriesLoading}
        setCurrentPage={setCurrentPage}
      />
    );
  }
  
  return (
    <DashboardPage 
      user={user}
      dashboard={dashboard}
      dashboardLoading={dashboardLoading}
      setCurrentPage={setCurrentPage}
      handleLogout={handleLogout}
    />
  );
}

export default App;
