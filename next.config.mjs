/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        baseURL: process.env.NEXT_PUBLIC_API_URL
    }
};

export default nextConfig;
