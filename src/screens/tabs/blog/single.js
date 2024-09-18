import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme } from '@theme/global';

export default function BlogSingleScreen({ navigation, route }) {
    const { color, font, } = useTheme();
    const id = route.params.id;

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