import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme } from '@theme/global';
import { Input } from '@components/Forms';
import { Header } from '@components/Header';

export default function BlogSearchScreen({ navigation, route }) {
    const { color, font, margin } = useTheme();
    const [query, setQuery] = useState();
    return (
        <Scroll style={{ backgroundColor: '#fff', paddingTop: 20, }}>
            <Column mh={margin.h} style={{ rowGap: 20, }}>
                <Header title="Pesquisar" />
                <Input
                    label="Pesquisar"
                    value={query}
                    setValue={setQuery}
                />
            </Column>
        </Scroll>
    )
}