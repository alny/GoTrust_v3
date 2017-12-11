import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { fetchProfile, plusRep, minusRep, postComment } from '../actions';
import Timestamp from 'react-timestamp';
import { Helmet } from 'react-helmet';

class ProfilePage extends Component {
  constructor(){
    super()
    this.state = {
      message: '',
      hasRated: false,
      rerender: false
    }
  }
  componentDidMount() {
    console.log(this.props)
    if(this.props.location.id == null || this.props.location.id == undefined){
      this.props.history.push('/')
  }
    var uId = this.props.location.id
    this.props.fetchProfile(uId)
  }

  componentDidUpdate(){
    if(this.state.rerender == true){
      var uId = this.props.location.id
      this.props.fetchProfile(uId)
      this.setState({
        rerender: false
      })
    }
  }


  head() {
    return (
      <Helmet>
        <title>{`GoTrust | ${this.props.profile.name}`}</title>
        <meta property="og:title" content="GoTrust | Profile" />
      </Helmet>
    );
  }

  onPlusRep(){
    var uId = this.props.location.id
    console.log(uId)
    if(this.props.auth._id == uId){
      toastr.warning('Du kan ikke give dig selv reps')
      return
    }

    this.props.plusRep({user: uId, currentUser: this.props.auth._id})
    .then(response => {
      var result = response.payload.data.result
      console.log(response)
      if(result == null){
        toastr.warning(response.payload.data.message)
        return
      } else if(result == 1) {
        toastr.success(response.payload.data.message)
      }
    })
  }

  onMinusRep(){
    var uId = this.props.location.id
    if(this.props.auth._id == uId){
      toastr.warning('Du kan ikke give dig selv reps')
      return
    }
    this.props.minusRep({user: uId, currentUser: this.props.auth._id})
    .then(response => {
      var result = response.payload.data.result
      console.log(response)
      if(result == null){
        toastr.warning(response.payload.data.message)
        return
      } else if(result == 1) {
        toastr.success(response.payload.data.message)
      }
    })
  }

  sumbitComment(){
    let currentTime = new Date()
    let currentHours = currentTime / 100

    if(currentHours <= this.props.auth.commentDate){
      toastr.warning('Vent 1 time med at kommentere igen!')
      return
    }

    this.props.postComment({name: this.props.auth.name, image: this.props.auth.image, message: this.state.message, commentBy: this.props.auth._id, currentProfile: this.props.profile._id})
    .then(response => {
      toastr.success('Kommentar postet')
      this.setState({
        rerender: true
      })
    })
  }

