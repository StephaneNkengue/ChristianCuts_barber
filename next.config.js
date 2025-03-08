/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BREVO_MEETING_URL: process.env.BREVO_MEETING_URL,
  },
};

export default nextConfig;
