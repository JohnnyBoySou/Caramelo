import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, HeadTitle, ButtonPrimary } from '@theme/global';
import { Header } from '@components/Header';
import { Pencil } from 'lucide-react-native';
import { Select } from '@components/Forms';

export default function DonateTypeScreen({ navigation, route }) {
    const { color, font, margin, } = useTheme();
    const value = route.params?.value ? route.params.value : 40;

    const [type, settype] = useState();

    return (
        <Main style={{ backgroundColor: color.pr, }}>
            <Column mh={margin.h}>
                <Header title="Pagamento" />
                <Column mv={20}>
                    <Title>R$</Title>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <HeadTitle style={{ fontFamily: font.bold, fontSize: 58, lineHeight: 68, }}>{value},00</HeadTitle>
                        <Button pv={1} ph={1} mv={1} mh={1} bg='#fff' onPress={() => { navigation.goBack() }} style={{ width: 36, height: 36, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                            <Pencil size={18} color={color.sc} />
                        </Button>
                    </Row>

                </Column>
            </Column>

            <Column style={{ borderRadius: 12, backgroundColor: '#fff', paddingHorizontal: margin.h, paddingTop: 20, paddingBottom: 500, }}>
                <HeadTitle style={{ letterSpacing: -1, }}>Forma de pagamento</HeadTitle>


                <Column style={{ rowGap: 18, marginVertical: 20, }}>
                    <Button onPress={() => { settype('Crédito') }} pv={1} ph={1} radius={2}>
                        <Row style={{ borderRadius: 12, borderWidth: 2, backgroundColor: type == 'Crédito' ? '#2ECA6F20' : '#fff', borderColor: type == 'Crédito' ? '#2ECA6F' : '#dedede', paddingVertical: 20, paddingHorizontal: 20, justifyContent: 'space-between', alignItems: 'center', }}>
                            <Column>
                                <Title>Cartão de Crédito</Title>
                                <Label>Até 5 x sem juros</Label>
                            </Column>
                            <Select status={type == 'Crédito'} />
                        </Row>
                    </Button>
                    <Button onPress={() => { settype('Pix') }} pv={1} ph={1} radius={2}>
                        <Row style={{ borderRadius: 12, borderWidth: 2, backgroundColor: type == 'Pix' ? '#2ECA6F20' : '#fff', borderColor: type == 'Pix' ? '#2ECA6F' : '#dedede', paddingVertical: 20, paddingHorizontal: 20, justifyContent: 'space-between', alignItems: 'center', }}>
                            <Column>
                                <Title>Pix</Title>
                                <Label>Aprovação instantânea </Label>
                            </Column>
                            <Select status={type == 'Pix'} />
                        </Row>
                    </Button>
                    <Button onPress={() => { settype('Boleto') }} pv={1} ph={1} radius={2}>
                        <Row style={{ borderRadius: 12, borderWidth: 2, backgroundColor: type == 'Boleto' ? '#2ECA6F20' : '#fff', borderColor: type == 'Boleto' ? '#2ECA6F' : '#dedede', paddingVertical: 20, paddingHorizontal: 20, justifyContent: 'space-between', alignItems: 'center', }}>
                            <Column>
                                <Title>Boleto bancário</Title>
                                <Label>Até 3 dias úteis</Label>
                            </Column>
                            <Select status={type == 'Boleto'} />
                        </Row>
                    </Button>


                </Column>
                <ButtonPrimary label="Continuar" pv={16} type="sc" onPress={() => { navigation.navigate('DonatePayment', { value: value, type: type }) }} />
            </Column>

        </Main>
    )
}