import React, { useContext, useState, } from 'react';
import { Dimensions, } from 'react-native';
import { Main, Scroll, Column, Row, Title, Image, Button, Label, ButtonPrimary } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';
import { ArrowRight, HeartHandshake, History } from 'lucide-react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation, }) {
    const { color, font, margin, } = useContext(ThemeContext);
    const isFocused = useIsFocused();
    const [user, setuser] = useState({
        name: 'João de Sousa',
        email: 'joaosousa@gmail.com',
        notas: 14,
        doacoes: 21,
        comments: 30,
        likes: 62,
        avatar: 'https://avatar.iran.liara.run/public/24',
    });

    return (
        <Column style={{ flex: 1, backgroundColor: '#fff', }}>
            {isFocused && <StatusBar style='dark' backgroundColor={color.pr}/>}
            <Scroll>
                <Column style={{ paddingTop: 50, paddingHorizontal: margin.h, paddingBottom: 20, backgroundColor: color.pr, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Image source={require('@imgs/logo_home.png')} style={{ width: 48, height: 48, }} />
                        <Image source={{ uri: user.avatar }} style={{ width: 48, height: 48, }} />
                    </Row>
                    <Title align="center">Boa tarde, {'\n'}{user?.name}</Title>
                </Column>

                <ScrollView horizontal style={{ marginVertical: 24, }} contentContainerStyle={{ columnGap: 12, }} showsHorizontalScrollIndicator={false}>
                    <Column style={{ width: 12, }} />
                    <Button bg={color.pr} pv={12} ph={12} radius={12} onPress={() => {navigation.navigate('Notafiscal')}} >
                        <Column style={{}}>
                            <Column style={{ width: 46, height: 46, borderRadius: 100, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginBottom: 12, }}>
                                <MaterialCommunityIcons name="qrcode-scan" size={24} color={color.sc} />
                            </Column>
                            <Row style={{ marginTop: 10, }}>
                                <Title size={12} style={{ lineHeight: 12, marginRight: 8, }}>Enviar {'\n'}Nota Fiscal</Title>
                                <ArrowRight size={18} color={color.sc} />
                            </Row>
                        </Column>
                    </Button>
                    <Button bg={color.tr} pv={12} ph={12} radius={12} onPress={() => {navigation.navigate('DonateValue')}} >
                        <Column style={{}}>
                            <Column style={{ width: 46, height: 46, borderRadius: 100, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginBottom: 12, }}>
                                <HeartHandshake size={24} color={color.tr} />
                            </Column>
                            <Row style={{ marginTop: 10, }}>
                                <Title color="#fff" size={12} style={{ lineHeight: 12, marginRight: 8, }}>Fazer uma{'\n'}Doação</Title>
                                <ArrowRight size={18} color="#fff" />
                            </Row>
                        </Column>
                    </Button>
                    <Button bg={color.sc} pv={12} ph={12} radius={12} onPress={() => {navigation.navigate('History')}} >
                        <Column style={{}}>
                            <Column style={{ width: 46, height: 46, borderRadius: 100, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginBottom: 12, }}>
                                <History size={24} color={color.sc} />
                            </Column>
                            <Row style={{ marginTop: 10, }}>
                                <Title color="#fff" size={12} style={{ lineHeight: 12, marginRight: 8, }}>Consultar{'\n'}Histórico</Title>
                                <ArrowRight size={18} color="#fff" />
                            </Row>
                        </Column>
                    </Button>
                    <Column style={{ width: 12 }} />
                </ScrollView>

                <Column style={{ height: 1, backgroundColor: '#d1d1d1', }} />

                <Column style={{}} ph={margin.h} pv={20}>
                    <Title color={color.tr}>Ajude</Title>
                    <Row style={{ backgroundColor: color.tr + 20, marginTop: 12, borderTopLeftRadius: 12, borderTopRightRadius: 12, paddingVertical: 12, paddingHorizontal: 20, }}>
                        <Column style={{ width: '68%', }}>
                            <Title size={18} color={color.tr} style={{ lineHeight: 20, }}>Sua ajuda é importante!</Title>
                            <Label size={14} color='#2E5F57' style={{ lineHeight: 16, marginTop: 4, }}>Ajude o Instituto Caramelo com uma doação de qualquer valor, para podermos manter nossos trabalhos.</Label>
                        </Column>
                        <Image source={require('@imgs/ajude.png')} style={{ width: 85, height: 148, marginTop: -40, marginLeft: 12, }} />
                    </Row>
                    <Row style={{ backgroundColor: color.tr + 20, columnGap: 12, justifyContent: 'center', alignItems: 'center', }}>
                        <Column style={{ width: 34, height: 12, borderRadius: 100, backgroundColor: '#fff', }} />
                        <Column style={{ width: 34, height: 12, borderRadius: 100, backgroundColor: '#fff', }} />
                        <Column style={{ width: 34, height: 12, borderRadius: 100, backgroundColor: '#fff', }} />
                        <Column style={{ width: 34, height: 12, borderRadius: 100, backgroundColor: '#fff', }} />
                        <Column style={{ width: 34, height: 12, borderRadius: 100, backgroundColor: '#fff', }} />
                        <Column style={{ width: 34, height: 12, borderRadius: 100, backgroundColor: '#fff', }} />
                        <Column style={{ width: 34, height: 12, borderRadius: 100, backgroundColor: '#fff', }} />
                        <Column style={{ width: 34, height: 12, borderRadius: 100, backgroundColor: '#fff', }} />
                    </Row>
                    <Row style={{ backgroundColor: color.tr + 20, paddingVertical: 12, paddingHorizontal: 20, }}>
                        <Column style={{ width: 64, height: 64, backgroundColor: '#34BBBF40', borderRadius: 12, justifyContent: 'center', alignItems: 'center', }}>
                            <Image source={require('@imgs/doe1.png')} style={{ width: 46, height: 46, objectFit: 'contain', }} />
                        </Column>
                        <Column style={{ marginLeft: 12, width: '74%' }}>
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                                <Title size={16} color={color.tr} style={{ lineHeight: 20, }}>Kit Limpeza</Title>
                                <Title size={16} color={color.tr} style={{ lineHeight: 20, fontFamily: font.black, }}>R$ 25,00</Title>
                            </Row>
                            <Label size={12} color='#2E5F57' style={{ lineHeight: 14, width: 200, marginTop: 4, }}>Desinfetante a base de amônia quaternária para desinfecção das baias da internação.</Label>
                        </Column>
                    </Row>
                    <Row style={{ backgroundColor: color.tr + 20, columnGap: 12, justifyContent: 'center', alignItems: 'center', }}>
                        <Column style={{ width: 34, height: 12, borderRadius: 100, backgroundColor: '#fff', }} />
                        <Column style={{ width: 34, height: 12, borderRadius: 100, backgroundColor: '#fff', }} />
                        <Column style={{ width: 34, height: 12, borderRadius: 100, backgroundColor: '#fff', }} />
                        <Column style={{ width: 34, height: 12, borderRadius: 100, backgroundColor: '#fff', }} />
                        <Column style={{ width: 34, height: 12, borderRadius: 100, backgroundColor: '#fff', }} />
                        <Column style={{ width: 34, height: 12, borderRadius: 100, backgroundColor: '#fff', }} />
                        <Column style={{ width: 34, height: 12, borderRadius: 100, backgroundColor: '#fff', }} />
                        <Column style={{ width: 34, height: 12, borderRadius: 100, backgroundColor: '#fff', }} />
                    </Row>
                    <Row style={{ backgroundColor: color.tr + 20, paddingVertical: 12, paddingHorizontal: 20, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, paddingBottom: 30, }}>
                        <Column style={{ width: 64, height: 64, backgroundColor: '#34BBBF40', borderRadius: 12, justifyContent: 'center', alignItems: 'center', }}>
                            <Image source={require('@imgs/doe2.png')} style={{ width: 46, height: 46, objectFit: 'contain', }} />
                        </Column>
                        <Column style={{ marginLeft: 12, width: '74%' }}>
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                                <Title size={16} color={color.tr} style={{ lineHeight: 20, }}>Kit Preventivo{'\n'}de Doenças</Title>
                                <Title size={16} color={color.tr} style={{ lineHeight: 20, fontFamily: font.black, }}>R$ 40,00</Title>
                            </Row>
                            <Label size={12} color='#2E5F57' style={{ lineHeight: 14, width: 200, marginTop: 4, }}>Vacina para imunizar cães e gatos.</Label>
                        </Column>
                    </Row>
                    <Column style={{ marginTop: -24, alignSelf: 'center', }}>
                        <ButtonPrimary label="Fazer uma doação" type="tr" pv={12} ph={24} radius={12} mt={20} onPress={() => navigation.navigate('DonateValue')}/>
                    </Column>


                </Column>


                <Column style={{ height: 1, backgroundColor: '#d1d1d1', }} />
            </Scroll>
        </Column>
    )
}
