import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import './FutureEvent.css'
import Button from "../Button/Button"
import MyModal from "../MyModal/MyModal"
import Alert from "../Alert/Alert"
import Members from "../Members/Members"
import Input from "../Input/Input"
import fetchHandler from '../../utils/fetchHandler'

const FutureEvent = ({post}) => {
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
        <div id="main-event" className="FutureEvent container-2">                    
          <div className="event-info">
            <img src={post.frontmatter.pic.childImageSharp.fluid.src} />
            <div className="register-button">
              <Button onClick={register}>عضویت در این رویداد</Button>
            </div>
          </div>
          <article itemScope itemType="http://schema.org/Article">
            <h1 itemProp="headline">{post.frontmatter.title}</h1>
            <p>
              {new Date(post.frontmatter.date).toLocaleDateString("fa-IR")} -
              پنج‌شنبه ساعت ۶ به وقت تهران
            </p>
            <section
              dangerouslySetInnerHTML={{ __html: post.html }}
              itemProp="articleBody"
            />            
          </article>
          <MyModal open={open} setOpen={setOpen}>
            <div>
              <h5>ثبت‌نام در {post.frontmatter.title}</h5>
              <form onSubmit={handleSubmit}>
                {response && response.success && (
                  <Alert model="success">ثبت نام شما با موفقیت انجام شد</Alert>
                )}
                {response && !response.success && (
                  <Alert model="error">شما قبلا ثبت نام کرده‌اید</Alert>
                )}
                {response && response.success && (
                  <div>
                    <h1 itemProp="headline">{post.frontmatter.title}</h1>
                    <p>
                      {new Date(post.frontmatter.date).toLocaleDateString(
                        "fa-IR"
                      )}{" "}
                      - پنج‌شنبه ساعت ۶ به وقت تهران
                    </p>
                    <p>
                      لینک زوم را در تقویم خود قرار دهید یا از گروه تلگرام قبل
                      از رویداد دریافت کنید
                    </p>
                    <div className="code">{post.frontmatter.zoom}</div>
                    <p>
                      برای شرکت در این رویداد لطفا در تاریخ مشخص گروه تلگرام را
                      برای دریافت آخرین لینک Zoom دنبال کنید
                    </p>
                  </div>
                )}
                {(!response || (!response.success)) && (
                  <>
                    <div>
                      <Input
                        onChange={value => handleOnChange("first_name", value)}
                        type="text"
                        required
                        placeholder="نام"
                      />
                    </div>
                    <div>
                      <Input
                        onChange={value => handleOnChange("last_name", value)}
                        type="text"
                        required
                        placeholder="نام خانوادگی"
                      />
                    </div>
                    <div>
                      <Input
                        onChange={value => handleOnChange("email", value)}
                        type="email"
                        required
                        placeholder="ایمیل"
                      />
                    </div>
                    <div>
                      <Button
                        loading={loading}
                        disabled={loading}
                        type="submit"
                      >
                        ثبت‌نام در این رویداد
                      </Button>
                    </div>
                    <div style={{
                      maxWidth: '400px',
                      fontSize: '10px'
                    }}>
                      لینک Zoom را پس از ثبت نام در یافت کنید،
                      <br />
                       ضمن آنکه مجدد قبل از برگزاری در گروه تلگرام پست خواهد شد.
                      <br />
                      لطفا قبل از رویداد مطمئن شوید که 
                      <a href="https://zoom.us/"> Zoom </a>
                      را نصب کرده باشید
                    </div>
                  </>
                )}
              </form>
            </div>
          </MyModal>
        </div>
        {members && (
          <div className="container-2">
            <Members members={members} />
          </div>
        )}
      </>
    )
}

export default FutureEvent
