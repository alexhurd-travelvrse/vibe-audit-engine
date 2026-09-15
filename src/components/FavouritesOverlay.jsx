import React from 'react';
import { useGame } from '../context/GameContext';
import { useCreator } from '../context/CreatorContext';

const FavouritesOverlay = ({ onClose }) => {
    const { interestInsights, creator, backpack, favourites, toggleFavourite, travelStatus } = useGame();
    const profileScores = interestInsights || {};
    const { publicConfig } = useCreator();
    const brandingTitle = publicConfig?.home?.title?.toUpperCase() || "VIRTUAL EXPERIENCE";

    React.useEffect(() => {
        console.log('%c[FavouritesOverlay] Rendering with backpack items:', 'color: #ff00ff; font-weight: bold;', backpack);
        backpack.forEach((item, idx) => {
            console.log(`  [${idx}] ${item.title}:`, {
                id: item.id,
                type: item.type,
                hasImage: !!item.image,
                image: item.image
            });
        });
    }, [backpack]);

    const vibeCategories = [
        { id: 'luxuryRoom', title: 'Residence', image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=150&q=80' },
        { id: 'wellness', title: 'Wellness', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=150&q=80' },
        { id: 'dining', title: 'Dining', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=150&q=80' },
        { id: 'kidsActivities', title: 'Kids Activities', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=150&q=80' },
        { id: 'culture', title: 'Culture', image: 'https://images.unsplash.com/photo-1518911710364-17ec553bde5d?auto=format&fit=crop&w=150&q=80' },
        { id: 'entertainment', title: 'Shows', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=150&q=80' },
        { id: 'nightlife', title: 'Nightlife', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=150&q=80' },
        { id: 'fineWine', title: 'Wines', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=150&q=80' },
    ];

    return (
        <div className="favourites-overlay">
            <div className="favourites-panel glass-panel animate-fade-in">
                <div className="favourites-header">
                    <div>
                        <h2 className="panel-title" style={{ margin: 0 }}>FAVOURITES & BACKPACK</h2>
                        <p className="panel-subtitle" style={{ margin: 0 }}>CURATED FOR YOUR NEXT VOYAGE</p>
                    </div>
                    <button onClick={onClose} className="close-btn">✕</button>
                </div>

                <div className="favourites-scroll">
                    {/* Vibe Grid */}
                    <h3 className="panel-subtitle" style={{ color: '#FFD700', marginBottom: '1rem' }}>YOUR VIBE PROFILE</h3>
                    <div className="vibe-grid">
                        {vibeCategories.map(vibe => {
                            const score = profileScores[vibe.id] || 0;
                            const isActive = score > 0;
                            return (
                                <div key={vibe.id} className={`vibe-card ${isActive ? 'active' : ''}`}>
                                    <div style={{ color: isActive ? '#FFD700' : '#444', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                        {isActive ? '★' : '☆'}
                                    </div>
                                    <div style={{ fontSize: '0.7rem', fontWeight: 'bold', marginTop: '5px' }}>{vibe.title.toUpperCase()}</div>
                                    <img src={vibe.image} className="vibe-card-img" style={{ opacity: isActive ? 1 : 0.2 }} alt={vibe.title} />
                                    {isActive && <div style={{ fontSize: '0.6rem', color: '#FFD700', marginTop: '5px' }}>{score} PTS</div>}
                                </div>
                            );
                        })}
                    </div>

                    {/* Backpack Items */}
                    <h3 className="panel-subtitle" style={{ color: '#FFD700', marginBottom: '1.5rem' }}>BACKPACK ITEMS ({backpack.length})</h3>
                    <div className="curated-feed">
                        {backpack.length === 0 ? (
                            <p style={{ textAlign: 'center', opacity: 0.5, padding: '2rem' }}>Your backpack is empty. Explore and find activities!</p>
                        ) : (
                            backpack.map((item, idx) => (
                                <div key={idx} className="feed-item" style={{ borderLeft: item.type === 'loyalty' ? '4px solid #FFD700' : 'none' }}>
                                    <div className="feed-img">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                        ) : null}
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            background: item.type === 'loyalty' ? 'rgba(255,215,0,0.2)' : 'rgba(112,0,255,0.2)',
                                            display: item.image ? 'none' : 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '2rem'
                                        }}>
                                            {item.type === 'loyalty' ? '💎' : '🎒'}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 style={{ margin: '0 0 5px 0', color: '#FFD700' }}>{item.title}</h4>
                                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#aaa' }}>{item.description}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Voyage Details */}
                    <div className="voyage-details-section glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid rgba(255, 215, 0, 0.2)' }}>
                        <h3 className="panel-subtitle" style={{ color: '#FFD700', marginBottom: '1rem', marginTop: 0 }}>YOUR VOYAGE DETAILS</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>FIRST TIME AT {brandingTitle}?</span>
                                <span style={{
                                    fontSize: '0.85rem',
                                    fontWeight: 'bold',
                                    color: travelStatus.isFirstTimer ? '#FFD700' : '#888',
                                    background: travelStatus.isFirstTimer ? 'rgba(255, 215, 0, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                    padding: '4px 12px',
                                    borderRadius: '20px'
                                }}>
                                    {travelStatus.isFirstTimer ? 'YES' : 'NO'}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>SPECIAL OCCASION</span>
                                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#00e5ff' }}>
                                    {travelStatus.specialOccasion === 'none' ? 'JUST A GETAWAY' : travelStatus.specialOccasion.replace('_', ' ')}
                                </span>
                            </div>
                            {travelStatus.bookingDates && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>SAILING DATE</span>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{travelStatus.bookingDates}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Creator Advice */}
                    <div className="creator-section glass-panel">
                        <div className="creator-avatar">
                            <img src={creator.image} alt={creator.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <h4 style={{ color: '#FFD700' }}>{creator.name.toUpperCase()}'S ADVICE</h4>
                        <p style={{ fontSize: '0.9rem', opacity: 0.8, maxWidth: '500px' }}>
                            "Yo! You're building a sick profile here. These spots are my absolute favorites. Keep exploring!"
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FavouritesOverlay;
