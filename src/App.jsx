import React, {useState} from 'react'
import jwtDecode from 'jwt-decode'
import {LtiHeightLimit, LtiTokenRetriever} from '@oxctl/ui-lti'
import {Heading} from "@instructure/ui-heading";
import {Text} from "@instructure/ui-text"
import LtiApplyTheme from "./LtiApplyTheme.jsx";
import {View} from "@instructure/ui-view";

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
                        <Text as='p'>
                            Well done on launching the sample LTI 1.3 tool.
                        </Text>

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
