import { shallow } from 'enzyme';
import React from 'react';
import 'react-native';
import App from '../App';

// Note: test renderer must be required after react-native.
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import TaskList from '../src/components/TaskList'

configure({ adapter: new Adapter() });

describe('App', () => {
  const wrapper = shallow<App>(<App/>);
                               
  describe('rendering', () => {

    it('renders correctly', () => {
      renderer.create(<App />);
    });    

    it('should render a <TaskList/>', () => {
      expect(wrapper.find(TaskList)).toHaveLength(1);
    });
    
  });
});
