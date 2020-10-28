import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import './PreviousEvent.css'
import Button from "../Button/Button"
import MyModal from "../MyModal/MyModal"
import Alert from "../Alert/Alert"
import Members from "../Members/Members"
import Input from "../Input/Input"
import fetchHandler from '../../utils/fetchHandler'

const PreviousEvent = ({post}) => {
    const [open,setOpen] = useState(false)
    const [form,setForm] = useState({})
    const [loading,setLoading] = useState(false)
    const [response,setResponse] = useState(null)
    const [members,setMembers] = useState([])

    const register = event => {
      setOpen(true)
    }

    const handleOnChange = (name,value) => {
      setForm({
        ...form,
        [name]: value
      })
    }

    const handleSubmit = async (event) => {
      if (event) event.preventDefault()
      setLoading(true)
      const result = await fetchHandler({
          method: 'POST',
          url: "/api/v1/member/add",
          body: {
            ...form,
            eventId: post.frontmatter.eventId
          },
          auth: false,
      })
      setResponse(result.data)
      setLoading(false)
      setTimeout(() => {
        getMembers()
      }, 500);
    }

    useEffect(()=>{
      getMembers()
    },[])

    const getMembers = async () => {
      const result = await fetchHandler({
          method: 'POST',
          url: "/api/v1/member/list",
          body: {
            eventId: post.frontmatter.eventId
          },
          auth: false,
      })
      if (result.data.result) {
        setMembers(result.data.result)
      }
    }

    return (
      <>
        <div id="main-event" className="PreviousEvent container-2">          
          <div className="event-info">
            <img src={post.frontmatter.pic.childImageSharp.fluid.src} />
          </div>
          <article itemScope itemType="http://schema.org/Article">
            <h3 itemProp="headline">{post.frontmatter.title}</h3>
            <p>
              {new Date(post.frontmatter.date).toLocaleDateString("fa-IR")} -
              پنج‌شنبه ساعت ۶ به وقت تهران
            </p>
            <section
              dangerouslySetInnerHTML={{ __html: post.html }}
              itemProp="articleBody"
            />            
          </article>          
        </div>
        {members && (
          <div className="container-2">
            <Members members={members} />
          </div>
        )}
      </>
    )
}

export default PreviousEvent
