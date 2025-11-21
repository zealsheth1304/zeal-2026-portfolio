import type { UserProfile, Recommendation } from '../types';

// Mock Data Database
const CLOTHING_DATABASE: Recommendation[] = [
    {
        id: '1',
        name: 'Linen Breeze Shirt',
        brand: 'Uniqlo',
        price: 39.90,
        imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600',
        description: 'Breathable linen shirt perfect for hot weather.',
        tags: ['linen', 'summer', 'casual', 'top', 'breathable'],
        matchReason: 'Great for sunny weather due to breathable linen fabric.',
    },
    {
        id: '2',
        name: 'Structured Blazer',
        brand: 'Zara',
        price: 89.90,
        imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600',
        description: 'A sharp blazer that adds professionalism to any look.',
        tags: ['professional', 'office', 'interview', 'outerwear', 'structured'],
        matchReason: 'Perfect for professional settings and interviews.',
    },
    {
        id: '3',
        name: 'Wrap Dress',
        brand: 'H&M',
        price: 49.99,
        imageUrl: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&q=80&w=600',
        description: 'Flattering wrap dress that accentuates the waist.',
        tags: ['dress', 'casual', 'date-night', 'hourglass', 'pear'],
        matchReason: 'Accentuates the waist, ideal for hourglass and pear shapes.',
    },
    {
        id: '4',
        name: 'High-Waisted Wide Leg Trousers',
        brand: 'Mango',
        price: 59.99,
        imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=600',
        description: 'Elegant trousers that elongate the legs.',
        tags: ['bottom', 'office', 'casual', 'round', 'inverted-triangle'],
        matchReason: 'Elongates the legs and balances proportions.',
    },
    {
        id: '5',
        name: 'Sequin Mini Dress',
        brand: 'ASOS',
        price: 120.00,
        imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=600',
        description: 'Sparkle all night in this stunning sequin dress.',
        tags: ['party', 'night-out', 'sexy', 'hot', 'dress'],
        matchReason: 'Perfect for a night out or party vibe.',
    },
    {
        id: '6',
        name: 'Cashmere Sweater',
        brand: 'Everlane',
        price: 160.00,
        imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=600',
        description: 'Luxuriously soft cashmere for chilly days.',
        tags: ['winter', 'cold', 'casual', 'elegant', 'top'],
        matchReason: 'Keeps you warm and stylish in cold weather.',
    }
];

export function generateRecommendations(profile: UserProfile): Recommendation[] {
    // 1. Filter by Weather
    let filtered = CLOTHING_DATABASE.filter(item => {
        if (profile.weatherCondition === 'sunny' || profile.weatherCondition === 'mild') {
            return !item.tags.includes('winter') && !item.tags.includes('heavy');
        }
        if (profile.weatherCondition === 'cold' || profile.weatherCondition === 'snowy') {
            return !item.tags.includes('summer') && !item.tags.includes('linen');
        }
        return true;
    });

    // 2. Filter by Occasion
    filtered = filtered.filter(item => {
        // Loose matching for demo purposes
        if (profile.occasion === 'office' || profile.occasion === 'interview') {
            return item.tags.includes('professional') || item.tags.includes('office') || item.tags.includes('elegant');
        }
        if (profile.occasion === 'party' || profile.occasion === 'date-night') {
            return item.tags.includes('party') || item.tags.includes('date-night') || item.tags.includes('sexy') || item.tags.includes('dress');
        }
        return true;
    });

    // 3. Filter by Budget (Simple logic)
    filtered = filtered.filter(item => {
        if (profile.budgetRange === 'low') return item.price < 50;
        if (profile.budgetRange === 'medium') return item.price >= 50 && item.price <= 150;
        if (profile.budgetRange === 'high') return item.price > 150;
        return true;
    });

    // 4. Score by Body Shape & Vibe (Heuristic Scoring)
    const scored = filtered.map(item => {
        let score = 0;
        let reasons: string[] = [];

        // Body Shape Match
        if (item.tags.includes(profile.bodyShape)) {
            score += 5;
            reasons.push(`Great for ${profile.bodyShape} shape`);
        }

        // Vibe Match
        if (item.tags.includes(profile.desiredVibe)) {
            score += 3;
            reasons.push(`Matches your ${profile.desiredVibe} vibe`);
        }

        // Highlight Areas (Mock logic)
        if (profile.highlightAreas.includes('Legs') && (item.tags.includes('dress') || item.tags.includes('bottom'))) {
            score += 2;
            reasons.push('Highlights your legs');
        }

        // Default reason if none specific
        if (reasons.length === 0) reasons.push(item.matchReason);

        return { ...item, score, matchReason: reasons.join('. ') };
    });

    // Sort by score
    return scored.sort((a, b) => b.score - a.score);
}
