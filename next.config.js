/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    }, images: {
        domains: ["images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com", "lh3.googleusercontent.com",'cdn.vox-cdn.com', "files.edgestore.dev"],
    },
};

module.exports = nextConfig;
