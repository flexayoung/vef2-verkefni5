import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'

import './Navigation.css';
const baseurl = process.env.REACT_APP_SERVICE_URL;

/* hér ætti að sækja gögn frá vefþjónustu fyrir valmynd */
export default class Navigation extends Component {
  state = {
    data: null,
    currentDep: null,
    loading: true,
    error: false,
  };


  async componentDidMount() {
    try {            
      const data = await this.fetchData(baseurl);
      this.setState({ ...data.schools, loading: false, currentDep: this.props.location.pathname });
      let departments = data.schools.map((i) => {
        console.log(i.link, " " , this.state.currentDep === i.link);
        
                
        return (
          <li key={i.name}>
            {(i.link !== this.state.currentDep) ? 
            (<NavLink to={i.slug}>{i.name}</NavLink>) :
            (<NavLink to={i.slug} className="nav__link--bold">{i.name}</NavLink>)
            } 
            </li>
        )}           
        )
      this.setState({ data: departments });
    } catch (e) {
      console.error('Error fetching data', e);
      this.setState({ error: true, loading: false })
    }
  }

  async componentWillReceiveProps(newProps) {
    this.props = newProps;
    this.setState({ loading: true })
    this.componentDidMount();
  }

  async fetchData(url) {    
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
        <ul>
        {
          data
        }
        </ul>
      </nav>
    );
  }
}