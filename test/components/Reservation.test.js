import 'jsdom-global/register';
import React from 'react';
import axios from 'axios';
import { shallow } from 'enzyme';

import Reservation from '../../client/components/Reservation';
import ReservationHeader from '../../client/components/ReservationHeader';
import ReservationForm from '../../client/components/ReservationForm';

jest.mock('axios');

const generateMockListing = (
  {
    listingID = 1,
    name = 'Seattle',
    maxGuests = 7,
    minDays = 2,
    rate = 90,
    cleaningFee = 50,
    serviceFee = 13,
    dates = [],
  },
) => ({
  listingID,
  name,
  maxGuests,
  minDays,
  rate,
  cleaningFee,
  serviceFee,
  dates,
});

const mockListing = generateMockListing({});

describe('<Reservation />', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    wrapper = shallow(<Reservation />);
    props = {
      ...mockListing,
    };
  });

  describe('render', () => {
    test('it should render a Loading div upon initial render', () => {
      const loading = wrapper.find('div');
      expect(loading).toHaveLength(1);
      expect(loading).text().toEqual('Loading...');
    });

    test('it should render ReservationHeader with the right props', () => {
      axios.get.mockResolvedValueOnce(mockListing);
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
