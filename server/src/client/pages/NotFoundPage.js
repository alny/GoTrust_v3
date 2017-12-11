import React from 'react';

const NotFoundPage = ({ staticContext = {} }) => {
  staticContext.notFound = true;
  return (
      <div style={{height: 'auto', minHeight:'100%'}} >
        <div style={{textAlign: 'center', width: '800px', marginLeft: '-400px', position: 'absolute', top: '30%', left:'50%'}}>
          <h1 style={{margin:0, fontSize:'150px', lineHeight:'150px', fontWeight:'bold'}}>404</h1>
          <h2 style={{marginTop:'20px', fontSize: '30px'}}>Not Found
          </h2>
          <p>The resource requested could not be found on this server!</p>
        </div>
      </div>
    )
};

export default {
  component: NotFoundPage
};
