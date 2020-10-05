import React, { useState } from "react"
import { Link } from "gatsby"
import Button from "../Button/Button"
import './Banner.css'
import bannerImage from './bg.jpg'
import MyModal from "../MyModal/MyModal"

const Banner = () => {
    const [open, setOpen] = useState(false)
    const scrollDown = (event) => {
        if (event) event.preventDefault()
        document.getElementById("main-event").scrollIntoView()
    }

    const handleClick = () => {
      setOpen(true)
    }

    return (
      <div className="Banner--Parent">
        <div className="Banner--Image">
          <img src={bannerImage} />
        </div>
        <div className="container">
          <div className="Banner">
            <div className="Banner--Headline">
              <h1>به پرشیا جی‌اس خوش آمدید</h1>
              <p>
                این گروه متشکل از برنامه‌نویسان فارسی زبان سراسر دنیاست که قصد
                دارند رویداد‌هایی را به صورت ماهانه برای یادگیری برگزار کنند.
              </p>
              <div>
                <Button onClick={scrollDown}>مشاهده رویداد آینده</Button>
                <Button model="white" onClick={handleClick}>
                  پیشنهاد برای سخنرانی
                </Button>
              </div>
            </div>
          </div>
        </div>
        <MyModal open={open} setOpen={setOpen}>
          <div>
            <h5>پیشنهاد برای سخنرانی</h5>
            <p>
              از شما دعوت می‌کنیم برای دوستان فارسی‌زبان خود سخنرانی کنید،
              می‌توانید در هر موضوعی مربوط به جاوا اسکریپت و تکنولوژی‌های مرتبط
              با آن و یا نحوه‌ی کاریابی در این حوزه سخنرانی کنید
            </p>
            <br />
            <p>
              اگر به دنبال موضوع هستید می‌توانید با تلگرام گروه در ارتباط باشید
              و با یکی از ادمین‌های گروه پیغامی رد و بدل کنید
            </p>
            <br />
            <p>
              اشتراک دانش به هر روشی و با نحوه‌‌ی بیان مختلف باعث یادگیری بیشتر
              می‌شود. شما ممکن است حتی دوستان جدیدی در شبکه‌ی حرفه‌ای خود پیدا
              کنید که مطمئنا در ادامه‌ی مسیر به شما کمک خواهد کرد. پس از شما
              دعوت می‌کنیم الان دست به کار شوید و با یکی از ادمین‌های گروه
              تلگرامی صحبت کنید.
            </p>
          </div>
        </MyModal>
        <div className="arrow-down">
          <a href="#" title="" onClick={scrollDown}>
            <i className="fa fa-chevron-down"></i>
          </a>
        </div>
      </div>
    )
}

export default Banner
