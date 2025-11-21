export interface UserProfile {
    location: string;
    weatherCondition: 'sunny' | 'rainy' | 'cold' | 'snowy' | 'mild';
    bodyShape: 'hourglass' | 'inverted-triangle' | 'rectangle' | 'round' | 'pear';
    highlightAreas: string[];
    hideAreas: string[];
    desiredVibe: 'cute' | 'professional' | 'sexy' | 'hot' | 'casual' | 'elegant';
    occasion: 'date-night' | 'interview' | 'office' | 'party' | 'casual' | 'wedding';
    budgetRange: 'low' | 'medium' | 'high'; // <$50, $50-$150, >$150
    skinTone?: string; // Derived from photo (mocked)
    hairStyle?: string; // Derived from photo (mocked)
}

export interface Recommendation {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    brand: string;
    matchReason: string; // The "Why" (PAIR principle)
    tags: string[];
}
