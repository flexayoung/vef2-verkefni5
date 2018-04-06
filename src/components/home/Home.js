import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Home.css';

const baseurl = process.env.REACT_APP_SERVICE_URL;


/* hér ætti að sækja forsíðu vefþjónustu til að sækja stats */
export default class Home extends Component {
  state = {
    data: {
      averageStudents: PropTypes.number,
      max: PropTypes.number,
      min: PropTypes.number,
      numStudents: PropTypes.number,
      numTests: PropTypes.number,
    },
    loading: true,
    error: false,   
  };


  async componentDidMount() {
    try {
      const data = await this.fetchData();
      this.setState({ data: data.stats, loading: false });
    } catch (e) {
      console.error('Error fetching data', e);
      this.setState({ error: true, loading: false }) 
    }
  }

  async fetchData() {
    const url = baseurl + 'stats'; 
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }


  render() {
    
    const { data, loading, error } = this.state;

    if(loading) {
      return (
        <div>Sæki gögn</div>
      )
    }
    if (error) {
      return (
        <div>Villa að gögn</div>
      )
    }
    return (
      <div className="home">
        <h2>Tölfræði</h2>
        <table>
          <tbody>
            <tr>
              <td className="col__bold">Fjöldi Prófa</td>
              <td>{data.numTests}</td>
            </tr>
            <tr>
              <td className="col__bold">Fjöldi nemenda í öllum prófum</td>
              <td>{data.numStudents}</td>
            </tr>
            <tr>
              <td className="col__bold">Meðalfjöldi nemenda í prófum</td>
              <td>{data.averageStudents}</td>
            </tr>
            <tr>
              <td className="col__bold">Minnsti fjöldi nemenda í prófum</td>
              <td>{data.min}</td>
            </tr>
            <tr>
              <td className="col__bold">Mesti fjöldi nemenda í prófum</td>
              <td>{data.max}</td>
            </tr>
          </tbody>
        </table>
       </div>
    );
  }
}