import React, { Component } from 'react'

export default class NewsItem extends Component {  
   
  render() {
    
    let {title,description,imageurl,newsurl,author,date,source} = this.props;
    return (
      <div>
      <div className="card" >
      <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"style={{left:'90%',zIndex: '1'}}>{source}
  </span>
      <img src={imageurl} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}...</p>
        <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {date} </small></p>
        <a rel='noreferrer' href={newsurl} target='_blank' className="btn btn-dark">Read More</a>
      </div>
    </div>
    </div>
    )
  }
}
