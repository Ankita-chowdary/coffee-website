export interface ScrollySegment {
    text: string;
    triggerPercent: number; // 0 to 1
}

export interface CoffeeProduct {
    id: string;
    name: string;
    slogan: string;
    roastLevel: number; // 1-10
    accentColor: string; // Hex
    folderPath: string; // Path to images
    meta: {
        price: string;
        origin: string;
        elevation: string;
    };
    scrollySegments: ScrollySegment[];
}

export const products: CoffeeProduct[] = [
    {
        id: 'midnight-obsidian',
        name: 'Midnight Obsidian',
        slogan: 'Darkness Reborn',
        roastLevel: 9,
        accentColor: '#1A1A1A', // Dark
        folderPath: '/images/midnight-obsidian',
        meta: {
            price: '$24.00',
            origin: 'Sumatra / Brazil Blend',
            elevation: '1200m - 1400m',
        },
        scrollySegments: [
            { text: "Harvested under the moon's gaze.", triggerPercent: 0.1 },
            { text: "Roasted until the oils glisten.", triggerPercent: 0.35 },
            { text: "Deep, smoky notes of dark chocolate.", triggerPercent: 0.6 },
            { text: "A finish that lingers like a shadow.", triggerPercent: 0.85 },
        ],
    },
    {
        id: 'velvet-horizon',
        name: 'Velvet Horizon',
        slogan: 'Smooth Perfection',
        roastLevel: 5,
        accentColor: '#3D2B1F', // Medium brown
        folderPath: '/images/velvet-horizon',
        meta: {
            price: '$22.00',
            origin: 'Colombia / Costa Rica',
            elevation: '1600m',
        },
        scrollySegments: [
            { text: "Dawn breaks over the canopy.", triggerPercent: 0.1 },
            { text: "Balanced heat captures the soul.", triggerPercent: 0.35 },
            { text: "Notes of caramel and hazelnuts.", triggerPercent: 0.6 },
            { text: "Smooth as silk, endless as the sky.", triggerPercent: 0.85 },
        ],
    },
    {
        id: 'cloud-highlands',
        name: 'Cloud Highlands',
        slogan: 'Ethereal Lightness',
        roastLevel: 3,
        accentColor: '#D4B996', // Light beige/gold
        folderPath: '/images/cloud-highlands',
        meta: {
            price: '$26.00',
            origin: 'Ethiopia Yirgacheffe',
            elevation: '2100m',
        },
        scrollySegments: [
            { text: "Grown where the clouds touch the earth.", triggerPercent: 0.1 },
            { text: "Gently roasted to preserve delicacy.", triggerPercent: 0.35 },
            { text: "Bright floral and citrus burst.", triggerPercent: 0.6 },
            { text: "A sip of pure, high-altitude air.", triggerPercent: 0.85 },
        ],
    },
];
