import React, { useState } from 'react';
import type { UserProfile } from '../../types';
import { LocationStep } from './LocationStep.tsx';
import { BodyShapeStep } from './BodyShapeStep.tsx';
import { StylePreferencesStep } from './StylePreferencesStep.tsx';
import { PhotoUploadStep } from './PhotoUploadStep.tsx';

interface OnboardingFlowProps {
    onComplete: (profile: UserProfile) => void;
}

const initialProfile: UserProfile = {
    location: '',
    weatherCondition: 'mild',
    bodyShape: 'hourglass',
    highlightAreas: [],
    hideAreas: [],
    desiredVibe: 'casual',
    occasion: 'casual',
    budgetRange: 'medium',
};

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
    const [step, setStep] = useState(1);
    const [profile, setProfile] = useState<UserProfile>(initialProfile);

    const updateProfile = (updates: Partial<UserProfile>) => {
        setProfile(prev => ({ ...prev, ...updates }));
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const renderStep = () => {
        switch (step) {
            case 1:
                return <LocationStep
                    value={{ location: profile.location, weather: profile.weatherCondition }}
                    onChange={updateProfile}
                    onNext={nextStep}
                />;
            case 2:
                return <BodyShapeStep
                    value={{ shape: profile.bodyShape, highlight: profile.highlightAreas, hide: profile.hideAreas }}
                    onChange={updateProfile}
                    onNext={nextStep}
                    onBack={prevStep}
                />;
            case 3:
                return <StylePreferencesStep
                    value={{ vibe: profile.desiredVibe, occasion: profile.occasion, budget: profile.budgetRange }}
                    onChange={updateProfile}
                    onNext={nextStep}
                    onBack={prevStep}
                />;
            case 4:
                return <PhotoUploadStep
                    onComplete={() => onComplete(profile)}
                    onBack={prevStep}
                    onSkip={() => onComplete(profile)}
                />;
            default:
                return null;
        }
    };

    return (
        <div className="onboarding-container fade-in">
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(step / 4) * 100}%` }}></div>
            </div>
            <div className="step-content">
                {renderStep()}
            </div>
            <style>{`
        .onboarding-container {
          max-width: 600px;
          margin: 0 auto;
        }
        .progress-bar {
          height: 4px;
          background-color: var(--color-border);
          border-radius: var(--radius-full);
          margin-bottom: var(--spacing-8);
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background-color: var(--color-primary);
          transition: width var(--transition-normal);
        }
      `}</style>
        </div>
    );
};
