import React, { Component } from 'react';
import '../styles/header.css';
import interviewSVG from '../assets/svgs/interview.svg';
import QuotationMarks from '../assets/PNGs/QuotationMarks.png';
import selectiveSVG from '../assets/PNGs/selective.png';

class Header extends Component {

  render() {
    return (
      <section className="container-fluid" id="header">
        <div className="row row-1">
          <div className="col-md item1">
            <h1>Learn From <br></br> Experiences</h1>
          </div>
          <div className="col-md item2">
            <img src={interviewSVG} alt="" className="img-interview"></img>
          </div>
        </div>
        <div className="row quote-div">
          <img src={QuotationMarks} alt="" className="quote-mark quote-mark-open"></img>
          <h1 className="quote-text">
            While it is wise to learn from experience,<br></br>it is wiser to learn from the experiences of others.
          <br></br><span> -- </span><span className="quote-author">Rick Warren</span>
          </h1>
          <img src={QuotationMarks} alt="" className="quote-mark quote-mark-close"></img>
        </div>
        <div className="row propoganda-div">
          <div className="col-md propoganda-img-div">
            <img className="propoganda-img" src={selectiveSVG} alt=""></img>
          </div>
          <div className="col-md propoganda-text-div">
            <h1 className="propoganda-text">We present you the most curated real experiences.</h1>
          </div>
        </div>
      </section>
    );
  }
}

export default Header;