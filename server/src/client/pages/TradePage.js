import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { fetchTrades, postBid } from '../actions';
import Timestamp from 'react-timestamp';
import { Modal, Button} from 'react-bootstrap';



class TradePage extends Component {
  constructor(){
    super()
    this.state = {
      showModal: false,
      bid: 0,
      rerender: false
    }
  }

  componentDidMount(){
    this.props.fetchTrades()
  }

  componentDidUpdate(){
    if(this.state.rerender == true){
      this.props.fetchTrades()
      this.setState({
        rerender: false
      })
    }
  }


  head() {
    return (
      <Helmet>
        <title>GoTrust | CS:GO Trading</title>
        <meta property="og:title" content="GoTrust | CS:GO Trading" />
      </Helmet>
    );
  }

  close() {
    this.setState({
      showModal: false
     });
   }

  open(id, event) {
    event.preventDefault()
    this.setState({
      showModal: {
          [id]: true
       }
    });
  }

  bidOnSkin(id, topBid, event){
    console.log(topBid)
    console.log(this.state.bid.bid)

    if(this.state.bid.bid <= topBid){
      toastr.warning('Dit bud skal være højere end det nuværende!')
      return
    }
    if(this.state.bid.bid == 0){
      toastr.warning('Indtast dit bud')
      return
    }
    if(this.state.bid.bid == null){
      toastr.warning('Indtast dit bud')
      return
    }
    if(isNaN(this.state.bid.bid)){
      toastr.warning('Indtast dit bud')
      return
    }
    event.preventDefault()
    this.props.postBid({name: this.props.auth.name, image: this.props.auth.image, bid: this.state.bid.bid, bidBy: this.props.auth._id, tradeId: id})
    .then(response => {
      this.setState({
        rerender: true
      })
      console.log(this.props)

      toastr.success('Bud postet')
    })
  }

  updateBid(event){
   let updated = Object.assign({}, this.state.bid)
   event.preventDefault()
   updated[event.target.id] = event.target.value
   this.setState({
     bid: updated
   })
 }

  getWear(name){
    var n = name.lastIndexOf('(');
    var result = name.substring(n + 0);
    return result
  }

  removeAfter(name){
    var result = name.substring(0, name.indexOf('('));
    return result
  }


