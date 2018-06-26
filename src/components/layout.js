import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'

import Header from './header'
import './layout.css'

const Layout = ({ children, data }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
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
    `}
    render={data => {
      const posts = data.allMarkdownRemark.edges
      return (
        <>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: 'description', content: 'Sample' },
              { name: 'keywords', content: 'sample, something' },
            ]}
          />
          <Header siteTitle={data.site.siteMetadata.title} />
          <div
            style={{
              margin: '0 auto',
              maxWidth: 960,
              padding: '0px 1.0875rem 1.45rem',
              paddingTop: 0,
            }}
          >
            <div>
              <ul>
                {posts.map(post => (
                  <li key={post.node.fields.slug} style={{ marginTop: '1em' }}>
                    <Link to={post.node.fields.slug} className="link-underline">
                      {post.node.frontmatter.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {children}
          </div>
        </>
      )
    }}
  />
)

Layout.propTypes = {
  children: PropTypes.element,
}

export default Layout
