import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {

  componentDidMount(){
    console.log(this.props)
  }

  renderButton(params){
    switch (params) {
      case "unverified":
          return (
            <li id="ad-work-li">
              <Link to={'/verify'} style={{background: '#f9a938', border: '1px solid #f9a938'}} id="add-work-btn" className="btn color-1" href="#">
                <i className="fa fa-check"></i>Bliv Verificeret
              </Link>
            </li>
          )
      case "verified":
          return(
            <li id="ad-work-li">
              <Link to={'/addtrade'} id="add-work-btn" className="btn color-1" href="#">
                <i className="fa fa-plus"></i>Tilføj Salg
              </Link>
            </li>
          )

      case "pending":
          return(
            <li id="ad-work-li">
              <Link to={'/verify'} style={{background: '#f9a938', border: '1px solid #f9a938', width: '120px'}} id="add-work-btn" className="btn color-1" href="#">
                <i className="fa fa-exclamation-triangle"></i>Pending
              </Link>
            </li>
          )

      case "rejected":
          return(
            <li id="ad-work-li">
              <Link to={'/verify'} style={{background: '#ba4343', border: '1px solid #ba4343'}} id="add-work-btn" className="btn color-1" href="#">
                <i className="fa fa-exclamation-triangle"></i>Ansøgning Afvist
              </Link>
            </li>
          )

      case "banned":
          return(
            <li id="ad-work-li">
              <Link to={'/verify'} style={{background: '#ba4343', border: '1px solid #ba4343'}} id="add-work-btn" className="btn color-1" href="#">
                <i className="fa fa-exclamation-triangle"></i>Bannet
              </Link>
            </li>
          )

      case "member":
          return(
            <li id="ad-work-li">
              <Link to={'/addtrade'}  id="add-work-btn" className="btn color-1" href="#">
                <i className="fa fa-plus"></i>Tilføj Salg
              </Link>
            </li>
          )

    }

  }

render(){
  return (
  <header>
    <div className="container-fluid custom-container">
      <div className="row no_row row-header">
        <div className="brand-be">
          <Link to={'/'}>
            <img className=" be_logo logo-c active" src="img/logo_v3.png" alt="logo"/>
          </Link>
        </div>
        <div className="header-menu-block">
          <button className="cmn-toggle-switch cmn-toggle-switch__htx">
            <span></span>
          </button>
          <ul className="header-menu" id="one">
            <li>
              <Link to={'/trading'} href="#">Trading</Link>
            </li>
            <li>
              <Link to={'/repchecker'}  href="#">Rep Checker</Link>
            </li>
            <li>
              <Link to={'/top'} href="#">Top Rep</Link>
            </li>
            <li>
              <Link to={'/middleman'} href="#">MM's</Link>
            </li>
            <li>
              <a href="#">Community</a>
              <ul>
                <li>
                  <a href="#">Coming Soon</a>
                </li>
              </ul>
            </li>

            <li>
              <a href="#">Support</a>
              <ul>
                <li>
                  <Link to={'/support'} href="#">FAQ</Link>
                </li>
                <li>
                  <a href="#">Anmeld</a>
                </li>
                <li>
                <a href="#">Hjælp</a>
                </li>
                <li>
                <a href="#">Kontakt Os</a>
                </li>
              </ul>
            </li>
            {(this.props.auth) ? null
              : (<li id="ad-work-li">
                <a id="add-work-btn" className="btn color-1" href="/api/auth/facebook">
                  <i className="fa fa-facebook"></i>Log ind via Facebook
                </a>
              </li>)}

            {(!this.props.auth) ? null : this.renderButton(this.props.auth.status)}

          </ul>
        </div>
        <div className="login-header-block">
        {(!this.props.auth) ? (<div className="login_block">
            <a className="btn-login btn color-1 size-22" href="#">
              <i className="fa fa-facebook-square"></i>
            </a>
            <a className="btn-login btn color-1 size-22" href="https://twitter.com/GoTrustdk" target="_">
              <i className="fa fa-twitter-square"></i>
            </a>
            <a className="btn-login btn color-1 size-22" href="#">
              <i className="fa fa-steam-square"></i>
            </a>
          </div>) : (
          <div className="login_block">
            <a className="messages-popup" href="#">
              <i className="stat-icon icon-like-b"></i>
              <span className="noto-count">{this.props.auth.rep}</span>
            </a>

            <div className="be-drop-down login-user-down">
              <span style={{position: 'relative'}}>
              {(this.props.auth.status == "verified") ? (
                <span className="noto-count-2"><i style={{fontSize: '12px', marginTop: '4px', marginLeft: '1px'}} className="fa fa-check"></i></span>
              ) : null}
                <img style={{width: '12%', marginRight: '3%'}} className="login-user" src={this.props.auth.image} alt=""/>
              </span>


                <span className="be-dropdown-content">
                  <span> {this.props.auth.name}</span>
                </span>
                <div className="drop-down-list a-list">
                  <Link to={{pathname: '/profile', id: this.props.auth._id }} href="#">Min Profil</Link>
                  <Link to={'/settings'} href="#">Indstillinger</Link>
                  <a href="/api/logout">Logout</a>
                </div>
              </div>
            </div>
        )}

        </div>
      </div>
    </div>
  </header>
  );

}
 };
function mapStateToProps(state) {
  return {auth: state.auth};
}

export default connect(mapStateToProps)(Header);
