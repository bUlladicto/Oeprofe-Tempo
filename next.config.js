/** @type {import('next').NextConfig} */

const nextConfig = {
  // Exclude Supabase Edge Functions from the build
  webpack: (config) => {
    config.module.rules.push({
      test: /\.ts$/,
      include: /supabase\/functions/,
      use: [
        {
          loader: "ignore-loader",
        },
      ],
    });
    return config;
  },
};

if (process.env.NEXT_PUBLIC_TEMPO) {
  nextConfig["experimental"] = {
    // NextJS 13.4.8 up to 14.1.3:
    // swcPlugins: [[require.resolve("tempo-devtools/swc/0.86"), {}]],
    // NextJS 14.1.3 to 14.2.11:
    swcPlugins: [[require.resolve("tempo-devtools/swc/0.90"), {}]],

    // NextJS 15+ (Not yet supported, coming soon)
  };
}

module.exports = nextConfig;
