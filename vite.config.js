import { defineConfig } from 'vite'
import { resolve } from 'path'
import { readFileSync } from 'fs'

function seoPlugin() {
  return {
    name: 'html-seo-injection',
    transformIndexHtml(html) {
      try {
        const configPath = resolve(__dirname, 'seoconfig.json')
        const config = JSON.parse(readFileSync(configPath, 'utf-8'))
        return html
          .replace(/<title>.*?<\/title>/, `<title>${config.title}</title>`)
          .replace(/<meta name="description" content=".*?"\s*\/?>/, `<meta name="description" content="${config.description}">`)
          .replace(/<meta name="keywords" content=".*?"\s*\/?>/, `<meta name="keywords" content="${config.keywords}">`)
          .replace(/<meta property="og:title" content=".*?"\s*\/?>/, `<meta property="og:title" content="${config.ogTitle}">`)
          .replace(/<meta property="og:description" content=".*?"\s*\/?>/, `<meta property="og:description" content="${config.ogDescription}">`)
          .replace(/<meta property="og:image" content=".*?"\s*\/?>/, `<meta property="og:image" content="${config.ogImage}">`)
          .replace(/<meta property="og:url" content=".*?"\s*\/?>/, `<meta property="og:url" content="${config.url}">`)
          .replace(/<meta property="twitter:title" content=".*?"\s*\/?>/, `<meta property="twitter:title" content="${config.ogTitle}">`)
          .replace(/<meta property="twitter:description" content=".*?"\s*\/?>/, `<meta property="twitter:description" content="${config.ogDescription}">`)
          .replace(/<meta property="twitter:image" content=".*?"\s*\/?>/, `<meta property="twitter:image" content="${config.ogImage}">`)
          .replace(/<meta property="twitter:url" content=".*?"\s*\/?>/, `<meta property="twitter:url" content="${config.url}">`)
          .replace(/<link rel="canonical" href=".*?"\s*\/?>/, `<link rel="canonical" href="${config.url}">`)
      } catch (err) {
        console.error('Failed to inject SEO tags:', err)
        return html
      }
    }
  }
}

export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  plugins: [
    seoPlugin()
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        blog: resolve(__dirname, 'blog.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        terms: resolve(__dirname, 'terms.html')
      }
    }
  }
})
