import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { fetchTopUser } from '../actions';
import { Helmet } from 'react-helmet';


class topRepPage extends Component {
  componentDidMount() {
    this.props.fetchTopUser()
  }

  renderUsers(){

  }

  head() {
    return (
      <Helmet>
        <title>GoTrust | Top Rep</title>
        <meta property="og:title" content="GoTrust | Top Rep" />
      </Helmet>
    );
  }

  render() {
    return (
      <div>
        {this.head()}
            <div id="content-block">
            <div className="head-bg2">
              <div className="head-bg-img4"></div>
              <div style={{height: '115px', paddingTop: '10px'}} className="head-bg-content">
              <h1>Top Rep Medlemmer </h1>
              <p>Top 50 liste over medlemmer med flest Reps</p>

              </div>
            </div>


              <div className="container-fluid custom-container">
                <div style={{marginTop: '50px'}} className="isotope-grid row">

                  <div className="col-md-10 col-md-push-1">
                    <div id="container-mix" className="row _post-container_">

                    {(this.props.top == null) ? null :
                      this.props.top.map((user, i) => {
                        return (
                          <div key={user._id} className= "mix category-5 custom-column-5" style={{display: 'inline-block'}}> <div className="be-user-block style-2">
                            <a className="be-ava-user style-2" href="#">
                              <img src={user.image} alt=""/></a>
                              <div className="be-user-counter">
                                <div className="c_number">#{i+1}</div>
                                <div className="c_text">Ranked</div>
                              </div>
                              <Link to={{pathname: '/profile', id: user._id }} href="#" className="be-use-name">{user.name}</Link>
                              <p className="be-user-info">Depositum: {user.deposit}.00</p>
                              <div className="be-text-tags">
                                <a style={{padding: '6px', background: '#0d58c8', color: 'white', borderRadius: '3px'}} >Reps: {user.rep}</a>
                              </div>
                              <div className="info-block">
                                <span>
                                  <i className="fa fa-thumbs-o-up"></i>
                                  360</span>
                                <span>
                                  <i className="fa fa-eye"></i>
                                  789</span>
                              </div>
                              <Link to={{pathname: '/profile', id: user._id }} className="btn color-1 size-23 hover-1">Se Profil</Link>
                            </div>
                          </div>
                          )
                        })
                      }


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
  return { top: state.top };
}

function loadData(store) {
  return store.dispatch(fetchTopUser());
}



export default {
  loadData,
  component: connect(mapStateToProps, { fetchTopUser })(topRepPage)
};
