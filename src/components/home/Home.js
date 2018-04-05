import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { fetchStats } from '../../actions/notes';
import './Home.css';

const baseurl = process.env.REACT_APP_SERVICE_URL;


/* hér ætti að sækja forsíðu vefþjónustu til að sækja stats */
export default class Home extends Component {
  state = {
    data: {
      averageStudents: 0,
      max: 0,
      min: 0,
      numStudents: 0,
      numTests: 0,
    },
    loading: true,
    error: false,   
  };


  async componentDidMount() {
    try {
      const data = await this.fetchData();
      this.setState({ ...data.stats, loading: false });
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
              <td>Fjöldi Prófa</td>
              <td>{this.state.numTests}</td>
            </tr>
            <tr>
              <td>Fjöldi nemenda í öllum prófum</td>
              <td>{this.state.numStudents}</td>
            </tr>
            <tr>
              <td>Meðalfjöldi nemenda í prófum</td>
              <td>{this.state.averageStudents}</td>
            </tr>
            <tr>
              <td>Minnsti fjöldi nemenda í prófum</td>
              <td>{this.state.min}</td>
            </tr>
            <tr>
              <td>Mesti fjöldi nemenda í prófum</td>
              <td>{this.state.max}</td>
            </tr>
          </tbody>
        </table>
       </div>
    );
  }
}