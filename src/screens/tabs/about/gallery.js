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
                <Carrousel imgs={['https://i.pinimg.com/564x/44/f5/3e/44f53e5f7a6f35bb0f4c86852e9980a9.jpg', 'https://i.pinimg.com/564x/df/01/ab/df01ab9bf54775d08bb7648200b8020b.jpg', 'https://i.pinimg.com/564x/53/e9/c7/53e9c76542fe6accf94a22d1ff1cbc24.jpg']} />

                <Image style={{ width: '120%', height: 150, zIndex: 99, marginLeft: -50, objectFit: 'contain', marginBottom: -50, }} source={require('@imgs/gallery_1.png')} />

                <Row style={{ marginHorizontal: margin.h, justifyContent: 'space-between', alignItems: 'center', }}>
                    <Label style={{ width: 190, }}>É um facto estabelecido de que um leitor é distraído pelo conteúdo legível de uma página quando analisa a sua mancha gráfica.</Label>
                    <Image style={{ width: 124, height: 124, borderRadius: 12, zIndex: 99, backgroundColor: '#f1f1f1', objectFit: 'contain', }} />
                </Row>
                <Label align="center" style={{ marginHorizontal: margin.h, marginVertical: 30, }}>É um facto estabelecido de que um leitor é distraído pelo conteúdo legível de uma página quando analisa a sua mancha gráfica.</Label>


                <Column mh={margin.h} style={{ rowGap: 20, }}>
                    <Image style={{ width: '100%', height: 124, borderRadius: 12, zIndex: 99, backgroundColor: '#f1f1f1', objectFit: 'contain', }} />
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center',columnGap: 20,}}>
                        <Image style={{ flexGrow: 1, height: 124, borderRadius: 12, zIndex: 99, backgroundColor: '#f1f1f1', objectFit: 'contain', }} />
                        <Image style={{ flexGrow: 1, height: 124, borderRadius: 12, zIndex: 99, backgroundColor: '#f1f1f1', objectFit: 'contain', }} />
                    </Row>
                </Column>
                <Image style={{ width: '120%', height: 150, zIndex: 99, objectFit: 'contain',  }} source={require('@imgs/gallery_2.png')} />
                <Row mh={margin.h} style={{ columnGap: 20, }}>
                    <Image style={{ flexGrow: 1, height: 312, borderRadius: 12, zIndex: 99, backgroundColor: '#f1f1f1', objectFit: 'contain', }} />
                    <Column style={{ justifyContent: 'space-between', alignItems: 'center', rowGap: 20,}}>
                        <Image style={{ width: 144, height: 144, borderRadius: 12, zIndex: 99, backgroundColor: '#f1f1f1', objectFit: 'contain', }} />
                        <Image style={{ width: 144, height: 144, borderRadius: 12, zIndex: 99, backgroundColor: '#f1f1f1', objectFit: 'contain', }} />
                    </Column>
                </Row>

                <Image style={{ flexGrow: 1, marginTop: 32, alignSelf: 'center', height: 150, zIndex: 99, objectFit: 'contain',  }} source={require('@imgs/gallery_4.png')} />
                <Column style={{ height: 60, }} />
               

            </Scroll>
        </Main>
    )
}
