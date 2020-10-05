import React from "react"
import { Link } from "gatsby"
import logoImg from './persiajs.png'
import Footer from '../Footer/Footer'
import './Layout.css'

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <div className="logo">
        <img src={logoImg} />
        <h1 className="main-heading">
          <Link to="/">{title}</Link>
        </h1>
      </div>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div data-is-root-path={isRootPath}>
      <header className="container">
        <div className="logo">
          <Link to="/">
            <img src={logoImg} />
          </Link>
        </div>
        {/* <div className="menu">
          <ul>
            <li>
              <Link to="/about">
                درباره
              </Link>
            </li>
            <li>
              <Link to="/events">
                رویداد‌ها
              </Link>
            </li>
            <li>
              <Link to="/about">
                تماس
              </Link>
            </li>
          </ul>
        </div> */}
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
