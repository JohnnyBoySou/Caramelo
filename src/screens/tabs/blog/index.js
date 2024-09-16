import React, { useContext, useState } from 'react';
import { Main, Scroll, Column, Row, Button, useTheme, Title, Label, Image, } from '@theme/global';

export default function BlogScreen({ navigation, route }) {
    const { color, font, margin } = useTheme();


    return (
        <Main style={{}}>
            <Scroll>
                <Column style={{ marginHorizontal: margin.h, marginVertical: 20, flex: 1, }}>
                    <Image source={require('@imgs/logo_h.png')} style={{ width: 200, height: 52, borderRadius: 50, alignSelf: 'center', }} />
                </Column>
            </Scroll>
        </Main>
    )
}
