import 'jsdom-global/register';
import React from 'react';
import { shallow } from 'enzyme';

import Calendar from '../../client/components/Calendar';
import CalendarBody from '../../client/components/CalendarBody';

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

describe('<Calendar />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Calendar />);
  });

  describe('render', () => {
    test('it should render the calendar header', () => {
      expect(wrapper.find('.header').find('h1')).toHaveLength(1);
      expect(wrapper.find('.header').find('h1').text()).toEqual('Select check-in date');

      expect(wrapper.find('.header').find('h3')).toHaveLength(1);
      expect(wrapper.find('.header').find('h3').text()).toEqual('Add your travel dates for exact pricing');
    });

    test('it should render the CalendarBody with the right props', () => {
      const body = wrapper.find(CalendarBody);
      expect(body).toHaveLength(1);
      expect(body.props()).toEqual(
        expect.objectContaining({
          dates: expect.any(Array),
          handleCheckInSelect: expect.any(Function),
        }),
      );
    });

    test('it should render the calendar footer', () => {
      const footer = wrapper.find('.footer');
      expect(footer.find('button')).toHaveLength(2);

      expect(footer.find('button').at(0).text()).toEqual('<FontAwesomeIcon />');
      expect(footer.find('button').at(1).text()).toEqual('Clear dates');
    });
  });

  describe('functions', () => {
    test('it should call clearDates when "Clear dates" is clicked', () => {
      const setCheckInClicked = jest.fn();
      const setCheckOutClicked = jest.fn();
      const handleClearDatesClicked = jest.spyOn(React, 'useState');

      handleClearDatesClicked
        .mockImplementation((checkInClicked) => [checkInClicked, setCheckInClicked]);

      handleClearDatesClicked
        .mockImplementation((checkOutClicked) => [checkOutClicked, setCheckOutClicked]);

      wrapper.find('button').at(1).simulate('click');

      expect(setCheckInClicked).toBeTruthy();
      expect(setCheckOutClicked).toBeTruthy();
    });

    // UNFINISHED - should mock a call to handleCheckInSelect and check if state has been changed
    test('it should change the approriate state(s) when handleCheckInSelect is called', () => {
      const setCheckInDate = jest.fn();
      const setCheckInClicked = jest.fn();

      wrapper = shallow(<Calendar />);

      const handleCheckInSelected = jest.spyOn(React, 'useState');

      handleCheckInSelected
        .mockImplementation((checkInDate) => [checkInDate, setCheckInDate]);

      handleCheckInSelected
        .mockImplementation((checkInClicked) => [checkInClicked, setCheckInClicked]);
    });

    // UNFINISHED - should mock a call to handleCheckOutelect and check if state has been changed
    test('it should change the approriate state(s) when handleCheckOutSelect is called', () => {
      const setCheckOutDate = jest.fn();
      const setCheckOutClicked = jest.fn();

      wrapper = shallow(<Calendar />);

      const handleCheckOutSelected = jest.spyOn(React, 'useState');

      handleCheckOutSelected
        .mockImplementation((checkInDate) => [checkInDate, setCheckOutDate]);

      handleCheckOutSelected
        .mockImplementation((checkInClicked) => [checkInClicked, setCheckOutClicked]);
    });

    describe('async', () => {
      test('it should change state after axios request completes', () => {

      });
    });
  });
});
