const path = require(`path`)
const slash = require(`slash`)


exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const template = path.resolve(`src/templates/default.js`)

    graphql(
      `
        {
          allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
      `
    ).then(result => {
      if (result.errors) {
        console.log(result.errors)
      }

      // Create blog posts pages.
      result.data.allMarkdownRemark.edges.forEach(edge => {
        createPage({
          path: edge.node.fields.slug, // required
          component: slash(template),
          context: {
            slug: edge.node.fields.slug,
          },
        })
      })

      resolve()
    })
  })
}

// Add custom url pathname for blog posts.
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `File`) {
    const parsedFilePath = path.parse(node.absolutePath)
    const slug = `/${parsedFilePath.name}/`
    createNodeField({ node, name: `slug`, value: slug })
  } else if (
    node.internal.type === `MarkdownRemark` &&
    typeof node.slug === `undefined`
  ) {
    const fileNode = getNode(node.parent)
    createNodeField({
      node,
      name: `slug`,
      value: fileNode.fields.slug,
    })
  }
}