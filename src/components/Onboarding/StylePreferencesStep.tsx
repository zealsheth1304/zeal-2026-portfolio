import React from 'react';
import type { UserProfile } from '../../types';

interface StylePreferencesStepProps {
    value: {
        vibe: UserProfile['desiredVibe'];
        occasion: UserProfile['occasion'];
        budget: UserProfile['budgetRange'];
    };
    onChange: (updates: Partial<UserProfile>) => void;
    onNext: () => void;
    onBack: () => void;
}

const VIBES = ['Cute', 'Professional', 'Sexy', 'Hot', 'Casual', 'Elegant'];
const OCCASIONS = ['Date Night', 'Interview', 'Office', 'Party', 'Casual', 'Wedding'];
const BUDGETS = [
    { id: 'low', label: '< $50', desc: 'Affordable' },
    { id: 'medium', label: '$50 - $150', desc: 'Mid-range' },
    { id: 'high', label: '> $150', desc: 'Premium' },
] as const;

export const StylePreferencesStep: React.FC<StylePreferencesStepProps> = ({ value, onChange, onNext, onBack }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext();
    };

    return (
        <form onSubmit={handleSubmit} className="step-form fade-in">
            <h2>Style & Budget</h2>
            <p className="description">Tell us about the look you're going for.</p>

            <div className="form-group">
                <label>Desired Vibe</label>
                <div className="options-grid">
                    {VIBES.map((vibe) => {
                        const id = vibe.toLowerCase().replace(' ', '-') as UserProfile['desiredVibe'];
                        return (
                            <button
                                key={id}
                                type="button"
                                className={`option-btn ${value.vibe === id ? 'active' : ''}`}
                                onClick={() => onChange({ desiredVibe: id })}
                            >
                                {vibe}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="form-group">
                <label>Occasion</label>
                <div className="options-grid">
                    {OCCASIONS.map((occ) => {
                        const id = occ.toLowerCase().replace(' ', '-') as UserProfile['occasion'];
                        return (
                            <button
                                key={id}
                                type="button"
                                className={`option-btn ${value.occasion === id ? 'active' : ''}`}
                                onClick={() => onChange({ occasion: id })}
                            >
                                {occ}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="form-group">
                <label>Budget Range</label>
                <div className="budget-grid">
                    {BUDGETS.map((b) => (
                        <button
                            key={b.id}
                            type="button"
                            className={`budget-card ${value.budget === b.id ? 'active' : ''}`}
                            onClick={() => onChange({ budgetRange: b.id })}
                        >
                            <div className="budget-label">{b.label}</div>
                            <div className="budget-desc">{b.desc}</div>
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
        .options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: var(--spacing-2);
        }
        .option-btn {
          padding: var(--spacing-2);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          background: transparent;
          transition: all var(--transition-fast);
        }
        .option-btn.active {
          background-color: var(--color-primary);
          color: var(--color-surface);
          border-color: var(--color-primary);
        }
        .budget-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-3);
        }
        .budget-card {
          padding: var(--spacing-3);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          background: var(--color-surface);
          transition: all var(--transition-fast);
        }
        .budget-card.active {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 1px var(--color-primary);
          background-color: rgba(0,0,0,0.02);
        }
        .budget-label { font-weight: 600; }
        .budget-desc { font-size: var(--font-size-xs); color: var(--color-text-muted); }
        .btn-group { display: flex; gap: var(--spacing-3); margin-top: var(--spacing-4); }
        .flex-1 { flex: 1; }
      `}</style>
        </form>
    );
};
