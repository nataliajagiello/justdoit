import { shallow } from 'enzyme';
// Note: try to configure enzyme once - not stable yet
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {Switch, Text} from 'react-native';
import renderer from 'react-test-renderer';
import Task from '../src/components/TaskList';

const createTestProps = (props: object) => ({
  ...props
});
configure({ adapter: new Adapter() });

describe('Task', () => {
  const props = createTestProps({});
  const wrapper = shallow<Task>(<Task {...props} />);
                               
  describe('rendering', () => {

    it('renders correctly', () => {
      renderer.create(<Task />);
    });    

/*      it('should render a <Text />', () => {
        expect(wrapper.find(Switch)).toHaveLength(2);
      });    */
  });
});
