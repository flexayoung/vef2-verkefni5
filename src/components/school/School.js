import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet';

import './School.css';
import Department from '../department';


/**
 * Í þessum component ætti að vera mest um að vera og séð um að:
 * - Sækja gögn fyrir svið og birta
 * - Opna/loka deildum
 */

const baseurl = process.env.REACT_APP_SERVICE_URL;


export default class School extends Component {
  state = {
    heading: PropTypes.string,
    departments: PropTypes.array,
    visible: PropTypes.bool,
    loading: true,
    error: false,
    isChanging: false,
  };

  onHeaderClick = (heading) => {
    return (e) => {   
      const visible = this.state.visible === heading ? null : heading;
      this.setState({ visible });
    }
  }

  async componentDidMount() {    
    try {  
      const { slug } = this.props.match.params;
      const data = await this.fetchData(slug);      
      this.setState({ heading: data.school.heading, departments: data.school.departments, loading: false });      
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

  async fetchData(slug) {
    const url = baseurl + slug;    
    const response = await fetch(url);
    const data = await response.json();        
    return data;
  }

  render() {
    const { heading, departments, loading, error } = this.state;
      
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
      <section className="school">
        <Helmet title={heading} />
        <h2>{heading}</h2>
        {
          departments.map((i) => {
            return (
              <li key={i.heading} className="list__dep">
                <Department
                  title={i.heading}
                  tests={i.tests}
                  visible={this.state.visible === i.heading}
                  onHeaderClick={(this.onHeaderClick(i.heading))}
                />
              </li>
            )
        })
        }
        <p className="nav__home"><Link to='/'>Heim</Link></p>
      </section>
    )}
  
    
}
