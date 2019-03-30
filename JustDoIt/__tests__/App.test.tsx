import { shallow } from 'enzyme';
import React from 'react';
import 'react-native';
import App from '../App';

// Note: test renderer must be required after react-native.
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

const createTestProps = (props: object) => ({
  ...props
});
configure({ adapter: new Adapter() });

describe('App', () => {
  const props = createTestProps({});
  const wrapper = shallow<App>(<App {...props} />);
                               
  describe('rendering', () => {

    it('renders correctly', () => {
      renderer.create(<App />);
    });    

    it('should render a <View />', () => {
      expect(wrapper.find('View')).toHaveLength(1);
    });
    
  });
});
