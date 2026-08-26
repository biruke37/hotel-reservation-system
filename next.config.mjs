/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],
    },
    typescript: {
        // TypeScript error ቢኖርም build እንዲቀጥል ያደርጋል
        ignoreBuildErrors: true,
    },
    eslint: {
        // ESLint error ቢኖርም build እንዲቀጥል ያደርጋል
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;