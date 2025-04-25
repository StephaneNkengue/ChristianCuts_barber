/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BREVO_MEETING_URL: "https://meet.brevo.com/christiancutz",
    NODE_OPTIONS: "--openssl-legacy-provider",
  },
};

export default nextConfig;
