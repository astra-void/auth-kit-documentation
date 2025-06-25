import nextra from 'nextra'

const withNextra = nextra({
  search: {
    codeblocks: false,
  },
  contentDirBasePath: '/',
})

export default withNextra({
  reactStrictMode: true,
})
