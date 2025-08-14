import React, {useCallback, useState} from 'react'
import jwtDecode from 'jwt-decode'
import {LtiHeightLimit, LtiPageSettings, LtiTokenRetriever} from '@oxctl/ui-lti'
import {Heading, List, Text, View} from "@instructure/ui";

function App() {
    const [jwt, setJwt] = useState(null)

    // useCallback is used to memoize the function so that it does not change on every render
    const updateToken = useCallback((receivedToken) => {
        const jwt = jwtDecode(receivedToken)
        setJwt(jwt);
    },[])

    return (
        <LtiHeightLimit>
            <LtiTokenRetriever handleJwt={updateToken}>
                <LtiPageSettings>
                    <View as='div' padding='small'>
                        <Heading level='h2'>Hello LTI World</Heading>
                        <View as='p'>
                            Well done on launching the sample LTI 1.3 tool.
                        </View>
                        <Heading level='h3'>Theme</Heading>
                        <View as='div'>
                            Example of text colour use:
                            <List>
                                <List.Item><Text color="primary">primary</Text></List.Item>
                                <List.Item><Text color="secondary">secondary</Text></List.Item>
                                <List.Item><Text color="brand">brand</Text></List.Item>
                            </List>
                        </View>
                        <Heading level='h3'>Data</Heading>
                        <Text as='p'>
                            This is the data that was passed across in the LTI launch:
                            
                        </Text>
                        <Text as='div'>
                            <pre style={{whiteSpace: 'pre-wrap'}}>
                                {JSON.stringify(jwt, null, 3)}
                            </pre>
                        </Text>


                    </View>
                </LtiPageSettings>
            </LtiTokenRetriever>
        </LtiHeightLimit>
    )
}

export default App
