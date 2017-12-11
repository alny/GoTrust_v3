import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

class HomePage extends Component {
  componentDidMount() {

  }

  head() {
    return (
      <Helmet>
        <title>GoTrust | CS:GO Community</title>
        <meta property="og:title" content="GoTrust | CS:GO Community" />
      </Helmet>
    );
  }



  render() {
    return (
      <div>
        {this.head()}
            <div id="content-block">
            <div className="head-bg">
              <div className="head-bg-img"></div>
              <div className="head-bg-content">
              <img style={{width: '5%', marginTop: '-2%', marginBottom: '1%'}} src="../img/lion_logo2.png" alt=""/>
              <h1>Bliv en del af et sikkert Trading Community</h1>
              <p>Vi verificerer hver enkelt person, så du kun handler med troværdige personer.</p>
              {(this.props.auth != false) ? null : <a className="btn color-1 size-1 hover-1" href="/api/auth/facebook"><i className="fa fa-handshake-o"></i>join Communitiet nu</a>}
              </div>
            </div>

            <div className="container">
              <div className= "block">
              <h3 className="block-title">Hvorfor joine GoTrust?</h3>
              <div className="block-subtitle">Større tryghed når du køber og sælger dine CS:GO skins.</div>
              <div className="swiper-container swiper-swiper-unique-id-1 initialized" data-autoplay="5000" data-loop="0" data-speed="300" data-center="0" data-slides-per-view="responsive" data-xs-slides="1" data-sm-slides="2" data-md-slides="3" data-lg-slides="3" data-add-slides="3" id="swiper-unique-id-1">
                <div className="swiper-wrapper" style={{width: '2280px', height: '252px'}}>
                  <div className="swiper-slide swiper-slide-visible swiper-slide-active active" data-val="0" style={{width: '380px', height: '252px'}}>
                    <div className="service-entry">
                      <img className="service-icon" src="../img/service_1.png" alt=""/>
                        <h4 className="service-title">Nemt og Gratis</h4>
                        <div className="service-text">Ingen gebyrer eller dyre medlemskaber, alt er gratis! - Hele communitiet kører rundt af donationer. </div>
                        <a className="btn color-1 size-2 hover-1">Læs mere</a>
                      </div>
                    </div>
                    <div className="swiper-slide swiper-slide-visible" data-val="1" style={{width: '380px', height: '252px'}}>
                      <div className="service-entry">
                        <img className="service-icon" src="../img/service_2.png" alt=""/>
                          <h4 className="service-title">Som et forsikringsselskab</h4>
                          <div className="service-text">Communitiet fungerer som et forsikringsselskab, hvis du bliver udsat for svindel udligner vi dit tab.</div>
                          <a className="btn color-1 size-2 hover-1">Læs mere</a>
                        </div>
                      </div>
                      <div className="swiper-slide swiper-slide-visible" data-val="2" style={{width: '380px', height: '252px'}}>
                        <div className="service-entry">
                          <img className="service-icon" src="../img/service_3.png" alt=""/>
                            <h4 className="service-title">Vær dine egen Mellemmand</h4>
                            <div className="service-text">Alle der er blevet verificeret og har lagt et depositum, kan ansøge om at komme på MM listen.</div>
                            <a className="btn color-1 size-2 hover-1">Læs mere</a>
                          </div>
                        </div>
                            </div>
                            <div className="pagination pagination-swiper-unique-id-1">
                              <span className="swiper-pagination-switch swiper-visible-switch swiper-active-switch" style={{display: 'inline-block'}}></span>
                              <span className="swiper-pagination-switch swiper-visible-switch" style={{display: 'inline-block'}}></span>
                              <span className="swiper-pagination-switch swiper-visible-switch" style={{display: 'inline-block'}}></span>
                              <span className="swiper-pagination-switch" style={{display: 'inline-block'}}></span>
                              <span className="swiper-pagination-switch" style={{display: 'none'}}></span>
                              <span className="swiper-pagination-switch" style={{display: 'none'}}></span>
                            </div>
                          </div>
                        </div>
                      </div>
          </div>
      </div>
    );
  }
}

function mapStateToProps({auth}) {
  return { auth };
}

export default {
  component: connect(mapStateToProps)(HomePage)
};
