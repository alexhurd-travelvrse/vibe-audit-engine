import React from 'react';
import { Wine, Waves, Utensils, Zap, Camera, Hotel } from 'lucide-react';
import './ExperienceVerticals.css';

const verticals = [
    { icon: <Waves size={24} />, label: 'LUXURY SPAS' },
    { icon: <Hotel size={24} />, label: 'PRIVATE CABANAS' },
    { icon: <Utensils size={24} />, label: 'SIGNATURE DINING' },
    { icon: <Wine size={24} />, label: 'ROOFTOP BARS' },
    { icon: <Zap size={24} />, label: 'BEACH CLUBS' },
    { icon: <Camera size={24} />, label: 'EXCURSIONS' }
];

const ExperienceVerticals = () => {
    return (
        <section className="verticals-strip animate-fade-up delay-2">
            <div className="container">
                <div className="strip-title">WORKS FOR EVERY TOUCHPOINT</div>
                <div className="verticals-grid">
                    {verticals.map((v, i) => (
                        <div key={i} className="vertical-tag">
                            <span className="tag-icon">{v.icon}</span>
                            <span className="tag-label">{v.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceVerticals;
