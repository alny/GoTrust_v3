import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const Footer = () => {
  return (
    <footer>
    <div className="footer_slider">
    </div>
    <div className="footer-main">
      <div className="container-fluid custom-container">
        <div className="row">
          <div className="col-md-3 col-xl-4">
            <div className="footer-block">
              <h1 className="footer-title">Om GoTrust</h1>
              <p>GoTrust handler om at give tryghed til alle nye som gamle tradere, der hver dag handler med skins og som skal bruge lang tid på at tjekke om de nu kan stole på den de handler med.
                Det problem har vi nu løst, og du kan derfor med et enkelt klik, nemt og hurtigt tjekke hver eneste person du handler med.</p>
              <ul className="soc_buttons">
                <li>
                  <a href="#" target="_">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/GoTrustdk" target="_">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#" target="_">
                    <i className="fa fa-steam"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-xl-2">
            <div className="footer-block">
              <h1 className="footer-title">Oversigt</h1>
              <div className="row footer-list-footer">
                <div className="col-md-6">
                  <ul className="link-list">
                    <li>
                      <Link to={'/'}>Trading</Link>
                    </li>
                    <li>
                      <Link to={'/'}>Rep Checker</Link>
                    </li>
                    <li>
                      <Link to={'/'}>Top Rep</Link>
                    </li>
                    <li>
                      <Link to={'/'}>MM's</Link>
                    </li>
                    <li>
                      <Link to={'/'}>Community</Link>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="link-list">
                    <li>
                      <Link to={'/'}>Support</Link>
                    </li>
                    <li>
                      <Link to={'/'}>FAQ</Link>
                    </li>
                    <li>
                      <Link to={'/'}>Anmeld</Link>
                    </li>
                    <li>
                      <Link to={'/'}>Hjælp</Link>
                    </li>
                    <li>
                      <Link to={'/'}>Kontakt Os</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 galerry">
            <div className="footer-block">
              <h1 className="footer-title">Nye Medlemmer</h1>
              <a href="#"><img src="img/g1.jpg" alt=""/></a>
            </div>
          </div>
          <div className="col-md-3">
            <div className="footer-block">
                  <div className="soc-activity">
                    <div className="soc_ico_triangle">
                      <i className="fa fa-twitter"></i>
                    </div>
                    <div className="message-soc">
                      <div className="date">16h ago</div>
                      <a href="#" className="account">@faq</a>
                      vestibulum accumsan est
                      <a href="#" className="heshtag">blog-detail-2.htmlmalesuada</a>
                      sem auctor, eu aliquet nisi ornare leo sit amet varius egestas.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container-fluid custom-container">
            <div className="col-md-12 footer-end clearfix">
              <div className="left">
                <span className="copy">© 2017. All rights reserved.
                  <span className="white">
                    <a href="#"> GoTrust </a>
                  </span>
                </span>
                <span className="created">Created with LOVE by
                  <span className="white">
                    <a href="http://steamcommunity.com/id/Ancientelg" target="_"> AncientElg</a>
                  </span>
                </span>
              </div>
              <div className="right">
                <a className="btn color-7 size-2 hover-9">Om</a>
                <a className="btn color-7 size-2 hover-9">Hjælp</a>
                <a className="btn color-7 size-2 hover-9">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      ); }; function mapStateToProps(state) {
        return {};
      }

      export default connect(mapStateToProps)(Footer);
