import React from 'react';
import type { UserProfile } from '../../types';

interface BodyShapeStepProps {
    value: {
        shape: UserProfile['bodyShape'];
        highlight: string[];
        hide: string[];
    };
    onChange: (updates: Partial<UserProfile>) => void;
    onNext: () => void;
    onBack: () => void;
}

const SHAPES = [
    { id: 'hourglass', label: 'Hourglass', desc: 'Balanced bust and hips with defined waist' },
    { id: 'inverted-triangle', label: 'Inverted Triangle', desc: 'Broader shoulders than hips' },
    { id: 'rectangle', label: 'Rectangle', desc: 'Straight silhouette, similar bust/waist/hip width' },
    { id: 'round', label: 'Round', desc: 'Fuller midsection and upper body' },
    { id: 'pear', label: 'Pear', desc: 'Hips wider than shoulders' },
] as const;

const AREAS = ['Arms', 'Tummy', 'Legs', 'Back', 'Cleavage', 'Waist', 'Hips'];

export const BodyShapeStep: React.FC<BodyShapeStepProps> = ({ value, onChange, onNext, onBack }) => {
    const toggleArea = (area: string, type: 'highlight' | 'hide') => {
        const current = type === 'highlight' ? value.highlight : value.hide;
        const other = type === 'highlight' ? value.hide : value.highlight;

        // Remove from other list if present
        if (other.includes(area)) {
            onChange({
                [type === 'highlight' ? 'hideAreas' : 'highlightAreas']: other.filter(a => a !== area)
            });
        }

        // Toggle in current list
        const newAreas = current.includes(area)
            ? current.filter(a => a !== area)
            : [...current, area];

        onChange({ [type === 'highlight' ? 'highlightAreas' : 'hideAreas']: newAreas });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext();
    };

    return (
        <form onSubmit={handleSubmit} className="step-form fade-in">
            <h2>Body Shape & Preferences</h2>
            <p className="description">Help us understand your silhouette to find the most flattering cuts.</p>

            <div className="form-group">
                <label>Which shape describes you best?</label>
                <div className="shape-grid">
                    {SHAPES.map((shape) => (
                        <button
                            key={shape.id}
                            type="button"
                            className={`shape-card ${value.shape === shape.id ? 'active' : ''}`}
                            onClick={() => onChange({ bodyShape: shape.id })}
                        >
                            <div className="shape-label">{shape.label}</div>
                            <div className="shape-desc">{shape.desc}</div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label>Areas to Highlight (Show off!)</label>
                <div className="tags-container">
                    {AREAS.map(area => (
                        <button
                            key={`high-${area}`}
                            type="button"
                            className={`tag ${value.highlight.includes(area) ? 'active-highlight' : ''}`}
                            onClick={() => toggleArea(area, 'highlight')}
                        >
                            {area}
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label>Areas to Conceal (Hide)</label>
                <div className="tags-container">
                    {AREAS.map(area => (
                        <button
                            key={`hide-${area}`}
                            type="button"
                            className={`tag ${value.hide.includes(area) ? 'active-hide' : ''}`}
                            onClick={() => toggleArea(area, 'hide')}
                        >
                            {area}
                        </button>
                    ))}
                </div>
            </div>

            <div className="btn-group">
                <button type="button" onClick={onBack} className="btn btn-secondary">Back</button>
                <button type="submit" className="btn btn-primary flex-1">Continue</button>
            </div>

            <style>{`
        .step-form { display: flex; flex-direction: column; gap: var(--spacing-6); }
        .shape-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: var(--spacing-3);
        }
        .shape-card {
          padding: var(--spacing-3);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          background: var(--color-surface);
          text-align: left;
          transition: all var(--transition-fast);
        }
        .shape-card.active {
          border-color: var(--color-primary);
          background-color: rgba(0,0,0,0.02);
          box-shadow: 0 0 0 1px var(--color-primary);
        }
        .shape-label { font-weight: 600; margin-bottom: var(--spacing-1); }
        .shape-desc { font-size: var(--font-size-xs); color: var(--color-text-muted); }
        
        .tags-container { display: flex; flex-wrap: wrap; gap: var(--spacing-2); }
        .tag {
          padding: var(--spacing-1) var(--spacing-3);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          background: transparent;
          font-size: var(--font-size-sm);
          transition: all var(--transition-fast);
        }
        .tag.active-highlight {
          background-color: var(--color-success);
          color: white;
          border-color: var(--color-success);
        }
        .tag.active-hide {
          background-color: var(--color-text-muted);
          color: white;
          border-color: var(--color-text-muted);
        }
        .btn-group { display: flex; gap: var(--spacing-3); margin-top: var(--spacing-4); }
        .flex-1 { flex: 1; }
      `}</style>
        </form>
    );
};
