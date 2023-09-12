import {useEffect, useState} from 'react'
import {EmotionThemeProvider} from '@instructure/emotion'
import {canvas, canvasHighContrast} from '@instructure/ui-themes'

function LtiApplyTheme({url, highContrast, children}) {

    const [theme, setTheme] = useState(null)

    const loadTheme = () => {
        if (url) {
            fetch(url)
                .then(response => response.json())
                .then((json) => {
                    // Apply the loaded theme.
                    const newTheme = highContrast ? canvasHighContrast : {...canvas, ...json}
                    setTheme(newTheme)
                })
        }
    }

    useEffect(() => {
        loadTheme()
    }, []);

    return (
        <EmotionThemeProvider theme={theme}>
            {children}
        </EmotionThemeProvider>
    )

}

export default LtiApplyTheme
