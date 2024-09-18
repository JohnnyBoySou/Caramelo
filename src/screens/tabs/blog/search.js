import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme } from '@theme/global';

export default function BlogSearchScreen({ navigation, route }) {
    const { color, font, } = useTheme();

    return (
        <Main>
            <Scroll>
                <Column>
                    <Title></Title>
                </Column>
            </Scroll>
        </Main>
    )
}