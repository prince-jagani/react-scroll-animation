import React from 'react';
import { Div } from '../src';
import { Text } from '../src';

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