  render() {
    return (
      <div>
        {this.head()}
            <div id="content-block2">
            <div className="container-fluid custom-container">
              <div style={{marginTop: '3%'}} className="row">
              <div className="col-md-2 left-feild">
              <form action="#" className="input-search">
              <input type="text" required="" placeholder="Søg efter Skin"/>
              <i className="fa fa-search"></i>
              <input type="submit" value=""/>
              </form>
              </div>
              </div>
              </div>


              <div className="container-fluid custom-container">
                <div className="row">
                  <div className="col-md-2 left-feild">
                    <div className="be-vidget">
                      <h3 className="letf-menu-article">
                      Kategorier
                      </h3>
                      <div className="creative_filds_block">
                        <div className="ul">
                          <a data-filter=".category-1" className="filter">Knive </a>
                          <a data-filter=".category-2" className="filter">Pistoler </a>
                          <a data-filter=".category-3" className="filter">Rifler	</a>
                          <a data-filter=".category-4" className="filter">Awper </a>
                          <a data-filter=".category-5" className="filter">Gloves </a>
                        </div>
                      </div>
                    </div>
                    <div className="be-vidget">
                      <h3 className="letf-menu-article">
            Popular Tags
            </h3>
                      <div className="tags_block clearfix">
                        <ul>
                          <li><a data-filter=".category-6" className="filter">photoshop</a></li>
                          <li><a data-filter=".category-1" className="filter">graphic</a></li>
                          <li><a data-filter=".category-2" className="filter">art</a></li>
                          <li><a data-filter=".category-3" className="filter">website</a></li>
                          <li><a data-filter=".category-4" className="filter">logo</a></li>
                          <li><a data-filter=".category-5" className="filter">identity</a></li>
                          <li><a data-filter=".category-6" className="filter">logo design</a></li>
                          <li><a data-filter=".category-1" className="filter">interactive</a></li>
                          <li><a data-filter=".category-2" className="filter">blue</a></li>
                          <li><a data-filter=".category-3" className="filter">branding</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-10">
                    <div style={{marginTop: '-5.4%'}}  id="container-mix" className="row _post-container_">



                      {(this.props.trades == null) ? null :
                        this.props.trades.map((trade, i) => {
                          return (
                            <div key={i} className="mix category-4 custom-column-5" style={{display: "inline-block"}}>
                            <div className="be-user-block style-2">
                              <a className="be-ava-user style-4" href="#">
                              <img src={trade.image + "/360fx360f"} alt=""/>
                              </a>
                              <div className="be-user-counter">
                                <div className="c_number">{trade.price}</div>
                                <div className="c_text">Kroner</div>
                              </div>
                              <a href="#" className="be-use-name">{this.removeAfter(trade.name)}</a>
                              <p className="be-user-info">{this.getWear(trade.name)}</p>
                              {trade.tradeBy.map((user, j) => {
                                return (
                                <div key={j}>
                                <div className="author-post">
                                  <img src={user.image} alt="" className="ava-author"/>
                                  <span>af <Link to={{pathname: '/profile', id: user._id }} >{user.name}</Link></span>
                                </div>
                                <div className="info-block">
                                  <span><i className="fa fa-eye"></i>Top Bud: {trade.topBid}.00 kr</span>
                                </div>
                                <a onClick={this.open.bind(this, trade._id)}  style={{padding: '10px 60px 10px 60px'}} className="btn color-1 size-2 hover-1">Byd på Skin</a>

                                <Modal show={this.state.showModal[trade._id]} onHide={this.close.bind(this)}>
                                    <Modal.Header style={{borderBottom: '3px solid #0d58c8'}} closeButton>
                                  <Modal.Title style={{textTransform: 'capitalize'}}>
                                        {trade.name}
                                  </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body style={{padding: '0px'}}>
                                    <div id="content-block3">
                                    <div style={{width: '1000px', paddingTop: '30px'}} className="container be-detail-container">
                                    <div className="row">
                                      <div className="col-xs-12 col-md-4 left-feild">
                                        <div className="be-user-block style-3">
                                          <div className="be-user-detail">
                                            <div className="style-3" href="#">
                                              <img src={trade.image} alt=""/>
                                            </div>

                                            <p className="be-use-name">{this.removeAfter(trade.name)}</p>

                                            <div className="be-text-tags style-2">
                                              <a style={{fontSize: '20px'}} href="#">Pris: {trade.price}.00 kr</a>
                                            </div>
                                            <div className="be-user-social">
                                              <a style={{background: '#222835'}} className="social-btn color-1" href={'https://www.steamcommunity.com/'}>
                                                <i style={{paddingTop: '9px', marginRight: '5px'}} className="fa fa-steam"></i>Se Ingame
                                              </a>
                                            </div>


                                          </div>
                                          <div className="be-user-statistic">
                                            <div className="stat-row clearfix">
                                              <i className="stat-icon icon-followers-b"></i>Højeste Bud:<span className="stat-counter">{trade.topBid}.00 kr</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-xs-12 col-md-8">
                                        <div className="tab-wrapper style-1">
                                      <div className="tabs-content clearfix">

                                      <div style={{width: '104%', paddingLeft: '-15px!important', marginLeft: '-15px'}} className="col-xs-12 col-sm-9">
                                      <div className="be-large-post">
                                        <div className="info-block style-2">
                                          <div className="be-large-post-align">
                                            <h3 style={{marginLeft: '-45px'}} className="info-block-label">Seneste Bud:</h3>
                                          </div>
                                        </div>
                                        <div className="be-large-post-align">

                                        {trade.bids.map((bidder, b) => {
                                          return (
                                              <div key={b} className="be-comment">
                                                <div className="be-img-comment">
                                                  <a href="#">
                                                    <img src={bidder.image} alt="" className="be-ava-comment"/></a>
                                                  </div>
                                                  <div className="be-comment-content">
                                                    <span className="be-comment-name">
                                                      <Link to={{pathname: '/profile', id: bidder.bidBy }} >{bidder.name}</Link>
                                                    </span>
                                                    <span className="be-comment-time">
                                                      <i style={{marginRight: '-30px'}} className="fa fa-clock-o"></i>
                                                      <Timestamp time={bidder.timestamp} />
                                                    </span>
                                                    <p style={{height: '48px', fontSize: '21px'}} className="be-comment-text">
                                                      Bud: {bidder.bid}.00 kr
                                                    </p>
                                                  </div>
                                                </div>
                                              )
                                            })
                                            }
                                                  {(this.props.auth.status != "verified") ? null : (<form>
                                                    <div className="form-group">
                                                      <div className="form-label">Dit Bud:</div>
                                                      <input style={{fontSize: '23px'}} onChange={this.updateBid.bind(this)} id="bid" className="form-input" required="" maxLength="255" autoCapitalize="off" autoCorrect="off" spellCheck="false" placeholder="0.00 kr"/>
                                                    </div>
                                                    <a onClick={this.bidOnSkin.bind(this, trade._id, trade.topBid )} className="btn btn-right color-1 size-2 hover-1">Byd</a>
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

                                    </Modal.Body>
                                    <Modal.Body style={{borderTop: '3px solid #0d58c8'}}>
                                      <p style={{fontWeight: '400'}}>{user.name} sælger sin {trade.name} til {trade.price}.00 kr</p>

                                    </Modal.Body>

                                    <Modal.Footer>
                                      <a href={"https://www.facebook.com/app_scoped_user_id/" + user.loginId} target="_blank"><Button className="btn color-1 size-2" style={{float: 'left', color: 'white'}}>Kontakt Sælger</Button></a>

                                      <Button onClick={this.close.bind(this)}>Luk</Button>
                                    </Modal.Footer>
                                    </Modal>
                              </div>)
                              })
                              }
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
  return { auth: state.auth, trades: state.trades };
}

function loadData(store) {
  return store.dispatch(fetchTrades());
}

export default {
  loadData,
  component: connect(mapStateToProps, { fetchTrades, postBid })(TradePage)
};
