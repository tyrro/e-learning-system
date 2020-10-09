import { configure as enzymeConfigure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.I18n = {
  locale: 'en-GB',
  t: jest.fn().mockImplementation(key => `Translation: ${key}`),
};

// *********************************
// Enzyme Integration
// *********************************
enzymeConfigure({ adapter: new Adapter() });
