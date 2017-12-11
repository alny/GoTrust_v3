import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import requireAuth from '../components/hocs/requireAuth';


class VerifyPage extends Component {
  constructor(){
  super()
  this.state = {
      hasAccepted: false,
      disabled: false
  }
}
  componentDidMount() {
  }

  head() {
    return (
      <Helmet>
        <title>GoTrust | Verificering</title>
        <meta property="og:title" content="GoTrust | Verificering" />
      </Helmet>
    );
  }

  connectedAccount(){
  switch (this.props.auth.steamConnect){
    case true:
      return(
        <div><i style={{fontSize: '65px', marginLeft: '43.5%', marginBottom: '25px'}} className="fa fa-steam-square"></i><br/><span className="steam-forbundet">Steam Account forbundet</span></div>
      )
    default:
      return(
        <a href="/api/auth/steam"><img style={{marginLeft: '40%'}} src="img/steam-login-b.png"/></a>

      )
  }
}

verifyMe(event){
  event.preventDefault()
  this.setState({
    hasAccepted: true
  })
}



  render(){

    let content = null

    if(this.state.hasAccepted == false){
      content =
      <div>
      <div className="row logoPanel">

        <p style={{marginBottom: '30px'}}>Før du kan ansøge om at blive medlem, skal du være indforstået med disse betingelser:</p>
      </div>
      <div className="row">
        <div style={{marginBottom: '50px'}} className="col-md-6">
          <span className="num">1</span><h3 className="verify-h3">Alt svindel anmeldes til politiet.</h3>
          <p className="p-verify">Som verificeret bruger følger et ansvar.</p>
          <ul className="verify-text">
            <li>Hvis du som verificeret bruger, er involveret i svindel anmeldes det til politiet.</li>
            <li>Dit depositum vil dermed blive ophævet med øjeblikkelig virkning.</li>
            <li>Permanent udelukkelse fra GoTrust.</li>
          </ul>
        </div>
        <div style={{marginBottom: '50px'}} className="col-md-6">
          <span className="num">2</span><h3 className="verify-h3">Legit Facebook og Steam profil</h3>
            <p className="p-verify">Din Facebook og Steam profil skal være til at stole på.</p>
            <ul className="verify-text">
              <li>Vi godkender ikke nyoprettede profiler.</li>
              <li>Vores MM's og moderators vil gennemgå din profil, og tjekke om den er legit.</li>
              <li>Folk med dårligt ry godkendes ikke.</li>
            </ul>
        </div>
      </div>

      <div className="row">
        <div style={{marginBottom: '50px'}} className="col-md-6">
          <span className="num">3</span><h3 className="verify-h3">Depositum er valgfrit.</h3>
            <p className="p-verify">Et depositum er valgfrit, men hvis du vil opnå en højere troværdighed og blive verificeret, er et depositum på minimum 500.00 kr i skins obligatorisk.</p>
            <ul className="verify-text">
              <li>Som verificeret bruger, vil andre brugere kunne se at du har lagt et depositum og vi vil anbefale andre bruger at handle med dig, op til det beløb som du har lagt i depositum.</li>
              <li>Præcis som et forsikringsselskab, udligner vi dit økonomiske tab hvis svindel skulle opstå.</li>
              <li>Du kan til hver en tid kræve dit depositum tilbage.</li>
            </ul>
        </div>
        <div style={{marginBottom: '50px'}} className="col-md-6">
          <span className="num">4</span><h3 className="verify-h3">Altid tjek GoTrust før du handler.</h3>
            <p className="p-verify">Dobbelt tjek altid folks profiler på GoTrust.</p>
            <ul className="verify-text">
              <li>Aldrig tjek links folk sender dig.</li>
              <li>Hvis personen du handler med ikke er verificeret, vil vi råde dig til at bruge en MM.</li>
              <li>Hvis du handler med skins/penge over 10000.00 kr, er du forpligtet til at bruge en MM fra listen.</li>

            </ul>
        </div>
      </div>
      {(this.props.auth == false) ? null :
        <button onClick={this.verifyMe.bind(this)} style={{backgroundColor: 'rgba(43, 87, 102, 0.6)', marginLeft: '38%', padding: '10px'}} className="btn btn-primary">Jeg er enig i overstående og vil ansøge.</button>
      }
      </div>

    }

    if(this.state.hasAccepted == true){
      content =
      <div>
      <div className="row logoPanel">

        <p>Bliv en del af et sikkert Community</p>
      </div>
      <div className="row">
        <div style={{padding: '10px 40px'}} className="main-login main-center">

            <div className="form-group">
            <h5 style={{marginLeft: '37%', marginBottom: '3%'}}>Forbind din bruger med Steam</h5>

              <div className="cols-sm-10">

                    {this.connectedAccount()}

              </div>
            </div>

            <div className="form-group">
              <label style={{textAlign: 'center'}} className="cols-sm-2 control-label">Når du har forbundet din steam account, er din ansøgning automatisk sendt afsted, og vil blive vurderet af vores moderators indenfor de næste 24 timer.</label>
            </div>

        </div>
      </div>
      </div>
    }


    return(

    <div>
    {this.head()}
      <div className="bodyGradient">


        <div className="main" style={{paddingTop: '110px'}}>
          <div className="container" style={{width: '1300px'}}>
          <Link to={'/'}><img style={{width: '8%', left: '42%', position: 'relative'}} className="logo-img" src="img/lion_logo2.png" alt=""/></Link>
            {content}



          </div>
        </div>
      </div>

    </div>
    )
  }
}

function mapStateToProps(state) {
  return {auth: state.auth };
}

export default {
  component: connect(mapStateToProps)(requireAuth(VerifyPage))
};
