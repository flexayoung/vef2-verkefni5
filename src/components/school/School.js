import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    heading: '',
    departments: [],
    visibleNote: null,
    loading: true,
    error: false,
  };

  onHeaderClick = (heading) => {
    return (e) => {
      const visibleNote = this.state.visibleNote === heading ? null : heading;
      this.setState({ visibleNote });
    }
  }

  async componentDidMount() {
    try {      
      const { slug } = this.props.match.params;
      const data = await this.fetchData(slug);
      this.setState({ heading: data.school.heading, departments: data.school.departments, loading: false });      
      let schools = data.school.departments.map((i) => {
        return(
        <li key={i.heading}>
        <Department 
          title={i.heading}
          tests={i.tests}
          visible={this.state.visible === i.heading}
          onHeaderClick={(this.onHeaderClick(i.heading))}
          />
        </li>
      )
        
      });
      this.setState({ schools });
      
    } catch (e) {
      console.error('Error fetching data', e);
      this.setState({ error: true, loading: false })
    }
  }

  async fetchData(slug) {
    const url = baseurl + slug;    
    const response = await fetch(url);
    const data = await response.json();        
    return data;
  }

  render() {
    const { heading, schools, loading, error } = this.state;

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
      <nav className="school">
      <h2>{heading}</h2>
        {
          schools
        }
      </nav>
    );
  }
}
