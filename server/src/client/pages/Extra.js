renderContent(){
  switch (this.state.status) {
    case "pending":
        return(
          <div id="invalidAccount" className="pwnedSearchResult pwnedRow panel-collapse" style={{display: this.state.pendingDisplay}}>
            <div className="container">
              <div className="row pwnResultBanner">
              <div className="pwnTitle">
                <h2>
                  Denne bruger er ved at blive godkendt — Brug din sunde fornuft og vær kritisk når du handler med denne bruger!
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
        )


  case "unverified":
      return(
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
      )

    case "member":
        return(
            <div id="noPwnage" className="pwnedSearchResult panel-collapse" style={{display: this.state.memberDisplay}}>
              <div className="container">
                <div className="row pwnResultBanner">
                  <div className="pwnTitle">
                    <h2>Gode Nyheder &mdash; {this.state.name} er medlem!</h2>
                    <p>
                      Det er nu op til dig at vurdere om du vil stole på personen, udfra nedenstående oplysninger.
                    </p>
                    <p className="actionsBar text-center">
                    <a href="#" className="pwnResultLink notifyOfPwning"><i className="fa fa-check-circle" aria-hidden="true"></i>Depositum:</a>
                    <h3>{this.state.deposit}.00 kr</h3>
                    </p>

                  </div>
                  <p style={{fontWeight: '300'}}>Dette er personens sociale profiler:</p>
                  <a href={'https://www.facebook.com/'+ this.state.facebookid} target="_" style={{fontWeight: '300', padding: '5px'}} className="btn btn-facebook"><i className="fa fa-facebook fa-fw"></i> Facebook</a>
                  <a href={'https://steamcommunity.com/id/'+ this.state.steamid} target="_" style={{fontWeight: '300', padding: '5px'}} className="btn btn-steam"><i style={{marginLeft: '-15px', marginRight: '6px'}} className="fa fa-steam fa-fw"></i> Steam</a>
                  <p className="actionsBar text-center">

                  </p>
                  <p className="socialLinks">
                    <a style={{color: '#ffffff8a'}} className="socialLink" href="#"><i className="fa fa-facebook-square fa-3x"></i></a>
                    <a style={{color: '#ffffff8a'}} className="socialLink" href="#"><i className="fa fa-twitter-square fa-3x"></i></a>
                  </p>
                </div>
              </div>
            </div>
        )

      case "verified":
          return(
            <div id="member" className="pwnedSearchResult panel-collapse" style={{display: this.state.verifiedDisplay}}>
              <div className="container">
                <div className="row pwnResultBanner">
                  <div className="pwnTitle">
                    <h2>Gode Nyheder &mdash; {this.state.name} er verficeret!</h2>
                    <p>
                      Du kan trygt handle med denne bruger, op til det beløb som er lagt i depositum.
                    </p>
                    <p className="actionsBar text-center">
                    <a href="#" className="pwnResultLink notifyOfPwning"><i style={{marginRight: '5px'}} className="fa fa-check-circle" aria-hidden="true"></i>Depositum:</a>
                    <h3>{this.state.deposit}.00 kr</h3>
                    </p>

                  </div>
                  <p style={{fontWeight: '300'}}>Dette er personens sociale profiler:</p>
                  <a href={'https://www.facebook.com/'+ this.state.facebookid} target="_" style={{fontWeight: '300', padding: '5px'}} className="btn btn-facebook"><i className="fa fa-facebook fa-fw"></i> Facebook</a>
                  <a href={'https://steamcommunity.com/id/'+ this.state.steamid} target="_" style={{fontWeight: '300', padding: '5px'}} className="btn btn-steam"><i style={{marginLeft: '-15px', marginRight: '6px'}} className="fa fa-steam fa-fw"></i> Steam</a>
                  <p className="actionsBar text-center">

                  </p>
                  <p className="socialLinks">
                    <a className="socialLink" href="#"><i className="fa fa-facebook-square fa-3x"></i></a>
                    <a className="socialLink" href="#"><i className="fa fa-twitter-square fa-3x"></i></a>
                  </p>
                </div>
              </div>
            </div>
          )

  }
}













// if(response.result != null){
//   if(response.result.status == "pending"){
//     this.setState({
//       isDisabled: true,
//       status: response.result.status,
//       pendingDisplay: 'block',
//       name: (response.result.name == null) ? null : response.result.name
//     })
//   } else if(response.result.status == "verified"){
//     this.setState({
//       isDisabled: true,
//       status: response.result.status,
//       verifiedDisplay: 'block',
//       name: (response.result.name == null) ? null : response.result.name
//     })
//   } else if(response.result.status == "member"){
//     this.setState({
//       isDisabled: true,
//       status: response.result.status,
//       memberDisplay: 'block',
//       name: (response.result.name == null) ? null : response.result.name
//     })
//   } else if(response.result.status == "unverified"){
//     this.setState({
//       isDisabled: true,
//       unverifiedDisplay: 'block'
//     })
//   }
// }  else {
//   this.setState({
//     isDisabled: true,
//     unverifiedDisplay: 'block'
//   })
// }
