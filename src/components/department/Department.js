import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Department.css';

/**
 * Þessi component ætti að vera einfaldur í birtingu en taka fall frá foreldri
 * sem keyrir þegar smellt er á fyrirsögn.
 */
const baseurl = process.env.REACT_APP_SERVICE_URL;

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

  // async componentDidMount() {
  //   try {      
  //     this.setState({ title: this.props.title, tests: this.props.tests, visible: this.props.visible, loading: false  })      
      
  //     let tests = this.props.tests.map((i) => {
  //       return (
  //         <tr>
  //           <th>{i.course}</th>
  //           <th>{i.name}</th>
  //           <th>{i.students}</th>
  //           <th>{i.date}</th>
  //         </tr>
  //       )})
  //     this.setState({ tests })
  //   } catch (e) {
  //     console.error('Error fetching data', e);
  //     this.setState({ error: true, loading: false })
  //   }
  // }

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
        console.log(this.state);

    if(visible) {
      return (
        <nav className="department">
        <h2>{title}</h2>
          <table>
            <thead>
              <tdtr>Auðkenni</tdtr>
              <td>Námskeið</td>
              <td>Fjöldi</td>
              <td>Dagsetning</td>
            </thead>
            <tbody>
              {tests}
            </tbody>
          </table>
        </nav>
      );
    }

    return null;
  }
}
