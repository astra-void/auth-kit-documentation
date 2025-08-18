import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'

export const metadata = {
  title: {
    template: '%s - astra-void'
  },
  description: 'astra-void\'s Documentation',
  applicationName: 'astra-void\'s Documentation',
  generator: 'Next.js',
  appleWebApp: {
    title: 'astra-void\'s Documentation'
  },
}

export default async function RootLayout({ children }) {
  const navbar = (
    <Navbar
      logo={<b>@astra-void</b>}
    />
  )
  const pageMap = await getPageMap()
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head faviconGlyph="✦" />
      <body>
        <Layout
          navbar={navbar}
          footer={<Footer>MIT {new Date().getFullYear()} © astra-void.</Footer>}
          editLink="Edit this page on GitHub"
          docsRepositoryBase="https://github.com/astra-void/auth-kit-docs/blob/main/content/docs"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          pageMap={pageMap}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}