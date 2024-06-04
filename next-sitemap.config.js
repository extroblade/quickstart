/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: `https://${process.env.NEXT_PUBLIC_HOSTNAME}`,
  changefreq: 'daily',
  priority: 1,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml', '/404', '/500', '/503', '/privacy', '/success_route'],
  transform: async (config, path) => {
    const priorities = {
      '/': 1,
    };
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] || 0.8,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
