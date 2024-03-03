import React from 'react';
import Div from '../src/Div';
import Text from '../src/Text';

const TestApp: React.FC = () => {
    return (
        <>
            <Div type='fade'>
                <Text content='Test' type='typewriter' />
            </Div>
        </>
    )
}

export default TestApp;