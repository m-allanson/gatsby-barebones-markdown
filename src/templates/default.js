import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

class PageRoute extends React.Component {
  render() {
    const page = this.props.data.markdownRemark

    return (
      <Layout location={this.props.location}>
        <>
          <h1> {page.frontmatter.title} </h1>
          <div dangerouslySetInnerHTML={{ __html: page.html }} />
        </>
      </Layout>
    )
  }
}

export default PageRoute

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
