import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, ButtonPrimary } from '@theme/global';
import { ArrowLeft } from 'lucide-react-native';

import SucessAnim from '@anim/sucess';

export default function NotafiscalSuccessScreen({ navigation, route }) {
    const { color, font, margin } = useTheme();
    const status = route.params?.status;
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
                    <Title style={{ fontSize: 32, lineHeight: 34, textAlign: 'center', marginVertical: 24, }}>{status}</Title>
                    <Label style={{ textAlign: 'center', }}>Ficamos muito gratos por sua ajuda!</Label>
                </Column>

                <Column style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20, }}>
                    <ButtonPrimary label='Nova nota fiscal' onPress={() => { navigation.navigate('Notafiscal') }} style={{ paddingHorizontal: 24, borderColor: color.primary, }} />
                    <Column style={{ height: 20, }} />
                    <ButtonPrimary type='sc' label='Ver minhas notas' onPress={() => { navigation.navigate('History') }} style={{ paddingHorizontal: 24, borderColor: color.secundary, }} />
                </Column>
            </Scroll>

        </Main>
    )
}

