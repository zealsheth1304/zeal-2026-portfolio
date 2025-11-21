import { useState } from 'react';
import { Layout } from './components/Layout';
import { OnboardingFlow } from './components/Onboarding/OnboardingFlow';
import { Dashboard } from './components/Dashboard/Dashboard';
import type { UserProfile } from './types';

function App() {
  const [view, setView] = useState<'hero' | 'onboarding' | 'dashboard'>('hero');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleStart = () => setView('onboarding');

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setView('dashboard');
    console.log('Profile completed:', profile);
  };

  return (
    <Layout>
      {view === 'hero' && (
        <div className="hero fade-in">
          <h1>Your Personal AI Stylist</h1>
          <p className="subtitle">Discover your perfect look tailored to your body, weather, and occasion.</p>
          <button
            className="btn btn-primary"
            style={{ marginTop: 'var(--spacing-6)' }}
            onClick={handleStart}
          >
            Start Styling
          </button>
        </div>
      )}

      {view === 'onboarding' && (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      )}

      {view === 'dashboard' && userProfile && (
        <Dashboard profile={userProfile} onRestart={() => setView('hero')} />
      )}

      <style>{`
        .hero {
          text-align: center;
          padding: var(--spacing-12) 0;
          max-width: 800px;
          margin: 0 auto;
        }
        .subtitle {
          font-size: var(--font-size-lg);
          color: var(--color-text-muted);
          margin-top: var(--spacing-2);
        }
        .dashboard {
          text-align: center;
        }
      `}</style>
    </Layout>
  );
}

export default App;
