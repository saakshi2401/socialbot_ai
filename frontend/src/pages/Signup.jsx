import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Bot, ArrowRight } from 'lucide-react';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface p-8 rounded-3xl border border-surfaceLight shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary/10 p-3 rounded-2xl mb-4">
            <Bot className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-textMain">Create account</h2>
          <p className="text-textMuted mt-2">Join SocialBot AI today</p>
        </div>

        {error && <div className="bg-red-500/10 text-red-500 p-3 rounded-lg mb-6 text-sm text-center border border-red-500/20">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-textMuted mb-2">Full Name</label>
            <input
              type="text"
              required
              className="w-full bg-background border border-surfaceLight text-textMain rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textMuted mb-2">Email Address</label>
            <input
              type="email"
              required
              className="w-full bg-background border border-surfaceLight text-textMain rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textMuted mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full bg-background border border-surfaceLight text-textMain rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center space-x-2"
          >
            <span>Sign Up</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 text-center text-textMuted">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-purple-400 font-medium">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
