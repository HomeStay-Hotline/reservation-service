import 'jsdom-global/register';
import React from 'react';
import { shallow } from 'enzyme';

import Reservation from '../../client/components/Reservation';
import ReservationHeader from '../../client/components/ReservationHeader';
import ReservationForm from '../../client/components/ReservationForm';

const axios = require('axios');

jest.mock('axios');

const mockListing = {
  listingID: 1,
  name: 'Seattle',
  maxGuests: 7,
  minDays: 2,
  rate: 90,
  cleaningFee: 50,
  serviceFee: 13,
};

describe('<Reservation />', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    wrapper = shallow(<Reservation listingID={1} />);
    props = {
      ...mockListing,
    };
  });

  describe('render', () => {
    test('it should throw an error if GET request fails', () => {
      axios.get.mockRejectedValue(Error('Failed to retrieve data'));
      expect(wrapper.text()).toBe('Loading...');
    });

    test('it should render ReservationHeader with the right props', () => {
      axios.get.mockResolvedValue(mockListing);
      const header = wrapper.find(ReservationHeader);
      console.log(wrapper.debug());
      expect(header).toHaveLength(1);
      expect(header.props()).toBe({
        rate: props.rate,
      });
    });

    test('it should render ReservationForm with the right props', () => {

    });
  });
});
