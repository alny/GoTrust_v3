import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { updateTradeUrl } from '../actions';
import requireAuth from '../components/hocs/requireAuth';

class SettingsPage extends Component {
    constructor(){
      super()
      this.state = {
          url: '',
          disabled: false
      }
    }

    updateURL(event){
      event.preventDefault()
      let updated = Object.assign({}, this.state.url)
      updated[event.target.id] = event.target.value
      this.setState({
        url: updated
      })
      console.log(JSON.stringify(this.state.url))
    }

    submitTradeURL(){
      if(this.state.url == 0){
        toastr.warning('Indsæt Link')
        return
      }
      if(this.state.url == null){
        toastr.warning('Indsæt Link')
        return
      }
      if(this.state.url.tradeurl.includes("steamcommunity.com/") != true){
        toastr.warning('Indsæt et gyldigt Link')
        return
      }
      this.props.updateTradeUrl({currentUser: this.props.auth._id, url: this.state.url})
      this.setState({
        disabled: true
      })
      toastr.success('Trade URL opdateret')

    }

  head() {
    return (
      <Helmet>
        <title>GoTrust | Indstillinger</title>
        <meta property="og:title" content="GoTrust | Mellemmænd" />
      </Helmet>
    );
  }
  isEmpty(str) {
    return (!str || 0 === str.length || str === "lol");
  }

  render() {
    return (
      <div>
        {this.head()}
        <div id="content-block">
          <div className="container be-detail-container">
          <div className="row">
            <div className="col-xs-12 col-md-3 left-feild">
              <div className="be-vidget back-block">
                <Link to={'/validate'} className="btn full color-1 size-1 hover-1" href="#">
                  <i className="fa fa-chevron-left"></i>Tilbage</Link>
              </div>
              <div className="be-vidget hidden-xs hidden-sm affix-top" id="scrollspy">
                <h3 style={{color: '#222835c7'}} className="letf-menu-article">
                  Verificeringer:
                </h3>
                <div className="creative_filds_block">
                  <ul className="ul nav">
                    <li className="edit-ln ac">

                    <a href="#">
                    <i style={{fontSize: '24px', position: 'relative', top: '3px', color: '#4267b2', marginRight: '10px'}} className="fa fa-facebook-square"></i>Facebook:
                    {(this.isEmpty(this.props.auth.facebookId) && this.isEmpty(this.props.auth.facebookName)) ? <i style={{fontSize: '18px', color: '#ba4343', marginLeft: '50%'}} className="fa fa-times"></i> : <i style={{fontSize: '18px', color: '#2ba22d', marginLeft: '50%'}} className="fa fa-check-circle"></i>}
                    </a>

                    </li>
                    <li className="edit-ln">
                      <a href="#">
                      <i style={{fontSize: '24px', position: 'relative', top: '3px', color: '#222835d6', marginRight: '10px'}} className="fa fa-steam-square"></i>Steam:
                      {(this.isEmpty(this.props.auth.steamId) && this.isEmpty(this.props.auth.steamName)) ? <i style={{fontSize: '18px', color: '#ba4343', marginLeft: '58.5%'}} className="fa fa-times"></i> : <i style={{fontSize: '18px', color: '#2ba22d', marginLeft: '58.5%'}} className="fa fa-check-circle"></i>}
                      </a>
                    </li>
                    <li className="edit-ln">
                      <a href="#"><i style={{fontSize: '24px', position: 'relative', top: '3px', color: '#04a707', marginRight: '10px'}} className="fa fa-money"></i>Depositum:
                      {(this.isEmpty(this.props.auth.deposit)) ? <i style={{fontSize: '18px', color: '#ba4343', marginLeft: '44%'}} className="fa fa-times"></i> : <i style={{fontSize: '18px', color: '#2ba22d', marginLeft: '44%'}} className="fa fa-check-circle"></i>}
                      </a>
                    </li>
                  </ul>
                </div>
                <a href="https://steamcommunity.com/tradeoffer/new/?partner=345989850&token=nw3dbRXV" target="_" className="btn full color-1 size-1 hover-1">
                <i className="fa fa-exchange" aria-hidden="true"></i>Send Depositum</a>
              </div>
            </div>
            <div className="col-xs-12 col-md-9 _editor-content_">
              <div>
                <div className="be-large-post">
                  <div className="info-block style-2">
                    <div className="be-large-post-align ">
                      <h3 style={{marginLeft: '-45px'}} className="info-block-label">Mine Indstillinger</h3>
                    </div>
                  </div>
                  <div  className="be-large-post-align">
                    <div className="be-change-ava">
                      <a className="be-ava-user style-2" href="#">
                        <img  src={this.props.auth.image} alt=""/></a>
                      </div>
                    </div>
                    <div style={{marginTop: '20px!important'}} className="be-large-post-align">
                      <div className="row">
                          <div className="input-col col-xs-12">
                            <div className="form-group focus-2">
                              <div className="form-label">Trade URL</div>
                              <input onChange={this.updateURL.bind(this)} className="form-input" type="text" id="tradeurl" maxLength="255" autoCapitalize="off" autoCorrect="off" spellCheck="false" defaultValue={this.props.auth.tradeurl}/>

                              </div>
                            </div>
                            <div className="col-xs-12">
                              <button style={{display: 'unset'}} disabled={this.state.disabled} onClick={this.submitTradeURL.bind(this)} className="btn color-1 size-2 hover-1 btn-left">Gem Link</button>
                              <button style={{display: 'unset', marginTop: '-10px'}} href="https://steamcommunity.com/id/me/tradeoffers/privacy" target="_" className="btn color-1 size-2 hover-1 btn-left">Find Trade Url</button>

                            </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="sec" data-sec="about-me">
                              <div className="be-large-post">
                                <div className="info-block style-2">
                                  <div className="be-large-post-align">
                                    <h3 style={{marginLeft: '-45px'}}  className="info-block-label">Om Mig</h3>
                                  </div>
                                </div>
                                <div className="be-large-post-align">
                                  <div className="row">
                                      <div className="input-col col-xs-12">
                                        <div className="form-group focus-2">
                                          <div className="form-label">Beskrivelse:</div>
                                          <textarea className="form-input" required="" placeholder="Fortæl noget om dig selv..."></textarea>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                        <a className="btn full color-1 size-1 hover-1 add_section">
                          <i className="fa fa-save"></i>Gem ændringer</a>
                          </div>
                        </div>
                      </div>
                </div>
            </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default {
  component: connect(mapStateToProps, {updateTradeUrl})(requireAuth(SettingsPage))
};
