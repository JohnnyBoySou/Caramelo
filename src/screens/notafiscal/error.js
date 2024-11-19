import React, { useContext, useEffect } from 'react';
import { Main, Column, Label, Title, Row, Button, ButtonPrimary, Scroll, LabelBT } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { ArrowLeft, Info } from 'lucide-react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { excludeAllNotas } from './hook';

export default function NotafiscalErrorScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const status = route.params?.status ? route.params?.status : 'Erro ao enviar nota';

    const clearNotas = async () => {
        try {
            await excludeAllNotas();
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        clearNotas();
    }, [])

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
                    <Title style={{ fontSize: 26, lineHeight: 28, textAlign: 'center', marginVertical: 24, }}>{status}</Title>
                    <Button onPress={() => { navigation.navigate('Notafiscal') }} radius={16} style={{ borderWidth: 2, borderColor: color.sc, paddingHorizontal: 45, paddingVertical: 12, }}>
                        <LabelBT color={color.title}>Tentar novamente</LabelBT>
                    </Button>
                </Column>

            </Scroll>
        </Main>
    )
}

