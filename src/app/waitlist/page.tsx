'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#1a3636' }}>
        <div className="text-center max-w-2xl mx-auto px-4">
          {/* Celebration Animation */}
          <div className="mb-8">
            <div className="text-8xl mb-4 animate-bounce">🎉</div>
            <div className="text-6xl mb-4 animate-pulse">✨</div>
            <div className="text-8xl mb-4 animate-bounce">🚀</div>
          </div>
          
          {/* Main Message */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif" style={{ color: '#e0b96f' }}>
            YOU'RE IN!!!!!!!!!
          </h1>
          
          {/* Subtitle */}
          <p className="text-2xl md:text-3xl text-gray-200 mb-8 font-medium">
            Welcome to the Godspeed Network family! 🎊
          </p>
          
          {/* Details */}
          <div className="bg-gray-800 rounded-2xl p-8 mb-8 border-2" style={{ borderColor: '#e0b96f' }}>
            <p className="text-lg text-gray-300 mb-4">
              We&apos;re so excited to have you join our community of innovative professionals! 
            </p>
            <p className="text-lg text-gray-300 mb-4">
              You&apos;ll be the first to know when we launch our coworking spaces across LA. 
              Get ready for exclusive early access and special launch pricing! 💫
            </p>
            <p className="text-lg text-gray-300">
              Keep an eye on your inbox for updates and sneak peeks of our amazing venues! 📧✨
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="px-8 py-4 rounded-lg text-lg font-semibold text-black font-medium transition-transform hover:scale-105"
              style={{ backgroundColor: '#e0b96f' }}
            >
              Back to Home
            </Link>
            <button 
              onClick={() => {
                setIsSubmitted(false);
                setEmail('');
              }}
              className="px-8 py-4 rounded-lg text-lg font-semibold text-gray-200 border border-gray-400 hover:bg-gray-700 transition-colors"
            >
              Add Another Email
            </button>
          </div>
          
          {/* Fun Footer */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 text-sm">
              Made with 💖 by the Godspeed Network team
            </p>
            <div className="flex justify-center space-x-4 mt-4 text-2xl">
              <span className="animate-pulse">🏢</span>
              <span className="animate-bounce">☕</span>
              <span className="animate-pulse">💻</span>
              <span className="animate-bounce">🌟</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a3636' }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50" style={{ backgroundColor: '#1a3636' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-white">GODSPEED</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="px-4 py-2 text-white border border-gray-400 rounded hover:bg-gray-700 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif" style={{ color: '#e0b96f' }}>
              Join Our Waitlist
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Be the first to experience affordable, community-driven coworking across Los Angeles
            </p>
          </div>

          {/* Form Container */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800 rounded-2xl p-8 border-2" style={{ borderColor: '#e0b96f' }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-lg font-medium text-gray-200 mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 text-lg border-2 border-gray-600 focus:border-yellow-400 focus:outline-none transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="name" className="block text-lg font-medium text-gray-200 mb-3">
                    Full Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 text-lg border-2 border-gray-600 focus:border-yellow-400 focus:outline-none transition-colors"
                    placeholder="What should we call you?"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-lg font-medium text-gray-200 mb-3">
                    Preferred Location
                  </label>
                  <select
                    id="location"
                    className="w-full px-4 py-4 rounded-lg text-gray-900 text-lg border-2 border-gray-600 focus:border-yellow-400 focus:outline-none transition-colors"
                  >
                    <option value="">Select your preferred area</option>
                    <option value="echo-park">Echo Park</option>
                    <option value="pasadena">Pasadena</option>
                    <option value="alhambra">Alhambra</option>
                    <option value="sierra-madre">Sierra Madre</option>
                    <option value="downtown">Downtown LA</option>
                    <option value="any">Any location works!</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className={`w-full py-4 rounded-lg text-xl font-semibold transition-all duration-300 ${
                    isLoading || !email
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'text-black hover:scale-105 hover:shadow-lg'
                  }`}
                  style={{ 
                    backgroundColor: isLoading || !email ? '#4a5568' : '#e0b96f' 
                  }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black mr-3"></div>
                      Joining the waitlist...
                    </div>
                  ) : (
                    'Join the Waitlist! 🚀'
                  )}
                </button>
              </form>

              {/* Benefits */}
              <div className="mt-8 pt-8 border-t border-gray-600">
                <h3 className="text-xl font-semibold text-gray-200 mb-4">What you&apos;ll get:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🎯</span>
                    <span className="text-gray-300">Early access to all venues</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">💰</span>
                    <span className="text-gray-300">Special launch pricing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📧</span>
                    <span className="text-gray-300">Exclusive updates</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🎉</span>
                    <span className="text-gray-300">Invite to launch events</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-4">Already joined by</p>
            <div className="flex justify-center items-center space-x-8 text-gray-300">
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: '#e0b96f' }}>500+</div>
                <div className="text-sm">Professionals</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: '#e0b96f' }}>15+</div>
                <div className="text-sm">Venues</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: '#e0b96f' }}>5</div>
                <div className="text-sm">Neighborhoods</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
