import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { fetchMiddlemen } from '../actions';
import { Helmet } from 'react-helmet';


class MiddlemanPage extends Component {
  componentDidMount() {
    this.props.fetchMiddlemen()
  }


  head() {
    return (
      <Helmet>
        <title>GoTrust | Mellemmænd</title>
        <meta property="og:title" content="GoTrust | Mellemmænd" />
      </Helmet>
    );
  }

  render() {
    return (
      <div>
        {this.head()}
            <div id="content-block">
            <div className="head-bg2">
              <div className="head-bg-img3"></div>
              <div style={{height: '115px', paddingTop: '10px'}} className="head-bg-content">
              <h1>MM Liste</h1>
              <p>Oversigt over de meste pålidelig MM's</p>

              </div>
            </div>

                <div className="container-fluid custom-container be-detail-container"> <div className="isotope-grid row">

              {(this.props.middleman == null) ? null :
                this.props.middleman.map((user, i) => {
                  return (
                  <div key={user._id} className="isotope-item col-ml-12 col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2">
                    <div className="be-post style-5">
                      <a className="be-img-block">
                        <img src={user.image} alt="omg"/>
                      </a>
                      <div className="be-rowline">
                        <img className="rowline-img" src="img/ava_5.jpg" alt=""/>
                        <Link to={{pathname: '/profile', id: user._id }} href="#"><div className="rowline-text">{user.name}
                          <span className="rowline-icon">
                          </span>
                        </div></Link>
                      </div>
                      <div className="be-rowline">
                        <img className="rowline-img" src="img/ava_8.png" alt=""/>
                        <div className="rowline-text">Verified
                          <span className="rowline-icon">
                          </span>
                        </div>
                      </div>
                      <div className="be-rowline">
                        <img className="rowline-img" src="img/ava_7.jpg" alt=""/>
                        <div className="rowline-text">Depositum: {user.deposit}.00
                          <span className="rowline-icon">
                          </span>
                        </div>
                      </div>
                      <div className="author-post">
                        <span>
                          <a href="page1.html">Trusted by</a>
                        </span>
                        <span className="pull-right">
                          <i className="fa fa-thumbs-o-up"></i>
                          225</span>
                      </div>
                    </div>
                  </div>
                )
                })
                }
                </div>
                </div>
</div>


      </div>
    );
  }
}

function mapStateToProps(state) {
  return { middleman: state.middleman };
}

function loadData(store) {
  return store.dispatch(fetchMiddlemen());
}



export default {
  loadData,
  component: connect(mapStateToProps, { fetchMiddlemen })(MiddlemanPage)
};
