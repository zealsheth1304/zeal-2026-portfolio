import React from 'react';
import type { UserProfile } from '../../types';

interface LocationStepProps {
    value: { location: string; weather: UserProfile['weatherCondition'] };
    onChange: (updates: Partial<UserProfile>) => void;
    onNext: () => void;
}

export const LocationStep: React.FC<LocationStepProps> = ({ value, onChange, onNext }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (value.location) onNext();
    };

    return (
        <form onSubmit={handleSubmit} className="step-form">
            <h2>Where are you located?</h2>
            <p className="description">We use this to understand the weather and local style context.</p>

            <div className="form-group">
                <label htmlFor="location">City / Region</label>
                <input
                    type="text"
                    id="location"
                    value={value.location}
                    onChange={(e) => onChange({ location: e.target.value })}
                    placeholder="e.g. New York, Mumbai, Paris"
                    className="input-field"
                    autoFocus
                    required
                />
            </div>

            <div className="form-group">
                <label>Current Weather</label>
                <div className="weather-options">
                    {(['sunny', 'rainy', 'cold', 'snowy', 'mild'] as const).map((w) => (
                        <button
                            key={w}
                            type="button"
                            className={`weather-btn ${value.weather === w ? 'active' : ''}`}
                            onClick={() => onChange({ weatherCondition: w })}
                        >
                            {w.charAt(0).toUpperCase() + w.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <button type="submit" className="btn btn-primary full-width">
                Continue
            </button>

            <style>{`
        .step-form {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-6);
        }
        .description {
          color: var(--color-text-muted);
          margin-bottom: var(--spacing-4);
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-2);
        }
        .input-field {
          padding: var(--spacing-3) var(--spacing-4);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          font-size: var(--font-size-base);
          font-family: inherit;
          transition: border-color var(--transition-fast);
        }
        .input-field:focus {
          outline: none;
          border-color: var(--color-primary);
        }
        .weather-options {
          display: flex;
          gap: var(--spacing-2);
          flex-wrap: wrap;
        }
        .weather-btn {
          padding: var(--spacing-2) var(--spacing-4);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          background: transparent;
          color: var(--color-text-main);
          transition: all var(--transition-fast);
        }
        .weather-btn.active {
          background-color: var(--color-primary);
          color: var(--color-surface);
          border-color: var(--color-primary);
        }
        .full-width {
          width: 100%;
          margin-top: var(--spacing-4);
        }
      `}</style>
        </form>
    );
};
