//make React available
import React from 'react';
//make the ReactDome available, necessary for rendering
import ReactDOM from 'react-dom';
//make the Card component available 
import App from './Card';
//make the snapshot test available 
import renderer from 'react-test-renderer';


describe('Card component', () => {
    //this is the test case (smoke test)
    it('renders without crashing', () => {
        //first create the DOM element to render the component into
        const div = document.createElement('div');
        //render the component. This is the actual test. If something is wrong, it will fail here
        ReactDOM.render(<App />, div);
        //clean up code
        ReactDOM.unmountComponentAtNode(div);
    });


    //snapshot test
    //render the component and create a human readable JSON file
    //Compare the rendered component to a saved version of the component
    it('renders the UI as expected', () => {
        const tree = renderer
        .create(<Card name="Card" unread={4}/>)
        .toJSON();
        expect(tree).toMatchSnapshot();  
    });
});
