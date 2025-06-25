import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'

export const metadata = {
  title: {
    template: '%s - auth-kit'
  },
  description: 'Auth-kit documentation',
  applicationName: 'Auth-kit',
  generator: 'Next.js',
  appleWebApp: {
    title: 'Auth-kit'
  },
}

export default async function RootLayout({ children }) {
  const navbar = (
    <Navbar
      logo={<b>@astra-void/auth-kit</b>}
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