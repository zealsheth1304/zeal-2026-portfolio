import React from 'react';
import type { Recommendation } from '../../types';

interface RecommendationCardProps {
    item: Recommendation;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ item }) => {
    return (
        <div className="card fade-in">
            <div className="image-container">
                <img src={item.imageUrl} alt={item.name} className="product-image" />
                <div className="price-tag">${item.price.toFixed(2)}</div>
            </div>
            <div className="content">
                <div className="brand">{item.brand}</div>
                <h3 className="name">{item.name}</h3>
                <p className="reason">
                    <span className="icon">✨</span> {item.matchReason}
                </p>
                <div className="tags">
                    {item.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="tag">#{tag}</span>
                    ))}
                </div>
                <button className="btn btn-primary full-width">Shop Now</button>
            </div>
            <style>{`
        .card {
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
          display: flex;
          flex-direction: column;
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        .image-container {
          position: relative;
          padding-top: 125%; /* 4:5 Aspect Ratio */
          background-color: var(--color-background);
        }
        .product-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .price-tag {
          position: absolute;
          bottom: var(--spacing-2);
          right: var(--spacing-2);
          background: rgba(255, 255, 255, 0.9);
          padding: var(--spacing-1) var(--spacing-2);
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: var(--font-size-sm);
          color: var(--color-primary);
        }
        .content {
          padding: var(--spacing-4);
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .brand {
          font-size: var(--font-size-xs);
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--color-text-muted);
          margin-bottom: var(--spacing-1);
        }
        .name {
          font-size: var(--font-size-lg);
          margin-bottom: var(--spacing-2);
        }
        .reason {
          font-size: var(--font-size-sm);
          color: var(--color-text-muted);
          background-color: rgba(0,0,0,0.02);
          padding: var(--spacing-2);
          border-radius: var(--radius-sm);
          margin-bottom: var(--spacing-3);
          flex: 1;
        }
        .tags {
          display: flex;
          gap: var(--spacing-1);
          margin-bottom: var(--spacing-4);
        }
        .tag {
          font-size: var(--font-size-xs);
          color: var(--color-text-muted);
          background: var(--color-background);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
        }
        .full-width { width: 100%; }
      `}</style>
        </div>
    );
};
