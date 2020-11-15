import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../public/styles/calendar.css';

class Month extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { month, left } = this.props;
    const monthHeader = left
      ? (
        <div className={styles.monthHeaderLeft}>
          <span>
            <button type="submit">&lt;</button>
          </span>
          <span>{month}</span>
        </div>
      )
      : (
        <div className={styles.monthHeaderRight}>
          <span>{month}</span>
          <span>
            <button type="submit">&gt;</button>
          </span>
        </div>
      );
    // algorithmically create table
    return (
      <div className={styles.monthContainer}>
        {monthHeader}
        <table>
          <tbody className={styles.monthBody}>
            <tr>
              <td className="weekday Sunday">Su</td>
              <td className="weekday Monday">Mo</td>
              <td className="weekday Tuesday">Tu</td>
              <td className="weekday Wednesday">We</td>
              <td className="weekday Thursday">Th</td>
              <td className="weekday Friday">Fr</td>
              <td className="weekday Saturday">Sa</td>
            </tr>
            <tr className="week week1">
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
            </tr>
            <tr className="week week2">
              <td>8</td>
              <td>9</td>
              <td>10</td>
              <td>11</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
            </tr>
            <tr className="week week3">
              <td>15</td>
              <td>16</td>
              <td>17</td>
              <td>18</td>
              <td>19</td>
              <td>20</td>
              <td>21</td>
            </tr>
            <tr className="week week4">
              <td>22</td>
              <td>23</td>
              <td>24</td>
              <td>25</td>
              <td>26</td>
              <td>27</td>
              <td>28</td>
            </tr>
            <tr className="week week5">
              <td>29</td>
              <td>30</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Month.propTypes = {
  month: PropTypes.string.isRequired,
  left: PropTypes.bool,
};

Month.defaultProps = {
  left: false,
};

export default Month;
