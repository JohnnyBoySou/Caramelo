import React, { useContext, useState } from 'react';
import { Main, Scroll, Column, Row, Button, useTheme, Title, Label, Image, HeadTitle, LabelBT } from '@theme/global';
import { StatusBar } from 'expo-status-bar';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Carrousel } from '../blog/index';
import { Header } from '@components/Header';

export default function AboutGalleryScreen({ navigation, route }) {
    const { color, font, margin } = useTheme();

    return (
        <Main style={{}}>
            <StatusBar style="dark" />
            <Scroll>
                <Column style={{ marginHorizontal: margin.h, marginVertical: 20, flex: 1, }}>
                    <Header title="Galeria" />
                </Column>
                <Carrousel imgs={['https://caramelo.engenhariadigital.net/app/banners_maior/1.jpg', 'https://caramelo.engenhariadigital.net/app/banners_maior/4.jpg', 'https://caramelo.engenhariadigital.net/app/banners_maior/3.jpg']} />
                <Image style={{ width: '120%', height: 150, zIndex: 99, marginLeft: -50, objectFit: 'contain', marginBottom: -50, marginTop: -50, }} source={require('@imgs/gallery_1.png')} />
                <Row style={{ marginHorizontal: margin.h, justifyContent: 'space-between', alignItems: 'center', }}>
                    <Label style={{ width: 190, }}>Nem todas as batalhas e cicatrizes são visíveis, e a verdade é que os animais resgatados pelo Instituto têm um longo caminho a percorrer até o tão esperado momento da adoção.</Label>
                    <Image source={{ uri: 'https://caramelo.engenhariadigital.net/app/banners/1.jpg' }} style={{ width: 124, height: 124, borderRadius: 12, zIndex: 99, backgroundColor: '#f1f1f1', objectFit: 'cover', }} />
                </Row>
                <Label align="center" style={{ marginHorizontal: margin.h, marginVertical: 30, }}>O Instituto Caramelo é auditado anualmente pelo Grupo AUDISA que presta serviços de auditoria e consultoria para o Terceiro Setor e atesta o comprometimento, dedicação e transparência pelo trabalho realizado pelo Instituto.</Label>
                <Column mh={margin.h} style={{ rowGap: 20, }}>
                    <Image source={{uri: 'https://caramelo.engenhariadigital.net/app/banners_maior/2.jpg'}} style={{ width: '100%', height: 154, borderRadius: 12, zIndex: 99, backgroundColor: '#f1f1f1', objectFit: 'cover', }} />
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', columnGap: 20, }}>
                        <Image source={{ uri: 'https://caramelo.engenhariadigital.net/app/banners/1.jpg' }} style={{ flexGrow: 1, height: 124, borderRadius: 12, zIndex: 99, backgroundColor: '#f1f1f1', objectFit: 'cover', }} />
                        <Image source={{ uri: 'https://caramelo.engenhariadigital.net/app/banners/2.jpg' }} style={{ flexGrow: 1, height: 124, borderRadius: 12, zIndex: 99, backgroundColor: '#f1f1f1', objectFit: 'cover', }} />
                    </Row>
                </Column>
                <Image style={{ width: '120%', height: 150, zIndex: 99, objectFit: 'contain', }} source={require('@imgs/gallery_2.png')} />
                <Column mh={margin.h} style={{ rowGap: 20, }}>
                    <Image source={{uri: 'https://caramelo.engenhariadigital.net/app/banners_maior/5.jpg'}} style={{ width: '100%', height: 154, borderRadius: 12, zIndex: 99, backgroundColor: '#f1f1f1', objectFit: 'cover', }} />
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', columnGap: 20, }}>
                        <Image source={{ uri: 'https://caramelo.engenhariadigital.net/app/banners/3.jpg' }} style={{ flexGrow: 1, height: 124, borderRadius: 12, zIndex: 99, backgroundColor: '#f1f1f1', objectFit: 'cover', }} />
                        <Image source={{ uri: 'https://caramelo.engenhariadigital.net/app/banners/5.jpg' }} style={{ flexGrow: 1, height: 124, borderRadius: 12, zIndex: 99, backgroundColor: '#f1f1f1', objectFit: 'cover', }} />
                    </Row>
                </Column>

                <Image style={{ flexGrow: 1, marginTop: 32, alignSelf: 'center', height: 150, zIndex: 99, objectFit: 'contain', }} source={require('@imgs/gallery_4.png')} />
                <Column style={{ height: 60, }} />

            </Scroll>
        </Main>
    )
}
