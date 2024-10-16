import React, { useContext, } from 'react';
import { Main, Column, Label, Title, Row, Button, ButtonPrimary, Scroll, } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ArrowLeft, Info } from 'lucide-react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MotiView } from 'moti';

export default function NotafiscalErrorScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const status = route.params?.status

    return (
        <Main style={{ backgroundColor: "#fff", justifyContent: 'center', }}>
            <Scroll>

                <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: margin.h, }}>
                    <Button onPress={() => { navigation.goBack() }} style={{ backgroundColor: color.secundary, width: 46, height: 34, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                        <ArrowLeft color="#fff" />
                    </Button>
                    <Column >
                    </Column>
                    <Column style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }}>
                    </Column>
                </Row>

                <Column style={{ marginHorizontal: margin.h, marginVertical: 20, justifyContent: 'center', alignItems: 'center', flex: 1, }}>
                    <MotiView delay={300} from={{ opacity: 0, rotate: '90deg', scale: 0 }} animate={{ opacity: 1, rotate: '0deg', scale: 1, }}>
                        <MaterialCommunityIcons name="close-circle" size={100} color='red' />
                    </MotiView>
                    <Title style={{ fontSize: 32, lineHeight: 34, textAlign: 'center', marginVertical: 24, }}>{status}</Title>
                    <ButtonPrimary type='sc' label='Tentar novamente' onPress={() => { navigation.navigate('Notafiscal') }} style={{ paddingHorizontal: 24, borderColor: color.secundary, marginTop: 32, }} />
                </Column>

            </Scroll>
        </Main>
    )
}

