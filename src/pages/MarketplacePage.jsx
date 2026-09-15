import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

const cities = [
  { 
    name: 'Copenhagen',
    vibe: 'Indre By',
    img: '/assets/vinylroom.jpg',
    desc: 'Vibrant Scandinavian design and cozy vinyl vibes',
    url: 'https://travel-vrse-25hrs.vercel.app/25-hours-copenhagen'
  },
  { 
    name: 'London',
    vibe: 'South Bank',
    img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800',
    desc: 'The historic capital of England',
    url: 'https://travel-vrse-25hrs.vercel.app/play/sea-containers/'
  },
  { 
    name: 'London',
    vibe: 'Ted Lasso, Richmond',
    img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800',
    desc: 'Explore the charming neighborhood of Richmond',
    url: 'https://travel-vrse-25hrs.vercel.app/vibe/london/richmond/ted-lasso/'
  },
  { 
    name: 'Las Vegas',
    vibe: 'East of the Strip',
    img: 'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?auto=format&fit=crop&q=80&w=800',
    desc: 'Iconic entertainment and luxury at the Virgin Hotel',
    url: 'https://travel-vrse-virginhotel.vercel.app/vibe/london/richmond/ted-lasso/'
  },
  { 
    name: 'Barcelona',
    vibe: 'Cruise',
    img: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'Setting sail from the heart of Catalonia',
    url: '/barcelona'
  },
  { 
    name: 'Manchester', 
    img: 'https://images.pexels.com/photos/2884144/pexels-photo-2884144.jpeg?auto=compress&cs=tinysrgb&w=800',
    desc: 'The heart of British industrial heritage'
  },
  { 
    name: 'Palm Springs', 
    img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800',
    desc: 'A desert oasis of mid-century modern style'
  }
];

const MarketplacePage = () => {
    return (
        <Layout>
            <div className="marketplace-page" style={{ 
                background: 'var(--color-navy-deep)', 
                minHeight: '100vh',
                paddingTop: '150px',
                paddingBottom: '100px',
                position: 'relative'
            }}>
                <div className="container">
                    <Helmet>
                        <title>Vibe Conversion Engine | Travelvrse</title>
                        <meta name="description" content="Discover and explore rewarded 3D hotel experiences from around the world. Connect with iconic destinations and earn exclusive travel rewards." />
                    </Helmet>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <h4 className="text-cyan animate-fade-up" style={{ letterSpacing: '2px', fontWeight: '800', marginBottom: '1rem' }}>DISCOVER</h4>
                        <div className="beta-badge-premium">BETA</div>
                        <h1 className="hero-title animate-fade-up delay-1" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '20px' }}>
                            <span className="text-gradient">Vibe Conversion Engine</span>
                        </h1>
                        <p className="animate-fade-up delay-2" style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
                            Get rewarded to check out hotels and resorts with the best local vibes
                        </p>
                    </div>

                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                        gap: '40px',
                        padding: '20px'
                    }}>
                        {cities.map((city, index) => (
                            <div 
                                key={`${city.name}-${city.vibe || 'base'}`} 
                                className={`glass-card animate-fade-up delay-${(index % 3) + 1}`}
                                style={{ 
                                    padding: '0',
                                    borderRadius: '24px', 
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    cursor: city.url ? 'pointer' : 'default'
                                }}
                                onClick={() => city.url && window.open(city.url, '_blank')}
                                onMouseOver={(e) => {
                                    if (city.url) {
                                        e.currentTarget.style.transform = 'translateY(-10px)';
                                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,229,255,0.2)';
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (city.url) {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }
                                }}
                            >
                                <div style={{ height: '300px', position: 'relative', overflow: 'hidden' }}>
                                    <img 
                                        src={city.img} 
                                        alt={city.name} 
                                        style={{ 
                                            width: '100%', 
                                            height: '100%', 
                                            objectFit: 'cover',
                                            transition: 'transform 0.5s ease'
                                        }} 
                                        className="city-image"
                                    />
                                    <div style={{ 
                                        position: 'absolute', 
                                        inset: 0, 
                                        background: 'linear-gradient(to top, rgba(5,11,20,0.9) 0%, transparent 60%)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        padding: '30px'
                                    }}>
                                        <h3 style={{ color: 'white', margin: 0, fontSize: '2rem' }}>{city.name}</h3>
                                        <div style={{ 
                                            color: 'var(--color-cyan-neon)', 
                                            fontWeight: 'bold', 
                                            fontSize: '1.1rem', 
                                            textTransform: 'uppercase', 
                                            letterSpacing: '1px', 
                                            marginTop: '4px',
                                            minHeight: '1.4rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            {city.vibe || '\u00A0'}
                                        </div>
                                        <p style={{ 
                                            color: 'rgba(255,255,255,0.7)', 
                                            margin: '5px 0 0', 
                                            fontSize: '1rem',
                                            minHeight: '2.8rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            {city.desc}
                                        </p>
                                    </div>
                                </div>
                                <div style={{ padding: '30px', flexGrow: 1, display: 'flex', alignItems: 'flex-end' }}>
                                    {city.url ? (
                                        <button className="btn btn-primary" style={{ width: '100%' }}>
                                            Visit Challenge
                                        </button>
                                    ) : (
                                        <button className="btn btn-outline" style={{ width: '100%', opacity: 0.6, cursor: 'not-allowed', borderStyle: 'dashed' }}>
                                            Coming Soon
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </Layout>
    );
};

export default MarketplacePage;
