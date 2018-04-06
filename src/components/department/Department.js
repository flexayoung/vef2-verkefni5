import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Department.css';

/**
 * Þessi component ætti að vera einfaldur í birtingu en taka fall frá foreldri
 * sem keyrir þegar smellt er á fyrirsögn.
 */

export default class Department extends Component {

  state = {
    title: PropTypes.string,
    tests: PropTypes.object,
    visible: PropTypes.bool,
    onHeaderClick: PropTypes.func,
    loading: true,
    error: false,
  };

  static defaultProps = {
    visible: true,
    onHeaderClick: () => { },
  }

  render() {    
    const { title, tests, visible, onHeaderClick, loading, error } = this.props;
    
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
        <div className="department">
          {!visible && (<h3 onClick={onHeaderClick}>+ {title}</h3>)}
          {visible && (
           <div>
           <h3 onClick={onHeaderClick}>- {title}</h3>
            <table>
              <thead>
                <tr>
                <th>Auðkenni</th>
                <th>Námskeið</th>
                <th>Fjöldi</th>
                <th>Dagsetning</th>
                </tr>
              </thead>
              <tbody>
                {tests.map((i) => {
                  return(
                    <tr>
                      <td>{i.course}</td>
                      <td>{i.name}</td>
                      <td>{i.students}</td>
                      <td>{i.date}</td>
                    </tr>
                  )
                  
                })}
              </tbody>
            </table>
            </div>
        )}            
        </div>
      );

  }
}
