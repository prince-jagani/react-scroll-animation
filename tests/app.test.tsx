import React from 'react';
import { Text, Div } from 'scroll-reveal-react';

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