  updateComment(event){
   let updated = Object.assign({}, this.state.message)
   event.preventDefault()
   updated[event.target.id] = event.target.value
   this.setState({
     message: updated
   })
   console.log('updateComment: ' + event.target.id + ' == ' + event.target.value)
}



render() {
    return (
  <div>
  {this.head()}
  <div id="content-block">
  <div className="container be-detail-container">
  <div className="row">
    <div className="col-xs-12 col-md-4 left-feild">
      <div className="be-user-block style-3">
        <div className="be-user-detail">
          <div className="be-ava-user style-2" href="#">
          <button onClick={this.onPlusRep.bind(this)} style={{background: '#36af38', border: '1px solid #36af38'}} className="be-ava-left btn color-1 size-21 hover-1"><i className="fa fa-thumbs-o-up"></i>+ Rep</button>
          <button onClick={this.onMinusRep.bind(this)} style={{background: '#ba4343', border: '1px solid #ba4343'}}  className="be-ava-right btn color-1 size-21 hover-1">
          <i className="fa fa-thumbs-o-down"></i>- Rep
          </button>
            <img src={this.props.profile.image} alt=""/>
          </div>

          {(this.props.profile.status == 'verified') ? <a className="notofications-popup" href="#"><span className="noto-count-3"><i style={{fontSize: '17px', marginTop: '6px', marginLeft: '1px'}} className="fa fa-check"></i></span></a> : null}

          <p className="be-use-name">{this.props.profile.name}</p>

          <div className="be-text-tags style-2">
            <a style={{fontSize: '20px'}} href="#">Depositum: {this.props.profile.deposit}.00 kr</a>
          </div>
          <div className="be-user-social">
            <a style={{marginRight: '10px'}} className="social-btn color-1" href={'https://www.facebook.com/'+ this.props.profile.deposit}>
              <i style={{paddingTop: '9px', marginRight: '5px'}} className="fa fa-facebook"></i>Facebook
            </a>
            <a style={{background: '#222835'}} className="social-btn color-1" href={'https://www.steamcommunity.com/'+ this.props.profile.deposit}>
              <i style={{paddingTop: '9px', marginRight: '5px'}} className="fa fa-steam"></i>Steam
            </a>
          </div>
          {(this.props.profile.status == 'unverified') ? <a className="be-user-site" href="#"> {this.props.profile.status}</a> : null}

        </div>
        <div className="be-user-statistic">
          <div className="stat-row clearfix">
            <i className="stat-icon icon-like-b"></i>Repetition<span className="stat-counter">{this.props.profile.rep}</span>
          </div>
          <div className="stat-row clearfix">
            <i className="stat-icon icon-views-b"></i>
            Total handlet:<span className="stat-counter">{this.props.profile.total}.00 kr</span>
          </div>

          <div className="stat-row clearfix">
            <i className="stat-icon icon-followers-b"></i>Største Handel: <span className="stat-counter">{this.props.profile.topTrade}.00 kr</span>
          </div>
          <div className="stat-row clearfix">
            <i className="stat-icon icon-followers-b"></i>Antal Handler:<span className="stat-counter">{this.props.profile.trades}</span>
          </div>
        </div>
      </div>
      <div className="be-desc-block">
        <div className="be-desc-author">
          <div className="be-desc-label">Om Mig</div>
          <div className="clearfix"></div>
          <div className="be-desc-text">
            Beskrivelse  af en selv
          </div>
        </div>
      </div>
    </div>
    <div className="col-xs-12 col-md-8">
      <div className="tab-wrapper style-1">
        <div className="tab-nav-wrapper">
          <div className="nav-tab  clearfix">
          <div className="nav-tab-item active">
            <span>Kommentarer </span>
          </div>
            <div className="nav-tab-item">
              <span>Skins</span>
            </div>
          </div>
        </div>
        <div className="tabs-content clearfix">

    <div style={{width: '104%', paddingLeft: '-15px!important'}} className="col-xs-12 col-sm-9">
    <div className="be-large-post">
      <div className="info-block style-2">
        <div className="be-large-post-align">
          <h3 style={{marginLeft: '-45px'}} className="info-block-label">Seneste kommentarer:</h3>
        </div>
      </div>
      <div className="be-large-post-align">


      {(this.props.profile.comments == null) ? null :
        this.props.profile.comments.map((comment, i) => {
          return (
            <div key={i} className="be-comment">
              <div className="be-img-comment">
                <a href="#">
                  <img src={comment.image} alt="" className="be-ava-comment"/></a>
                </div>
                <div className="be-comment-content">
                  <span className="be-comment-name">
                    <a href="#">{comment.name}</a>
                  </span>
                  <span className="be-comment-time">
                    <i style={{marginRight: '-40px'}} className="fa fa-clock-o"></i>
                    <Timestamp time={comment.timestamp} />

                  </span>
                  <p className="be-comment-text">
                    {comment.message}
                  </p>
                </div>
              </div>
          )
        })
      }

                {(this.props.auth.status != "verified") ? null : (<form>
                  <div className="form-group">
                    <div className="form-label">Besked</div>
                    <textarea onChange={this.updateComment.bind(this)} id="comment" className="form-input" required="" maxLength="255" autoCapitalize="off" autoCorrect="off" spellCheck="false" placeholder="Skriv noget om denne bruger..."></textarea>
                  </div>
                  <a onClick={this.sumbitComment.bind(this)} className="btn btn-right color-1 size-2 hover-1">Send Besked</a>
                </form>)}
              </div>
            </div>
          </div>
        </div>
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
  return { profile: state.profile, auth: state.auth};
}
export default {
  component: connect(mapStateToProps, { fetchProfile, plusRep, minusRep, postComment })(ProfilePage)
};
