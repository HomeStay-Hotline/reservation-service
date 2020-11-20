import 'jsdom-global/register';
import React from 'react';
import { shallow } from 'enzyme';

import ReservationHeader from '../../client/components/ReservationHeader';

const mockListing = {
  listingID: 1,
  name: 'Seattle',
  maxGuests: 7,
  minDays: 2,
  rate: 90,
  cleaningFee: 50,
  serviceFee: 13,
};

describe('<ReservationHeader />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ReservationHeader rate={mockListing.rate} />);
  });

  describe('render', () => {
    test('it should render a header for the Reservation module', () => {
      expect(wrapper.is('.header')).toBe(true);
    });
  });
});
