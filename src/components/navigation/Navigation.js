import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'

import './Navigation.css';

/* hér ætti að sækja gögn frá vefþjónustu fyrir valmynd */
export default class Navigation extends Component {
  state = {
    data: null,
    loading: true,
    error: false,
  };


  async componentDidMount() {
    try {
      const data = await this.fetchData();
      this.setState({ ...data.stats, loading: false });
      let departments = data.schools.map((i) => {
        return (
          <p key={i.name} ><NavLink to={i.slug}>{i.name}</NavLink></p>
        )
      });
      this.setState({ data: departments });
    } catch (e) {
      console.error('Error fetching data', e);
      this.setState({ error: true, loading: false })
    }
  }

  async fetchData() {
    const { url } = this.props;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  
  render() {   
    const { data, loading, error } = this.state;

    if (loading) {
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
      <nav className="navigation">
      {
         data
      }
      </nav>
    );
  }
}