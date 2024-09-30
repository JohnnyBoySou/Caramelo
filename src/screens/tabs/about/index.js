import React, { useContext, useState } from 'react';
import { Main, Scroll, Column, Row, Button, useTheme, Title, Label, Image, HeadTitle, LabelBT, ButtonPrimary } from '@theme/global';
import { StatusBar } from 'expo-status-bar';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Linking } from 'react-native';

export default function AboutScreen({ navigation, route }) {
    const { color, font, margin } = useTheme();

    const resgates = ['135 ANIMAIS', '1700 ANIMAIS', 'RINHA DE PITBULLS', 'cracolândia', 'mula queimada', 'pantanal', 'gepeto', 'canil rio g. do sul', 'mulher da casa abandonada',]
    
    
    const handleOpen = (link) => {
        Linking.openURL(link);
    }
    return (
        <Main style={{}}>
            <StatusBar style="dark" />
            <Scroll>
                <Column style={{ marginHorizontal: margin.h, marginVertical: 20, flex: 1, }}>
                    <Image source={require('@imgs/logo_h.png')} style={{ width: 200, height: 52, borderRadius: 50, alignSelf: 'center', marginBottom: 12, }} />
                    <HeadTitle>Sobre nós</HeadTitle>
                    <Label size={14} style={{ fontFamily: font.light, lineHeight: 18, marginBottom: 12, }}>Fundado em fevereiro de 2015, a partir da união de um grupo de pessoas em prol do propósito de cuidar bem e adotar bem cada animal, o Instituto Caramelo atua principalmente no resgate de animais feridos ou em situação de risco, recuperação e adoção. </Label>
                    <Row>
                        <Label style={{ width: 200, fontSize: 14, fontFamily: font.light, lineHeight: 18, }}>Mantemos um abrigo com cerca de 300 animais, entre cães e gatos, todos resgatados das ruas, onde eles são protegidos, tratados, alimentados e aguardam pela chance de serem adotados.</Label>
                        <Image style={{ width: 128, height: 128, objectFit: 'contain' }} source={require('@imgs/about1.png')} />
                    </Row>
                    <Row mv={24} style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Column style={{ alignItems: 'flex-start', }}>
                            <HeadTitle>Galeria</HeadTitle>
                            <Label size={14} style={{ fontFamily: font.light, lineHeight: 18, marginBottom: 12, width: 200, }}>Veja mais imagens da nossa galeria.</Label>
                            <Button bg={color.sc} radius={12} ph={18} onPress={() => {navigation.navigate('AboutGallery')}} >
                                <LabelBT color='#fff'>Abrir galeria</LabelBT>
                            </Button>
                        </Column>
                        <Column style={{ rowGap: 8, }}>
                            <Row style={{ columnGap: 8, }}>
                                <Image style={{ width: 54, height: 54, objectFit: 'contain', backgroundColor: '#f1f1f1', borderRadius: 8, }} />
                                <Image style={{ width: 54, height: 54, objectFit: 'contain', backgroundColor: '#f1f1f1', borderRadius: 8, }} />
                            </Row>
                            <Row style={{ columnGap: 8, }}>
                                <Image style={{ width: 54, height: 54, objectFit: 'contain', backgroundColor: '#f1f1f1', borderRadius: 8, }} />
                                <Image style={{ width: 54, height: 54, objectFit: 'contain', backgroundColor: '#f1f1f1', borderRadius: 8, }} />
                            </Row>
                        </Column>
                    </Row>

                    <HeadTitle>Onde estamos</HeadTitle>
                    <Label style={{ fontFamily: font.light, lineHeight: 18, marginBottom: 12, fontSize: 14, }}>O Instituto Caramelo fica em Ribeirão Pires, na região metropolitana, em um terreno de 27.000 metros quadrados. Há centro cirúrgico com atendimento veterinário 24 horas, núcleo de fisioterapia, adestramento para tratamento psicológico, 5 áreas de soltura, 35 canis, 4 gatis e uma equipe de mais de 40 profissionais que se doam por completo para que o abrigo seja apenas uma fase de passagem na vida dos bichos.{'\n'}{'\n'}São necessários cerca de 300 mil reais por mês para sustentá-lo e são as doações, parcerias e vendas na loja que tornam esse sonho possível.</Label>

                </Column>

                <Image style={{ width: '120%', height: 150, zIndex: 99, marginLeft: -50, objectFit: 'contain', marginBottom: -50, }} source={require('@imgs/about2.png')} />
                <Column ph={margin.h} bg={color.pr} pv={20} style={{ borderTopLeftRadius: 12, paddingBottom: 120, }}>
                    <HeadTitle>Resgates marcantes</HeadTitle>
                    <Label style={{ fontSize: 14, fontFamily: font.light, lineHeight: 18, }}>O Instituto Caramelo levou o nome de Instituto Luisa Mell de fevereiro 2015 até abril 2022. Abaixo os resgates mais emblemáticos da nossa história!</Label>
                    <Row style={{ flexWrap: 'wrap', columnGap: 12, rowGap: 12, marginVertical: 20, }}>
                        {resgates.map((item, index) => (
                            <Button bg="#fff" radius={14} pv={4}>
                                <LabelBT style={{ textTransform: 'uppercase', }}>{item}</LabelBT>
                            </Button>
                        ))}
                    </Row>
                </Column>
                <Image style={{ width: '120%', height: 150, zIndex: 99, marginLeft: -50, objectFit: 'contain', marginTop: -150, }} source={require('@imgs/about3.png')} />
                <Column mh={margin.h} mv={20}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Column style={{ width: 200, }}>
                            <HeadTitle>Nossas redes</HeadTitle>
                            <Label>Nós acompanhe nas redes sociais agora mesmo!</Label>
                            <Row style={{ columnGap: 12, marginVertical: 12, }}>
                                <Button onPress={() => handleOpen('https://www.instagram.com/instituto.caramelo/')} bg="#f1f1f1" radius={12} style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center', }}>
                                    <FontAwesome6 name="instagram" size={22} color={color.sc} />
                                </Button>
                                <Button onPress={() => handleOpen('https://www.facebook.com/InstitutoCaramelo/')}  bg="#f1f1f1" radius={12} style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center', }}>
                                    <FontAwesome6 name="facebook" size={22} color={color.sc} />
                                </Button>
                                <Button onPress={() => handleOpen('https://www.tiktok.com/@institutocaramelo')} bg="#f1f1f1" radius={12} style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center', }}>
                                    <FontAwesome6 name="tiktok" size={22} color={color.sc} />
                                </Button>
                            </Row>
                        </Column>
                        <Image source={require('@imgs/about4.png')} />
                    </Row>
                </Column>
                <Column style={{ height: 120, }} />
            </Scroll>
        </Main>
    )
}
