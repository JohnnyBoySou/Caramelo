import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { Main } from '@theme/global';

const { width, height } = Dimensions.get('window');

export default function AuthLoginPage({ navigation, route, }) {
    const { color, font } = useContext(ThemeContext)

    return (
        <Main style={{}}>
            <Scroll>

            </Scroll>
        </Main>
    )
}