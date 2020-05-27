import React, { Component } from 'react';
import { singleShow } from './../../Services/singleShow';

class SingleShow extends Component {
  constructor() {
    super();
    this.state = {
      singleShow: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    singleShow(this.props.match.params.id)
      .then((show) => {
        this.setState({
          singleShow: show,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const single = this.state.singleShow;

    return (
      <>
        <header>
          {/* <img src={single.image} alt="" /> */}
          <small>{}</small>
          <h1>{single.name}</h1>
          <p>{single.summary}</p>
        </header>
        <main></main>
      </>
    );
  }
}

export default SingleShow;
