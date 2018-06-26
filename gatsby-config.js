module.exports = {
  siteMetadata: {
    title: 'Barebones Markdown',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: `pages`,
      },
    },
    'gatsby-transformer-remark',

  ],
}
