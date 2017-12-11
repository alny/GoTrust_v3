import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkFacebook, checkSteam, fetchUsers } from '../actions';
import { Helmet } from 'react-helmet';
import { LinkChecker } from './../utils'


class RepCheckPage extends Component {
  constructor(){
    super()
    this.state = {
      facebook: {
        url: ''
      },
      unverifiedDisplay: 'none',
      isDisabled: false
    }
  }

componentDidMount() {
  if(this.props.users != null)
  this.props.fetchUsers();
}

renderUsers() {
  return this.props.users.map(user => {
    return (
    <div key={user._id} className="isotope-item mix category-4 custom-column-5" style={{display: "inline-block"}}>
      <div className="be-user-block style-2">
        <a className="be-ava-user-2 style-2" href="#">
      <img style={{borderRadius: '50%', width: '50%', marginBottom: '6%'}} src={user.image} alt=""/>
      </a>
        <Link to={{pathname: '/profile', id: user._id }} href="#" className="be-use-name">{user.name}</Link>
        <p className="be-user-info">GoTrust {user.role}</p>
        <div className="info-block">
          <span><i className="fa fa-thumbs-o-up"></i> 360</span>
          <span><i className="fa fa-money"></i> 789.00</span>
        </div>
        <Link to={{pathname: '/profile', id: user._id }} className="btn color-1 size-2 hover-1">Se Profil</Link>
      </div>
    </div>);
  });
}

  updateURL(event){
    event.preventDefault()
    let updated = Object.assign({}, this.state.facebook.url)
    updated[event.target.id] = event.target.value
    this.setState({
      facebook: updated
    })
    console.log(JSON.stringify(this.state.facebook.url))
  }

  submitURL(event){
      if(this.state.facebook.url.length == 0){
        toastr.warning('Please insert a Link')
        return
      }
      if(this.state.facebook.url.length <= 20){
        toastr.warning('Please insert a valid link')
        return
      }

      if(this.state.facebook.url.includes("steamcommunity.com/") == true){
        event.preventDefault()
        console.log(JSON.stringify(this.state.facebook.url))
        var uId = LinkChecker.getFacebookID(this.state.facebook.url)
        if (uId === "" || uId === null || uId === undefined) {
          this.setState({
            unverifiedDisplay: 'block',
            isDisabled: true
          })
          return
        }
        this.props.checkSteam(uId)
        .then(response => {
          var confirmation = response.payload.data.result
        if(confirmation != null) {
            this.props.history.push('/profile/' + response.payload.data.result._id)
          } else {
            console.log("NULLLLLLLL")
            this.setState({
              unverifiedDisplay: 'block',
              isDisabled: true
            })
          }
          console.log(JSON.stringify(response))
        })
        console.log(JSON.stringify(uId))
      }


  if(this.state.facebook.url.includes("facebook.com/") == true){
    event.preventDefault()
    console.log(JSON.stringify(this.state.facebook.url))
    var uId = LinkChecker.getFacebookID(this.state.facebook.url)
    if (uId === "" || uId === null || uId === undefined) {
      this.setState({
        unverifiedDisplay: 'block',
        isDisabled: true
      })
      return
    }
    this.props.checkFacebook(uId)
    .then(response => {
      var confirmation = response.payload.data.result
      if(confirmation != null) {
        this.props.history.push('/profile/' + response.payload.data.result._id)
      } else {
        console.log("NULLLLLLLL")
        this.setState({
          unverifiedDisplay: 'block',
          isDisabled: true
        })
      }

      console.log(JSON.stringify(response))
    })
    console.log(JSON.stringify(uId))
    }
  }

  disabled(event){
  event.preventDefault()
  this.setState({
    isDisabled: false,
    unverifiedDisplay: 'none',
    facebook: {
      url: ''
    }
  })
}




  head() {
    return (
      <Helmet>
        <title>GoTrust | Rep Checker</title>
        <meta property="og:title" content="GoTrust | Rep Checker" />
      </Helmet>
    );
  }

  render() {
    return (
      <div>
        {this.head()}
            <div id="content-block">
            <div className="head-bg2">
              <div className="head-bg-img2"></div>
              <div className="head-bg-content">
              <h1>GoTrust Rep Checker</h1>
              <p>Tjek om du handler med en Trustworty person eller MM.</p>
              <form className="subscribe-form">
                <input type="text" value={this.state.facebook.url} onChange={this.updateURL.bind(this)} id="url" maxLength="255" autoCapitalize="off" autoCorrect="off" spellCheck="false" placeholder="Indsæt Facebook eller Steam Link" required=""/>
              </form>
              <button onClick={this.submitURL.bind(this)} disabled={this.state.isDisabled} className="btn color-1 size-1 hover-1" href="#"><i className="fa fa-shield"></i>Valider Person</button>
              {(this.state.isDisabled == false) ? null :
                <button onClick={this.disabled.bind(this)} className="btn color-1 size-1 hover-1" href="#"><i className="fa fa-share-square-o"></i>Ny Søgning</button>
              }

              </div>
            </div>
            <div id="unverified-profile" className="pwnedSearchResult pwnedRow panel-collapse" style={{display: this.state.unverifiedDisplay}}>
              <div className="container">
                <div className="row pwnResultBanner">
                <div className="pwnTitle">
                  <h2>
                    Ikke medlem eller verficeret — Brug din sunde fornuft og vær kritisk når du handler med denne bruger!
                    </h2>
                  <p id="pwnCount">Hvis handlen er over 500.00 kr, vil vi råde dig til at bruge en af de mange MMs fra listen.</p>
                </div>

                <p className="socialLinks">
                <a className="socialLink" href="#"><i className="fa fa-facebook-square fa-3x"></i></a>
                <a className="socialLink" href="#"><i className="fa fa-twitter-square fa-3x"></i></a>
                </p>
                </div>
              </div>
            </div>

              <div className="container-fluid custom-container">
                <div style={{marginTop: '50px'}} className="isotope-grid row">

                  <div className="col-md-10 col-md-push-1">
                  <p style={{fontSize: '18px', marginBottom: '10px'}}>Nye Medlemmer: </p>
                    <div id="container-mix" className="row _post-container_">

                    {this.renderUsers()}

                    </div>
                  </div>
                </div>
              </div>
            </div>


      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}

function loadData(store) {
  return store.dispatch(fetchUsers());
}

export default {
  loadData,
  component: connect(mapStateToProps, { checkFacebook, checkSteam, fetchUsers })(RepCheckPage)
};
