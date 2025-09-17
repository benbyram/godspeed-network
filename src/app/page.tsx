'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface VenueMarkerProps {
  id: string;
  name: string;
  type: 'church' | 'home';
  amenities: {
    wifi: boolean;
    coffee: boolean;
    outlets: boolean;
  };
  availability: string;
  description: string;
}

function VenueMarker({ name, type, amenities, availability, description }: VenueMarkerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  
  const markerColor = type === 'church' ? 'bg-blue-500' : 'bg-green-500';
  const markerIcon = type === 'church' ? '⛪' : '🏠';
  
  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  return (
    <div className="relative">
      {/* Marker */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-8 h-8 ${markerColor} rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg hover:scale-110 transition-transform cursor-pointer`}
      >
        {markerIcon}
      </button>
      
      {/* Popup */}
      {isOpen && (
        <div ref={popupRef} className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-4 w-80 z-10 border">
          {/* Arrow pointing down */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
          
          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{name}</h3>
              <p className="text-sm text-gray-600 capitalize">{type} venue</p>
            </div>
            
            <p className="text-sm text-gray-700">{description}</p>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Amenities</h4>
              <div className="flex gap-4 text-sm">
                <div className={`flex items-center gap-1 ${amenities.wifi ? 'text-green-600' : 'text-gray-400'}`}>
                  <span>💻</span>
                  <span>{amenities.wifi ? 'WiFi' : 'No WiFi'}</span>
                </div>
                <div className={`flex items-center gap-1 ${amenities.coffee ? 'text-green-600' : 'text-gray-400'}`}>
                  <span>☕</span>
                  <span>{amenities.coffee ? 'Coffee' : 'No Coffee'}</span>
                </div>
                <div className={`flex items-center gap-1 ${amenities.outlets ? 'text-green-600' : 'text-gray-400'}`}>
                  <span>🔌</span>
                  <span>{amenities.outlets ? 'Outlets' : 'No Outlets'}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Availability</h4>
              <p className="text-sm text-gray-600">{availability}</p>
            </div>
            
            <div className="flex gap-2 pt-2">
              <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors">
                Book Now
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [selectedCity, setSelectedCity] = useState('Los Angeles');
  
  const cities = ['Los Angeles', 'Oakland', 'San Francisco', 'San Rafael'];
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a3636' }}>
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50" style={{ backgroundColor: '#1a3636' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">GODSPEED</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-white border border-gray-400 rounded hover:bg-gray-700 transition-colors">
                Sign In
              </button>
              <Link href="/waitlist" className="px-4 py-2 rounded text-black font-medium" style={{ backgroundColor: '#e0b96f' }}>
                Join Waitlist
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* City Selection Bar */}
      <div className="pt-16 pb-4" style={{ backgroundColor: '#1a3636' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`text-sm font-medium transition-colors relative ${
                  selectedCity === city 
                    ? 'text-gray-200' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {city}
                {selectedCity === city && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: '#e0b96f' }}></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16" style={{ backgroundColor: '#1a3636' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif" style={{ color: '#e0b96f' }}>
              Godspeed Network
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-gray-200">
              A coworking network for young professionals in LA. Work from church buildings, homes, and unique spaces across the city — all under one simple, affordable subscription.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/waitlist" className="px-8 py-4 rounded-lg text-lg font-semibold text-black font-medium" style={{ backgroundColor: '#e0b96f' }}>
                Join Waitlist
              </Link>
              <button className="px-8 py-4 rounded-lg text-lg font-semibold text-gray-200 border border-gray-400 hover:bg-gray-700 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Venues Section */}
      <section id="venues" className="py-16" style={{ backgroundColor: '#1a3636' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif" style={{ color: '#e0b96f' }}>
                Echo Park, Los Angeles
              </h2>
              <p className="text-lg text-gray-300 mb-2">160 Glendale Blvd Los Angeles, CA</p>
              <p className="text-lg text-gray-300 mb-6">Open: 24/7 for members</p>
              <p className="text-lg text-gray-200 leading-relaxed">
                Right where Silver Lake meets Downtown LA, our Echo Park location offers the perfect blend of urban energy and creative inspiration. This converted church space features high ceilings, natural light, and a community of innovative professionals working on everything from tech startups to creative projects.
              </p>
            </div>
            
            {/* Right Column - Image Gallery */}
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden shadow-2xl" style={{ border: '2px solid #e0b96f' }}>
                <div className="h-96 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center text-gray-300">
                    <div className="text-6xl mb-4">🏢</div>
                    <p className="text-lg">Modern Coworking Space</p>
                    <p className="text-sm text-gray-400">High ceilings, natural light, community workspace</p>
                  </div>
                </div>
                
                {/* Navigation Arrows */}
                <button className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors">
                  <span className="text-gray-600">←</span>
                </button>
                <button className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors">
                  <span className="text-gray-600">→</span>
                </button>
                
                {/* Pagination Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16" style={{ backgroundColor: '#1a3636' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif" style={{ color: '#e0b96f' }}>Our Venues</h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Discover coworking spaces across Los Angeles. Click on any venue to see amenities and availability.
            </p>
          </div>
          
          {/* Map Container */}
          <div className="relative bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
            <div className="h-96 md:h-[500px] bg-gradient-to-br from-blue-50 to-indigo-100 relative">
              {/* Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-50"></div>
              
              {/* LA Area Labels */}
              <div className="absolute top-8 left-8 text-sm font-semibold text-gray-600">Downtown LA</div>
              <div className="absolute top-16 left-16 text-sm font-semibold text-gray-600">Echo Park</div>
              <div className="absolute top-24 right-24 text-sm font-semibold text-gray-600">Pasadena</div>
              <div className="absolute bottom-20 left-20 text-sm font-semibold text-gray-600">Alhambra</div>
              <div className="absolute bottom-16 right-16 text-sm font-semibold text-gray-600">Sierra Madre</div>
              
              {/* Venue Markers */}
              <div className="absolute top-20 left-20">
                <VenueMarker 
                  id="grace-church"
                  name="Grace Community Church"
                  type="church"
                  amenities={{ wifi: true, coffee: true, outlets: true }}
                  availability="Mon-Fri: 8AM-6PM"
                  description="Beautiful church sanctuary with high ceilings and natural light"
                />
              </div>
              
              <div className="absolute top-32 right-32">
                <VenueMarker 
                  id="pasadena-home"
                  name="Pasadena Creative House"
                  type="home"
                  amenities={{ wifi: true, coffee: false, outlets: true }}
                  availability="Mon-Fri: 9AM-5PM"
                  description="Cozy home office space with garden views"
                />
              </div>
              
              <div className="absolute bottom-24 left-24">
                <VenueMarker 
                  id="alhambra-church"
                  name="St. Mary's Church Hall"
                  type="church"
                  amenities={{ wifi: true, coffee: true, outlets: true }}
                  availability="Mon-Fri: 7AM-7PM"
                  description="Spacious hall with tables and comfortable seating"
                />
              </div>
              
              <div className="absolute bottom-20 right-20">
                <VenueMarker 
                  id="sierra-madre-home"
                  name="Sierra Madre Studio"
                  type="home"
                  amenities={{ wifi: true, coffee: true, outlets: true }}
                  availability="Mon-Fri: 8AM-8PM"
                  description="Artist studio converted to coworking space"
                />
              </div>
              
              <div className="absolute top-40 left-40">
                <VenueMarker 
                  id="echo-park-church"
                  name="Echo Park Community Center"
                  type="church"
                  amenities={{ wifi: true, coffee: false, outlets: true }}
                  availability="Mon-Fri: 9AM-4PM"
                  description="Community center with meeting rooms and open workspace"
                />
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-300">Church Venues</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-300">Home Venues</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300">💻 WiFi</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300">☕ Coffee</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300">🔌 Outlets</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-16" style={{ backgroundColor: '#1a3636' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif" style={{ color: '#e0b96f' }}>The Problem</h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Remote and hybrid workers in Los Angeles face significant challenges
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">High Costs</h3>
              <p className="text-gray-300">WeWork, Soho House memberships are expensive and out of reach for many young professionals</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Limited Access</h3>
              <p className="text-gray-300">Locations are centralized downtown, not accessible to neighborhood-based workers</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Isolation</h3>
              <p className="text-gray-300">Working alone at home leads to loneliness and decreased productivity</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏛️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Underutilized Spaces</h3>
              <p className="text-gray-300">Churches, homes, and cultural venues sit empty during weekdays</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-16" style={{ backgroundColor: '#1a3636' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif" style={{ color: '#e0b96f' }}>Our Solution</h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Godspeed Network transforms underused venues into ready-to-work coworking spaces
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💵</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Affordable</h3>
              <p className="text-gray-300">Monthly membership that won&apos;t break the bank</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🗺️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Distributed Network</h3>
              <p className="text-gray-300">Spaces across LA: Pasadena, Alhambra, Sierra Madre, Echo Park</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Flexible</h3>
              <p className="text-gray-300">Drop in for a few hours or work all day</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Community</h3>
              <p className="text-gray-300">Built-in network of young professionals and creative entrepreneurs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="contact" className="py-16" style={{ backgroundColor: '#e0b96f' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black font-serif">Ready to Join?</h2>
          <p className="text-xl text-black mb-8 max-w-3xl mx-auto">
            Be part of the future of coworking. Join our waitlist to get early access and special launch pricing.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
              />
              <Link href="/waitlist" className="px-6 py-3 rounded-lg font-semibold text-white transition-colors" style={{ backgroundColor: '#1a3636' }}>
                Join Waitlist
              </Link>
            </div>
          </div>
          <p className="text-black text-sm mt-4">
            Seeking $250k–$500k to build the platform and expand across LA
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12" style={{ backgroundColor: '#1a3636' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-white font-serif">Godspeed Network</h3>
            <p className="text-gray-300 mb-6">
              Affordable. Flexible. Community-driven coworking.<br />
              Work anywhere. Belong everywhere.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
