import { shallow } from 'enzyme';
import React from 'react';
import 'react-native';
import TaskList from '../src/components/TaskList';

// Note: try to configure enzyme once - not stable yet
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

const createTestProps = (props: object) => ({
  ...props
});
configure({ adapter: new Adapter() });

describe('TaskList', () => {
  const props = createTestProps({});
  const wrapper = shallow<TaskList>(<TaskList {...props} />);
                               
  describe('rendering', () => {

    it('renders correctly', () => {
      renderer.create(<TaskList />);
    });    

    it('should render a <View />', () => {
      expect(wrapper.find('View')).toHaveLength(1);
    });
    
  });
});
