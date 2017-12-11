import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

class SupportPage extends Component {
  componentDidMount() {
  }

  head() {
    return (
      <Helmet>
        <title>GoTrust | Support</title>
        <meta property="og:title" content="GoTrust | Support" />
      </Helmet>
    );
  }



  render() {
    return (
  <div>
  {this.head()}
  <div id="content-block">
      <div className="container be-detail-container">
      <h2 className="content-title">FAQ`s</h2>
      <div className="row">

<div className="panel-group" id="faqAccordion">

<div className="panel panel-default">
    <div className="panel-heading accordion-toggle collapsed question-toggle" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question1">
         <h4 className="panel-title">
            <a href="#" className="ing"><i className="fa fa-angle-double-right" aria-hidden="true"></i> Hvordan fungerer GoTrust?</a>
      </h4>

    </div>
    <div id="question1" className="panel-collapse collapse" style={{height: '0px'}}>
        <div className="panel-body">
             <h5><span className="label label-primary">Svar</span></h5>

            <p style={{marginTop: '1%'}}>
              GoTrust fungerer ved at vi registrerer og verificerer de mest brugte og velkendte ansigter indenfor skin trading, og linker deres forskellige profiler som facebook og steam sammen, så du altid kan tjekke om du handler med den rigtige person.
              Du skal blot indsætte et facebook eller steam link og dernæst vil vi fortælle dig om du handler med den rigtige person.
            </p>
        </div>
    </div>
</div>
<div className="panel panel-default">
    <div className="panel-heading accordion-toggle collapsed question-toggle" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question2">
         <h4 className="panel-title">
            <a href="#" className="ing"><i className="fa fa-angle-double-right" aria-hidden="true"></i> Hvorfor skulle GoTrust være mere sikkert end andre platforme?</a>
      </h4>

    </div>
    <div id="question2" className="panel-collapse collapse" style={{height: '0px'}}>
        <div className="panel-body">
             <h5><span className="label label-primary">Svar</span></h5>

            <p style={{marginTop: '1%'}}>
              GoTrust er en bulletproof platform i den forstand at du altid har en forsikring i at hver eneste person der er verificeret har lagt et depositum, så selv hvis der skulle ske mistænkelige ting vil du få udbetalt det tabte.
            </p>
        </div>
    </div>
</div>
<div className="panel panel-default">
    <div className="panel-heading accordion-toggle question-toggle collapsed" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question3">
         <h4 className="panel-title">
            <a href="#" className="ing"><i className="fa fa-angle-double-right" aria-hidden="true"></i> Hvorfor er det nødvendigt med et depositum?</a>
      </h4>

    </div>
    <div id="question3" className="panel-collapse collapse" style={{height: '0px'}}>
        <div className="panel-body">
             <h5><span className="label label-primary">Svar</span></h5>
            <p style={{marginTop: '1%'}}>
              Præcis som når du lejer en bil, en lejlighed eller en båd, skal du lægge et depositum så personen ikke bare kan stjæle/ødelægge dine ting og stikke afsted med det uden nogen konsekvenser.
              Vi har konkluderet at det giver rigtig god mening for begge parter at skulle lægge et depositum og dermed have en langt større tryghed til at kunne handle sikkert.
            </p>
        </div>
    </div>
</div>

<div className="panel panel-default ">
    <div className="panel-heading accordion-toggle collapsed question-toggle" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question4">
         <h4 className="panel-title">
            <a href="#" className="ing"><i className="fa fa-angle-double-right" aria-hidden="true"></i> Hvordan og hvem kan blive verificeret?</a>
      </h4>

    </div>
    <div id="question4" className="panel-collapse collapse" style={{height: '0px'}}>
        <div className="panel-body">
             <h5><span className="label label-primary">Svar</span></h5>

            <p style={{marginTop: '1%'}}>
              Alle kan blive verificeret så længe man har et godt ry, en legit facebook/steam account og kan lægge et depositum på minimum 500.00 kr. Du skal blot læse betingelserne og udfylde ansøgningsskeamet under "Bliv Verificeret" i venstre hjørne.
            </p>
        </div>
    </div>
</div>
<div className="panel panel-default ">
    <div className="panel-heading accordion-toggle collapsed question-toggle" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question5">
         <h4 className="panel-title">
            <a href="#" className="ing"><i className="fa fa-angle-double-right" aria-hidden="true"></i> Hvor lang tid går der før jeg er verificeret?</a>
      </h4>

    </div>
    <div id="question5" className="panel-collapse collapse" style={{height: '0px'}}>
        <div className="panel-body">
             <h5><span className="label label-primary">Svar</span></h5>

            <p style={{marginTop: '1%'}}>Der går max 24 timer, så skulle din ansøgning være færdigbehandlet og dernæst skulle du være registreret i vores system.</p>
        </div>
    </div>
</div>
<div className="panel panel-default">
    <div className="panel-heading accordion-toggle collapsed question-toggle" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question6">
         <h4 className="panel-title">
            <a href="#" className="ing"><i className="fa fa-angle-double-right" aria-hidden="true"></i> Hvordan kommer jeg på MM listen?</a>
      </h4>

    </div>
    <div id="question6" className="panel-collapse collapse" style={{height: '0px'}}>
        <div className="panel-body">
             <h5><span className="label label-primary">Svar</span></h5>

            <p style={{marginTop: '1%'}}>Hvis du i forvejen ikke har opbygget dig et ry som MM i de forskellige trading kredse, så vil du højeste kunne være MM for det beløb du har lagt i depositum. Fx hvis du lægger 2500.00 kr skins i depositum, må du kun være MM i handler op til 2500.00 kr.
              Hvis du derimod allerede har et godt ry og flere af vores eksisterende MM's kan sige god for dig, skal du blot udfylde ansøgningsskeamet og dernæst vil du kunne finde dig selv i systemet asap.
            </p>
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
  return {};
}

export default {
  component: connect(mapStateToProps)(SupportPage)
};
