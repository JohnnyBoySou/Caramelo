import React, { useContext, useState, useEffect } from 'react';
import { Linking, Pressable } from 'react-native';
import { Main, Scroll, Column, Row, Title, Image, Button, Label, ButtonPrimary, LabelBT, HeadTitle } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';
import { ArrowRight, ArrowUpRight, HeartHandshake, History } from 'lucide-react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';
import { ListPosts } from '../blog';
import { MotiImage } from 'moti';
import { listUser } from '@api/request/user';
import { listPosts } from '@api/request/blog';
import { FontAwesome6 } from '@expo/vector-icons';
import { Skeleton } from 'moti/skeleton';

export default function HomeScreen({ navigation, }) {
    const { color, font, margin, } = useContext(ThemeContext);
    const isFocused = useIsFocused();

    const [user, setuser] = useState();
    const [data, setdata] = useState();
    const [destaque, setdestaque] = useState();
    const [loading, setloading] = useState();

    useEffect(() => {
        fetchData()
    }, [isFocused])

    const fetchData = async () => {
        setloading(true)
        try {
            const res = await listUser()
            setuser(res);
            const posts = await listPosts()
            setdata(posts.data.slice(0, 4))
            setdestaque(posts.data[4])
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }

    const handleOpen = (item) => {
        if (item) {
            navigation.navigate('BlogSingle', { item: item })
        } else { return }
    }

    const handleLink = (link) => {
        Linking.openURL(link);
    }
    const a = false;
    return (
        <Column style={{ flex: 1, backgroundColor: '#fff', }}>
            {isFocused && <StatusBar style='dark' backgroundColor={color.pr} />}
            <Scroll>
                <Column style={{ paddingTop: 50, paddingHorizontal: margin.h, paddingBottom: 20, backgroundColor: color.pr, borderRadius: 24, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Image source={require('@imgs/logo_home.png')} style={{ width: 48, height: 48, }} />
                        <Pressable onPress={() => { navigation.navigate('Tabs', { screen: 'Account' }) }} >
                            <MotiImage from={{ opacity: 0, scale: 0, }} animate={{ opacity: 1, scale: 1, }} delay={400} source={{ uri: user?.avatar ? user?.avatar : 'https://avatar.iran.liara.run/public/24' }} style={{ width: 48, height: 48, borderRadius: 100, }} />
                        </Pressable>
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
                    {a && <Button bg={color.tr} pv={12} ph={12} radius={12} onPress={() => { navigation.navigate('DonateValue') }} >
                        <Column style={{}}>
                            <Column style={{ width: 46, height: 46, borderRadius: 100, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginBottom: 12, }}>
                                <HeartHandshake size={24} color={color.tr} />
                            </Column>
                            <Row style={{ marginTop: 10, }}>
                                <Title color="#fff" size={12} style={{ lineHeight: 12, marginRight: 8, }}>Fazer uma{'\n'}Doação</Title>
                                <ArrowRight size={18} color="#fff" />
                            </Row>
                        </Column>
                    </Button>}
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

                <Button pv={1} ph={1} mleft={20} mright={20} radius={12} onPress={() => { handleOpen(destaque) }} style={{ borderWidth: 1, borderColor: '#F1F1F1', marginBottom: 10, }}>
                    <>
                        <Column style={{ backgroundColor: color.pr, paddingVertical: 3, paddingHorizontal: 12, position: 'absolute', top: 30, right: 40, zIndex: 99, borderRadius: 12, }}>
                            <Title style={{ letterSpacing: -.7, fontSize: 12, }}>EM DESTAQUE</Title>
                        </Column>
                        <MotiImage source={{ uri: destaque?.media_type == 'VIDEO' ? destaque.thumbnail_url : destaque?.media_url }} style={{ flexGrow: 1, backgroundColor: '#D7D7D7', height: 300, borderRadius: 12, }} />
                        <Row style={{ marginHorizontal: 12, justifyContent: 'space-between', alignItems: 'center', }}>

                            {destaque?.caption ?
                                <Title size={18} style={{ letterSpacing: -.7, width: '80%', marginTop: 10, marginBottom: 10, }}>{destaque?.caption?.length > 45 ? destaque?.caption?.slice(0, 45) + '...' : destaque?.caption}</Title>
                                : <Column style={{ marginTop: 10, marginLeft: -10, }}><Skeleton width={250} height={46} radius={12} colorMode="light" /></Column>}

                            <Button bg={color.pr} style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center', }}>
                                <ArrowUpRight size={24} color={color.sc} />
                            </Button>
                        </Row>
                    </>

                </Button>

                {a &&
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
                }

                <Column style={{ marginHorizontal: margin.h, marginVertical: margin.v, }}>
                    <Title style={{ letterSpacing: -.7, }}>Recentes </Title>
                    <ListPosts data={data} navigation={navigation} />
                    <Column style={{ height: 20, }} />
                    {data?.length > 0 && <ButtonPrimary label="Ver mais" type="sc" onPress={() => { navigation.navigate('Blog') }} />}
                </Column>

                <Column mh={margin.h} >
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 20, }}>
                        <Column style={{ width: 200, }}>
                            <HeadTitle>Nossas redes</HeadTitle>
                            <Label>Nós acompanhe nas redes sociais agora mesmo!</Label>
                            <Row style={{ columnGap: 12, marginVertical: 12, }}>
                                <Button onPress={() => { handleLink('https://www.instagram.com/instituto.caramelo/') }} bg="#f1f1f1" radius={12} style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center', }}>
                                    <FontAwesome6 name="instagram" size={22} color={color.sc} />
                                </Button>
                                <Button onPress={() => { handleLink('https://www.facebook.com/InstitutoCaramelo/') }} bg="#f1f1f1" radius={12} style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center', }}>
                                    <FontAwesome6 name="facebook" size={20} color={color.sc} />
                                </Button>
                                <Button onPress={() => { handleLink('https://www.tiktok.com/@institutocaramelo') }} bg="#f1f1f1" radius={12} style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center', }}>
                                    <FontAwesome6 name="tiktok" size={22} color={color.sc} />
                                </Button>
                            </Row>
                        </Column>
                        <Image source={require('@imgs/about4.png')} />
                    </Row>
                </Column>
                <Column style={{ height: 20, }} />

                {a && <Column mv={20}>
                    <HeadTitle style={{ lineHeight: 28, marginHorizontal: margin.h, }}>Como posso ajudar?</HeadTitle>
                    <Scroll horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: margin.h, }} contentContainerStyle={{ columnGap: 12, paddingRight: 50, paddingTop: 12, }}>
                        <Button onPress={() => { navigation.navigate('DonateValue') }} bg={color.tr + 20} radius={12} style={{ justifyContent: 'center', alignItems: 'center', width: 220, borderWidth: 1, borderColor: color.tr + 60, }}>
                            <Column ph={6}>
                                <Column style={{ width: 76, height: 76, borderRadius: 100, backgroundColor: color.tr, justifyContent: 'center', alignItems: 'center', marginBottom: 12, }}>
                                    <HeartHandshake size={34} color='#fff' />
                                </Column>
                                <Title color={color.tr} style={{ lineHeight: 24, fontSize: 22, }}>Fazer uma doação</Title>
                                <Label color='#2E5F57' style={{ fontSize: 16, lineHeight: 18, marginTop: 8, }}>Toda contribuição, seja ela grande ou pequena, nos ajuda a continuar salvando vidas e proporcionando lares amorosos para nossos animais resgatados.</Label>
                            </Column>
                        </Button>
                        <Button onPress={() => { navigation.navigate('Notafiscal') }} bg={color.sc + 20} radius={12} style={{ justifyContent: 'center', alignItems: 'center', width: 220, borderWidth: 1, borderColor: color.sc + 60, }}>
                            <Column pv={12} ph={6}>
                                <Column style={{ width: 76, height: 76, borderRadius: 100, backgroundColor: color.sc, justifyContent: 'center', alignItems: 'center', marginBottom: 12, }}>
                                    <MaterialCommunityIcons name="qrcode-scan" size={34} color='#fff' />
                                </Column>
                                <Title style={{ lineHeight: 24, fontSize: 22, }}>Enviar nota fiscal</Title>
                                <Label style={{ fontSize: 16, lineHeight: 18, marginTop: 8, }}>Sempre que você fizer uma compra, basta cadastrar ou enviar a nota fiscal para nós. Não custa nada para você, mas ajuda muito para continuarmos com nossas atividades.</Label>
                            </Column>
                        </Button>
                    </Scroll>
                </Column>
                }
                <Column style={{ height: 120, }} />
            </Scroll>
        </Column>
    )
}
