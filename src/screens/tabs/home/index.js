import React, { useContext, useState, useEffect } from 'react';
import { Dimensions, } from 'react-native';
import { Main, Scroll, Column, Row, Title, Image, Button, Label, ButtonPrimary, LabelBT } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';
import { ArrowRight, HeartHandshake, History } from 'lucide-react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';
import { Carrousel } from '../blog';
import { Heart, MessageCircle, Search, Send } from 'lucide-react-native';
import { ListPosts } from '../blog';
import { MotiImage } from 'moti';
import { listUser } from '@api/request/user';


export default function HomeScreen({ navigation, }) {
    const { color, font, margin, } = useContext(ThemeContext);
    const isFocused = useIsFocused();

    const [user, setuser] = useState();
    const [loading, setloading] = useState();

    useEffect(() => {
        fetchData()
    }, [isFocused])

    const fetchData = async () => {
        setloading(true)
        try {
            const res = await listUser()
            setuser(res);
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }

    const [destaque, setdestaque] = useState({
        imgs: ['https://i.pinimg.com/564x/a4/fd/b2/a4fdb25d1b4b63415423ec8440f7c884.jpg', 'https://i.pinimg.com/564x/40/e1/d2/40e1d24a3bfd76fb441c2335229503c3.jpg', 'https://i.pinimg.com/564x/9c/cd/ea/9ccdea1580bd0add9bafa75bc920e90c.jpg'],
        title: 'Mais de 550 animais resgatados!',
        desc: 'Atingimos um novo marco em nosso instituto, alcançamos 550 animais em nosso canil!',
        likes: 32,
        comments: 12,
        id: 1,
    });
    const [recentes, setrecentes] = useState([
        {
            id: 1,
            title: 'Mais de 550 animais resgatados!',
            categories: ['Resgate', 'Adoção'],
            date: 'há 2 dias',
            img: 'https://i.pinimg.com/564x/00/e8/de/00e8de172206673e7f1d53917ee78835.jpg'
        },
        {
            id: 2,
            title: 'Mais de 550 animais resgatados!',
            categories: ['Resgate', 'Adoção'],
            date: 'há 3 dias',
            img: 'https://i.pinimg.com/564x/79/d1/0a/79d10aa540504de8bb11fb0e12c56295.jpg'
        },
        {
            id: 3,
            title: 'Mais de 550 animais resgatados!',
            categories: ['Resgate', 'Adoção'],
            date: 'há 1 semana',
            img: 'https://i.pinimg.com/564x/9c/32/7e/9c327ea4d95b89d230c10fc1588a88cb.jpg'
        }]);

    return (
        <Column style={{ flex: 1, backgroundColor: '#fff', }}>
            {isFocused && <StatusBar style='dark' backgroundColor={color.pr} />}
            <Scroll>
                <Column style={{ paddingTop: 50, paddingHorizontal: margin.h, paddingBottom: 20, backgroundColor: color.pr, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Image source={require('@imgs/logo_home.png')} style={{ width: 48, height: 48, }} />
                        <MotiImage from={{ opacity: 0, scale: 0, }} animate={{ opacity: 1, scale: 1, }} delay={400} source={{ uri: user?.avatar ? user?.avatar : 'https://avatar.iran.liara.run/public/24' }} style={{ width: 48, height: 48, borderRadius: 100,}} />
                    </Row>
                    <Title align="center">Boa tarde, {'\n'}{user?.name}</Title>
                </Column>

                <ScrollView horizontal style={{ marginVertical: 24, }} contentContainerStyle={{ columnGap: 12, }} showsHorizontalScrollIndicator={false}>
                    <Column style={{ width: 12, }} />
                    <Button bg={color.pr} pv={12} ph={12} radius={12} onPress={() => { navigation.navigate('Notafiscal') }} >
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
                    <Button bg={color.tr} pv={12} ph={12} radius={12} onPress={() => { navigation.navigate('DonateValue') }} >
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
                    <Button bg={color.sc} pv={12} ph={12} radius={12} onPress={() => { navigation.navigate('History') }} >
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

                <Button pv={1} ph={1} radius={2} onPress={() => { navigation.navigate('BlogSingle', { id: destaque?.id }) }} >

                    <>
                        <Column style={{ backgroundColor: color.pr, paddingVertical: 3, paddingHorizontal: 12, position: 'absolute', top: 30, right: 40, zIndex: 99, borderRadius: 12, }}>
                            <Title style={{ letterSpacing: -.7, fontSize: 12, }}>EM DESTAQUE</Title>
                        </Column>
                        <MotiImage source={{ uri: destaque?.imgs[0] }} style={{ flexGrow: 1, marginHorizontal: 24, height: 300, borderRadius: 12, marginVertical: 12, }} />
                        <Column style={{ marginHorizontal: margin.h, }}>
                            <Title size={20} style={{ letterSpacing: -.7, }}>{destaque?.title}</Title>
                            <Row style={{ columnGap: 12, marginVertical: 12, }}>
                                <Button bg="#F2EDED">
                                    <Row style={{ justifyContent: 'center', alignItems: 'center', columnGap: 6, }}>
                                        <Heart size={16} color={color.sc} />
                                        <Label size={12} style={{ lineHeight: 14, }}>{destaque?.likes} curtidas </Label>
                                    </Row>
                                </Button>
                                <Button bg="#F2EDED">
                                    <Row style={{ justifyContent: 'center', alignItems: 'center', columnGap: 6, }}>
                                        <MessageCircle size={16} color={color.sc} />
                                        <Label size={12} style={{ lineHeight: 14, }}>{destaque?.comments} comentários </Label>
                                    </Row>
                                </Button>
                                <Button bg="#F2EDED">
                                    <Row style={{ justifyContent: 'center', alignItems: 'center', columnGap: 6, }}>
                                        <Send size={16} color={color.sc} />
                                        <Label size={12} style={{ lineHeight: 14, }}>Enviar</Label>
                                    </Row>
                                </Button>
                            </Row>
                        </Column>
                        <Button bg={color.pr} style={{ alignSelf: 'flex-end', width: 48, height: 48, justifyContent: 'center', alignItems: 'center', marginRight: 24, }}>
                            <ArrowRight size={24} color={color.sc} />
                        </Button>
                    </>

                </Button>

                <Column style={{ height: 1, backgroundColor: '#d1d1d1', marginVertical: 12, }} />

                <Column ph={margin.h} pv={20}>
                    <Title color={color.tr}>Ajude</Title>
                    <Row style={{ backgroundColor: color.tr + 20, marginTop: 12, borderTopLeftRadius: 12, borderTopRightRadius: 12, paddingVertical: 12, paddingHorizontal: 20, }}>
                        <Column style={{ width: '68%', }}>
                            <Title size={16} color={color.tr} style={{ lineHeight: 20, }}>Sua ajuda é importante!</Title>
                            <Label size={13} color='#2E5F57' style={{ lineHeight: 16, marginTop: 4, }}>Ajude o Instituto Caramelo com uma doação de qualquer valor, para podermos manter nossos trabalhos.</Label>
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
                        <Button bg={color.tr} radius={12} ph={16} onPress={() => navigation.navigate('DonateValue')}>
                            <LabelBT color="#fff" size={14}>Fazer uma doação</LabelBT>
                        </Button>
                    </Column>


                </Column>

                <Column style={{ height: 1, backgroundColor: '#d1d1d1', marginVertical: 12, }} />

                <Column style={{ marginHorizontal: margin.h, marginVertical: margin.v, }}>
                    <Title style={{ letterSpacing: -.7, }}>Recentes</Title>
                    <ListPosts data={recentes} navigation={navigation} />
                    <Column style={{ height: 20, }} />
                    <ButtonPrimary label="Ver mais" type="sc" onPress={() => { navigation.navigate('Blog') }} />
                </Column>

                <Column style={{ height: 20, }} />

                <Column style={{ height: 1, backgroundColor: '#d1d1d1', }} />
                <Column style={{ height: 120, }} />
            </Scroll>
        </Column>
    )
}
