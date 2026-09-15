import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar, BookOpen } from 'lucide-react';
import './BlogJournal.css';

const BlogJournal = () => {
    const [livePosts, setLivePosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubstack = async () => {
            try {
                const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://travelvrse.substack.com/feed', { cache: 'no-store' });
                const data = await response.json();
                
                if (data && data.status === 'ok' && data.items && data.items.length > 0) {
                    const formattedPosts = data.items.slice(0, 3).map((item, index) => {
                        let imageUrl = item.enclosure?.link || item.thumbnail;
                        if (!imageUrl) {
                            const imgMatch = item.content?.match(/<img[^>]+src="([^">]+)"/) || item.description?.match(/<img[^>]+src="([^">]+)"/);
                            imageUrl = imgMatch ? imgMatch[1] : '/restaurant_preview.jpg';
                        }
                        
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = item.description;
                        let text = tempDiv.textContent || tempDiv.innerText || '';
                        let excerpt = text.substring(0, 100).trim() + '...';

                        return {
                            id: `live-${index}`,
                            title: item.title,
                            excerpt: excerpt,
                            date: new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                            image: imageUrl,
                            link: item.link
                        };
                    });
                    setLivePosts(formattedPosts);
                }
            } catch (error) {
                console.error("Failed to fetch Substack feed", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubstack();
    }, []);

    // Placeholder posts - these will be replaced by live data once Substack is ready
    const posts = [
        {
            id: 1,
            title: "The Future of Experience-Led Hospitality",
            excerpt: "How immersive technology is redefining the guest journey in luxury travel.",
            date: "May 2026",
            image: "/restaurant_preview.jpg"
        },
        {
            id: 2,
            title: "Navigating the New Digital Concierge",
            excerpt: "Why travellers are demanding more than just a booking engine in 2026.",
            date: "April 2026",
            image: "/balcony_preview.jpg"
        },
        {
            id: 3,
            title: "Experiences vs. Amenities: The Shift",
            excerpt: "Analyzing the data behind the trillion-dollar experience economy.",
            date: "March 2026",
            image: "/spa_grab.png",
            link: "#"
        }
    ];

    const displayPosts = livePosts.length > 0 ? livePosts : posts;

    return (
        <section id="journal" className="journal-section section-padding">
            <div className="container">
                <div className="section-header animate-fade-up">
                    <h4 className="text-gold" style={{ letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '1rem' }}>
                        Industry Insights
                    </h4>
                    <h2 className="text-gradient">The Travelvrse Journal</h2>
                    <p className="subtitle">
                        Expert perspectives on the evolution of luxury travel and the trillion-dollar experience economy.
                    </p>
                </div>

                <div className="journal-grid">
                    {displayPosts.map((post, index) => (
                        <div key={post.id} className={`glass-card journal-card animate-fade-up delay-${index + 1}`}>
                            <div className="card-image-container">
                                <img src={post.image} alt={post.title} className="card-image" />
                                <div className="card-overlay"></div>
                            </div>
                            <div className="card-content">
                                <div className="card-meta">
                                    <span className="meta-item"><Calendar size={14} /> {post.date}</span>
                                    <span className="meta-item"><BookOpen size={14} /> 5 min read</span>
                                </div>
                                <h3 className="card-title">{post.title}</h3>
                                <p className="card-excerpt">{post.excerpt}</p>
                                <a href={post.link} target={post.link !== '#' ? '_blank' : '_self'} rel={post.link !== '#' ? 'noopener noreferrer' : ''} className="btn-text">
                                    Read Insights <ArrowRight size={18} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="journal-footer animate-fade-up delay-4">
                    <div className="substack-cta glass-card">
                        <div className="cta-content">
                            <h3>Stay Ahead of the Curve</h3>
                            <p>Subscribe to our Substack for exclusive industry deep-dives and Travelvrse updates.</p>
                        </div>
                        <div className="cta-action">
                            <a href="https://travelvrse.substack.com" target="_blank" rel="noopener noreferrer">
                                <button className="btn btn-primary">Subscribe on Substack</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogJournal;
