import React from "react"
import { Link } from "gatsby"
import './Footer.css'

const Footer = ({ post }) => {
    return (
        <div className="Footer">
            <div className="Footer--Followers">
                <span>
                    پرشیا‌ جی‌اس را دنبال کنید
                </span>
                <ul>
                    <li>
                        <a href="https://t.me/persiajs">
                            <i className="fa fa-telegram"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <footer>
                © {new Date().getFullYear()}, Built with
                {` `}
                <a href="https://www.gatsbyjs.com">Gatsby</a>
            </footer>
        </div>
    )
}

export default Footer
