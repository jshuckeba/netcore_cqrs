import React from 'react';
import {shallow} from 'enzyme';
import {MainPage} from './MainPage';
import { Dimmer, Sidebar } from "semantic-ui-react";

describe('<MainPage />',
    () => {
        it('should show loader',
            () => {
                const pendingTasks = 2;
                const wrapper = shallow(<MainPage />);
                wrapper.setProps({ pendingTasks: pendingTasks });
                expect(wrapper.find(Dimmer).node.props.active).toEqual(true);
            });

        it('should show error response',
            () => {
                const errorResponse = {"id": 111};
                const wrapper = shallow(<MainPage />);
                wrapper.setProps({ errorResponse: errorResponse });
                expect(wrapper.find(Sidebar).node.props.visible).toEqual(true);
            });
    });