import React from 'react'
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';




const DarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const body = document.body;
        isDarkMode ? body.classList.add('dark-mode') : body.classList.remove('dark-mode');
    }, [isDarkMode]);

    const handleSwitchToggle = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <>
            <div>
                <Form>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label=""
                        onClick={handleSwitchToggle}
                    />
                    {isDarkMode ? "Light-Mode" : "Dark-Mode"}

                </Form>

            </div>

        </>
    )
}

export default DarkMode