import React, { useState } from 'react';

interface PhotoUploadStepProps {
    onComplete: () => void;
    onBack: () => void;
    onSkip: () => void;
}

export const PhotoUploadStep: React.FC<PhotoUploadStepProps> = ({ onComplete, onBack, onSkip }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false);

    const handleUpload = () => {
        setIsUploading(true);
        // Mock upload delay
        setTimeout(() => {
            setIsUploading(false);
            setUploaded(true);
        }, 1500);
    };

    return (
        <div className="step-form fade-in">
            <h2>Add Photos (Optional)</h2>
            <p className="description">Upload a close-up and full-body shot. We'll analyze your skin tone and hair style for better color recommendations.</p>

            <div className="upload-area" onClick={!uploaded ? handleUpload : undefined}>
                {isUploading ? (
                    <div className="loading">Analyzing...</div>
                ) : uploaded ? (
                    <div className="success">
                        <span className="icon">✓</span>
                        <p>Photos analyzed!</p>
                        <p className="small">Detected: Warm Skin Tone, Wavy Hair</p>
                    </div>
                ) : (
                    <div className="placeholder">
                        <span className="icon">📷</span>
                        <p>Click to Upload Photos</p>
                        <p className="small">or drag and drop</p>
                    </div>
                )}
            </div>

            <div className="privacy-note">
                <small>🔒 Your photos are processed locally and not stored permanently.</small>
            </div>

            <div className="btn-group">
                <button type="button" onClick={onBack} className="btn btn-secondary">Back</button>
                <button
                    type="button"
                    onClick={uploaded ? onComplete : onSkip}
                    className="btn btn-primary flex-1"
                >
                    {uploaded ? 'See Recommendations' : 'Skip & See Recommendations'}
                </button>
            </div>

            <style>{`
        .step-form { display: flex; flex-direction: column; gap: var(--spacing-6); }
        .upload-area {
          border: 2px dashed var(--color-border);
          border-radius: var(--radius-lg);
          padding: var(--spacing-12);
          text-align: center;
          cursor: pointer;
          transition: all var(--transition-fast);
          background-color: var(--color-background);
        }
        .upload-area:hover {
          border-color: var(--color-primary);
          background-color: rgba(0,0,0,0.02);
        }
        .icon { font-size: var(--font-size-4xl); display: block; margin-bottom: var(--spacing-2); }
        .small { font-size: var(--font-size-sm); color: var(--color-text-muted); }
        .success { color: var(--color-success); }
        .privacy-note { text-align: center; color: var(--color-text-muted); }
        .btn-group { display: flex; gap: var(--spacing-3); margin-top: var(--spacing-4); }
        .flex-1 { flex: 1; }
      `}</style>
        </div>
    );
};
