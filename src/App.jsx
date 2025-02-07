import React, {useState} from 'react'
import jwtDecode from 'jwt-decode'
import {LtiApplyTheme, LtiHeightLimit, LtiTokenRetriever} from '@oxctl/ui-lti'
import {Heading, List, ListItem, Text, View} from "@instructure/ui";

function App() {
    const [jwt, setJwt] = useState(null)
    const [comInstructureBrandConfigJsonUrl, setComInstructureBrandConfigJsonUrl] = useState(null)
    const [canvasUserPrefersHighContrast, setCanvasUserPrefersHighContrast] = useState(null)


    const updateToken = (receivedToken) => {
        const jwt = jwtDecode(receivedToken)
        setJwt(jwt);
        setComInstructureBrandConfigJsonUrl(jwt['https://purl.imsglobal.org/spec/lti/claim/custom'].com_instructure_brand_config_json_url)
        setCanvasUserPrefersHighContrast(jwt['https://purl.imsglobal.org/spec/lti/claim/custom'].canvas_user_prefers_high_contrast === 'true')
    }

    return (
        <LtiHeightLimit>
            <LtiTokenRetriever handleJwt={updateToken}>
                <LtiApplyTheme url={comInstructureBrandConfigJsonUrl} highContrast={canvasUserPrefersHighContrast}>
                    <View as='div' padding='small'>
                        <Heading level='h2'>Hello LTI World</Heading>
                        <View as='p'>
                            Well done on launching the sample LTI 1.3 tool.
                        </View>
                        <Heading level='h3'>Theme</Heading>
                        <View as='p'>
                            Example of text colour use:
                            <List>
                                <ListItem><Text color="primary">primary</Text></ListItem>
                                <ListItem><Text color="secondary">secondary</Text></ListItem>
                                <ListItem><Text color="brand">brand</Text></ListItem>
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
                </LtiApplyTheme>
            </LtiTokenRetriever>
        </LtiHeightLimit>
    )
}

export default App
