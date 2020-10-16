import React, { useEffect, useState } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/Layout/Layout"
import FutureEvent from "../components/FutureEvent/FutureEvent"
import PreviousEvent from "../components/PreviousEvent/PreviousEvent"
import SEO from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data?.site.siteMetadata?.title || `Title`
  const [posts,setPosts] = useState([])

  useEffect(()=>{
    if (data.allMarkdownRemark.nodes.length > 0){
      setPosts(data.allMarkdownRemark.nodes)
    }
  }, [data.allMarkdownRemark.nodes])

  if (posts.length === 0) {
    return null
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="گروه برنامه‌نویسی جاوا اسکریپت" />
      
      <FutureEvent post={posts[0]} />
      

      <div className="container-2 previous-events">
        <h2>
          رویداد‌های قبلی
        </h2>
        {posts.slice(1).length > 0 && posts.slice(1).map(event => {
          return (<PreviousEvent post={event} />)
        })}
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        id
        excerpt(pruneLength: 160)
        fields {
          slug
        }
        html
        frontmatter {
          title
          eventId
          zoom
          date(formatString: "MMMM DD, YYYY")
          description
          pic {
            childImageSharp {
              fluid(maxWidth: 400) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
