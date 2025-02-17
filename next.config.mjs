/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    // Cloudflare Pages 配置
    experimental: {
        esmExternals: true
    },
};

export default nextConfig;
