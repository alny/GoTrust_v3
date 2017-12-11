import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link, browserHistory} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { fetchInventory, postTrade } from '../actions';
import requireAuth from '../components/hocs/requireAuth';

class addTradePage extends Component {
  constructor(){
    super()
    this.state = {
      spinner: true,
      localInventory: [],
      selected: false,
      skinName: null,
      skinImage: null,
      skinPrice: 0,
      itemUnder: false
    }
  }

  componentDidMount(){
    if(this.props.auth.steamId == null){
      this.setState({
        spinner: false,
        itemUnder: true
      })
      return
    }

    if (localStorage.getItem("data") === null) {
      this.props.fetchInventory(this.props.auth.steamId)
      .then(response => {
        if(response == null){
          console.log("TISSEMAND")
          this.setState({
            spinner: false,
            itemUnder: true
          })
        }
      })
    } else {
      var retrievedObject = localStorage.getItem('data');
      var inventory = JSON.parse(retrievedObject)
      var empty = []
      var newArray = inventory.concat(empty)
      this.setState({
        localInventory: [newArray],
        spinner: false
      })
    }
  }

  onSelected(id, name, image, event){
    event.preventDefault()
    this.setState({
      selected: {
          [id]: true
       },
       skinName: name,
       skinImage: image
    });
    console.log(name)
    console.log(image)
  }

  submitSale(){

    let currentTime = new Date()
    let currentHours = currentTime / 100

    // if(currentHours <= this.props.auth.tradeDate){
    //   toastr.warning('Vent 1 time med at poste igen!')
    //   return
    // }
    if(this.state.skinPrice == 0){
      toastr.warning('Indtast pris')
      return
    }
    if(this.state.skinName == null){
      toastr.warning('Vælg et skin')
      return
    }
    this.props.postTrade({currentUser: this.props.auth._id, skinName: this.state.skinName, skinImage: this.state.skinImage, skinPrice: this.state.skinPrice.price})
    .then(response => {
      toastr.success('Dit skin er tilføjet til markedet')
      this.props.history.push("/trading");
    })
  }

  updatePrice(event){
    event.preventDefault()
    let updated = Object.assign({}, this.state.skinPrice)
    updated[event.target.id] = event.target.value
    this.setState({
      skinPrice: updated
    })
    console.log(JSON.stringify(this.state.skinPrice.price))
  }

  componentDidUpdate(){
    if (localStorage.getItem("data") === null) {
      localStorage.setItem('data', JSON.stringify(this.props.inventory));
    }
  }

  head() {
    return (
      <Helmet>
        <title>GoTrust | Tilføj Salg</title>
        <meta property="og:title" content="GoTrust | Tilføj Salg" />
      </Helmet>
    );
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
                <Link to={'/'} className="btn full color-1 size-1 hover-1" href="#">
                  <i className="fa fa-chevron-left"></i>Tilbage</Link>
              </div>
              <div className="be-vidget hidden-xs hidden-sm affix-top" id="scrollspy">
                <h3 style={{color: '#222835c7'}} className="letf-menu-article">
                  Betalingsmetode:
                </h3>
                <div className="creative_filds_block">
                  <ul className="ul nav">
                    <li className="edit-ln ac">

                    <a href="#">
                    <i style={{fontSize: '32px', position: 'relative', top: '3px', color: '#0d58c8', marginRight: '10px'}} className="fa fa-mobile"></i>MobilePay:
                    </a>
                    </li>
                    <li className="edit-ln">
                      <input id="price" onChange={this.updatePrice.bind(this)} className="form-input payment-input" type="text" placeholder="Indtast beløb du vil have for dit skin" />
                    </li>
                  </ul>
                </div>
                <a onClick={this.submitSale.bind(this)} className="btn full color-1 size-1 hover-1">
                Tilføj salg til markedet</a>
              </div>
            </div>
            <div className="col-xs-12 col-md-9 _editor-content_">
              <div className="sec">
                <div style={{height: '1400px'}} className="be-large-post">
                  <div className="info-block style-2">
                    <div className="be-large-post-align ">
                      <h3 style={{marginLeft: '-45px'}} className="info-block-label">Dit Inventory: </h3>
                    </div>
                  </div>

                  {(this.state.spinner == false) ? null : <i className="fa fa-refresh fa-spin" style={{fontSize:'44px', color:'#0d58c8', marginLeft: '44%'}}></i>}
                  {(this.state.itemUnder == false) ? null : <p style={{fontSize: '20px', marginLeft: '34%'}}>Du har ingen skins over 5$</p>}

                  {(this.props.inventory == null) ? null :
                  this.props.inventory.map((item, i) => {
                    return (
                      <div key={i} style={{marginTop: '-25px', height: '330px'}} className="col-ml-12 col-xs-6 col-sm-3">
                        <div style={{width: '100%', height: '283px'}} className={(this.state.selected[item._id] == true) ? "be-post style-4 selected-active" : "be-post style-4"}>
                        <a href="#" className="be-img-block">
                        <img style={{marginLeft: '11%', width: '75%'}} src={item.icon_url + '/360fx360f'} alt="omg"/>
                        </a>
                        <a style={{textAlign: 'center', height: '70px'}} href="#" className="be-post-title payment-title">{item.market_hash_name}</a>
                        <div className="author-post clearfix">
                        <button onClick={this.onSelected.bind(this, item._id)} style={{marginLeft: '28px'}} className="btn color-1">Vælg Skin</button>
                        </div>
                        </div>
                      </div>
                    )
                    })
                  }

                  {(this.state.localInventory[0] == null) ? null :
                  this.state.localInventory[0].map((item, i) => {
                    return (
                      <div key={i} style={{marginTop: '-25px', height: '330px'}} className="col-ml-12 col-xs-6 col-sm-3">
                        <div style={{width: '100%', height: '283px'}} className={(this.state.selected[item._id] == true) ? "be-post style-4 selected-active" : "be-post style-4"}>
                        <a href="#" className="be-img-block">
                        <img style={{marginLeft: '11%', width: '75%'}} src={item.icon_url + '/360fx360f'} alt="omg"/>
                        </a>
                        <a style={{textAlign: 'center', height: '70px'}} href="#" className="be-post-title payment-title">{item.market_hash_name}</a>
                        <div className="author-post clearfix">
                        <button onClick={this.onSelected.bind(this, item._id, item.market_hash_name, item.icon_url)} style={{marginLeft: '28px'}} className="btn color-1">Vælg Skin</button>
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
              </div>
                </div>
            </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, inventory: state.inventory };
}

export default {
  component: connect(mapStateToProps, { fetchInventory, postTrade })(requireAuth(addTradePage))
};
