import { Main, Scroll, Column, Title, Row, Button, useTheme, ButtonPrimary, } from '@theme/global';
import { ArrowLeft } from 'lucide-react-native';

import SucessAnim from '@anim/sucess';
import { excludeAllNotas } from './hook';
import { useEffect } from 'react';

export default function NotafiscalSuccessScreen({ navigation, route }) {
    const { color,  margin } = useTheme();

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
        <Main style={{ backgroundColor: "#fff", }}>
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

                <Column style={{ marginHorizontal: margin.h, justifyContent: 'center', alignItems: 'center', flex: 1, }}>
                    <SucessAnim />
                    <Title style={{ fontSize: 32, lineHeight: 34, textAlign: 'center', marginVertical: 24, }}>Agradecemos muito por sua ajuda!</Title>
                </Column>

                <Column style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20, }}>
                    <ButtonPrimary label='Escanear outra nota' onPress={() => { navigation.navigate('AnonimoNota') }} style={{ paddingHorizontal: 32, borderColor: color.primary, }} />
                    
                </Column>
            </Scroll>

        </Main>
    )
}

