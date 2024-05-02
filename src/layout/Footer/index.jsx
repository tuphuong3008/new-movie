import React from "react";

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faInstagram,
  faFacebook,
  faSnapchat,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

// Material UI
import { Grid } from "@mui/material";

// Components
import Image from "../../components/Image";
import images from "../../assets/images";

import "./style.scss";

function Footer() {
  return (
    <footer className="footer__bg">
      <Grid
        container
        maxWidth="lg"
        sx={{ mx: "auto" }}
        id="footer__container"
        className=""
      >
        <Grid container sx={{ mx: "auto" }} className="footer__apps">
          <a className="footer__app-item" href="#">
            <Image src="https://miro.medium.com/v2/resize:fit:816/1*sSR4mrpijxoQrD7HKu8nDw.png" />
          </a>
        </Grid>
        <Grid container className="footer__list">
          <Grid item xs={12} md={3} className="footer__list-item">
            <p className="footer__list-title">TIX</p>
            <a className="footer__list-link" href="#">
              FAQ
            </a>
            <a className="footer__list-link" href="#">
              Brand Guidelines
            </a>
          </Grid>
          <Grid item xs={12} md={3} className="footer__list-item">
            <p className="footer__list-title">Chăm sóc khách hàng</p>
            <a className="footer__list-link" href="#">
              Liên hệ
            </a>
            <a className="footer__list-link" href="#">
              Câu hỏi thường gặp
            </a>
          </Grid>
          <Grid item xs={12} md={3} className="footer__list-item">
            <p className="footer__list-title">Web shop</p>
            <a className="footer__list-link" href="#">
              Chính sách bảo mật
            </a>
            <a className="footer__list-link" href="#">
              Thoả thuận sử dụng
            </a>
            <a className="footer__list-link" href="#">
              Các điều khoản của CyberSoft
            </a>
          </Grid>
          <Grid
            item
            xs={12}
            lg={3}
            md={12}
            className="footer__list-item  list--social"
          >
            <p className="footer__list-title">Mạng xã hội</p>
            <a className="footer__list-link" href="#">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a className="footer__list-link" href="#">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a className="footer__list-link" href="#">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a className="footer__list-link" href="#">
              <FontAwesomeIcon icon={faSnapchat} />
            </a>
            <a className="footer__list-link" href="#">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a className="footer__list-link" href="#">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </Grid>
        </Grid>
        <Grid container className="footer__payment">
          {/* <Image src={images.paymentMethodsMobile} className="hide-on-pc hide-on-tablet" /> */}
          <Image src={images.paymentMethodsPC} className="hide-on-mobile" />
        </Grid>
        <p className="footer__rights pt-5 pb-5">
          <a href="#">CyberSoft - All rights reserved</a>
        </p>
      </Grid>
    </footer>
  );
}

export default Footer;
