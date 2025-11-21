import React, { useEffect, useState } from 'react';
import type { UserProfile, Recommendation } from '../../types';
import { generateRecommendations } from '../../lib/stylingLogic';
import { RecommendationCard } from './RecommendationCard';

interface DashboardProps {
    profile: UserProfile;
    onRestart: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ profile, onRestart }) => {
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate AI processing time
        const timer = setTimeout(() => {
            const results = generateRecommendations(profile);
            setRecommendations(results);
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [profile]);

    if (loading) {
        return (
            <div className="loading-container fade-in">
                <div className="spinner"></div>
                <h2>Curating your personal look...</h2>
                <p>Analyzing your {profile.bodyShape} shape and {profile.weatherCondition} weather context.</p>
                <style>{`
          .loading-container {
            text-align: center;
            padding: var(--spacing-16) 0;
          }
          .spinner {
            width: 40px;
            height: 40px;
            border: 3px solid var(--color-border);
            border-top-color: var(--color-primary);
            border-radius: 50%;
            margin: 0 auto var(--spacing-6);
            animation: spin 1s linear infinite;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
            </div>
        );
    }

    return (
        <div className="dashboard fade-in">
            <div className="dashboard-header">
                <div>
                    <h2>Your Curated Edit</h2>
                    <p className="subtitle">Based on your {profile.desiredVibe} vibe for {profile.occasion}</p>
                </div>
                <button onClick={onRestart} className="btn btn-secondary">Start Over</button>
            </div>

            <div className="recommendations-grid">
                {recommendations.map(item => (
                    <RecommendationCard key={item.id} item={item} />
                ))}
            </div>

            {recommendations.length === 0 && (
                <div className="empty-state">
                    <p>No perfect matches found for this specific combination.</p>
                    <button onClick={onRestart} className="btn btn-primary">Try different preferences</button>
                </div>
            )}

            <style>{`
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-8);
          flex-wrap: wrap;
          gap: var(--spacing-4);
        }
        .recommendations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: var(--spacing-6);
        }
        .empty-state {
          text-align: center;
          padding: var(--spacing-12);
          color: var(--color-text-muted);
        }
      `}</style>
        </div>
    );
};
