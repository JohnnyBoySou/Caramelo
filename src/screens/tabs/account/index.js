import React, { useContext, useEffect, useState } from 'react';
import { Main, Scroll, Title, Row, Column, HeadTitle, Label, Image, Button, Loader, ButtonPrimary } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import { AtSign, HandHeart, HeartHandshake, MessageCircleHeart, Newspaper, Pencil } from 'lucide-react-native';
import { listUser } from '@api/request/user';
import { Pressable, ScrollView, RefreshControl } from 'react-native';

//import { useIsFocused } from '@react-navigation/native';

export default function AccountScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [loading, setloading] = useState();
    const [user, setuser] = useState();

    //const isFocused = useIsFocused();
    useEffect(() => {
        fetchData()
    }, [])

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


    const avatarImg = user?.avatar ? { uri: user?.avatar } : require('@imgs/user.png')
    if (loading) {
        return (
            <Main style={{ justifyContent: 'center', alignItems: 'center',  }}>
                <Loader size={62} />
            </Main>
        )
    }

    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <StatusBar style="dark" backgroundColor="#fff" animated />
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={fetchData} />
                }>
                <Column style={{ marginHorizontal: margin.h, marginVertical: 20, }}>
                    <Image source={require('@imgs/account.png')} style={{ width: '100%', objectFit: 'contain', position: 'absolute', top: 40, }} />
                    <Column style={{ justifyContent: 'center', alignItems: 'center', width: 160, alignSelf: 'center', }}>
                        <Image source={avatarImg} style={{ width: 154, height: 154, borderRadius: 100, }} />
                        <Button bg={color.sc} onPress={() => { navigation.navigate('AccountEdit') }} style={{ marginTop: -30, width: 48, alignSelf: 'flex-end', height: 48, borderWidth: 4, borderColor: '#fff', borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                            <Pencil size={20} color="#fff" />
                        </Button>
                    </Column>
                    <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <Title size={32} align="center">{user?.name}</Title>
                        <Row style={{ backgroundColor: '#F1F1F1', borderRadius: 8, marginTop: 12, marginBottom: 12, justifyContent: 'center', alignItems: 'center', paddingVertical: 4, paddingHorizontal: 4, }}>
                            <Column style={{ width: 36, height: 36, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginRight: 12, borderRadius: 8, }}>
                                <AtSign color={color.title} size={18} />
                            </Column>
                            <Label style={{ marginRight: 12, }}>{user?.email}</Label>
                        </Row>
                    </Column>

                    <Column style={{ rowGap: 24, marginTop: 12, }}>
                        <Row style={{ columnGap: 24, }}>
                            <Pressable onPress={() => { navigation.navigate('History') }} style={{ borderWidth: 1, borderColor: '#DEDEDE', borderRadius: 24, flexGrow: 1, paddingVertical: 26, paddingHorizontal: 14, }}>
                                <Newspaper size={32} color={color.tr} />
                                <Title color={color.tr} size={17} style={{ fontFamily: font.medium, marginVertical: 6, }}>Notas doadas</Title>
                                <HeadTitle color={color.tr} size={42}>{user?.notas}</HeadTitle>
                            </Pressable>
                            <Pressable onPress={() => { navigation.navigate('History') }} style={{ borderWidth: 1, borderColor: '#DEDEDE', borderRadius: 24, flexGrow: 1, paddingVertical: 26, paddingHorizontal: 14, }}>
                                <HeartHandshake size={32} color="#3072C8" />
                                <Title color="#3072C8" size={18} style={{ fontFamily: font.medium, marginVertical: 6, }}>Doações feitas</Title>
                                <HeadTitle color="#3072C8" size={42}>{user?.doacoes}</HeadTitle>
                            </Pressable>
                        </Row>
                        <Row style={{ columnGap: 24, }}>
                            <Column style={{ borderWidth: 1, borderColor: '#DEDEDE', borderRadius: 24, flexGrow: 1, paddingVertical: 26, paddingHorizontal: 14, }}>
                                <MessageCircleHeart size={32} color={color.pr} />
                                <Title color={color.pr} size={18} style={{ fontFamily: font.medium, marginVertical: 6, }}>Comentários</Title>
                                <HeadTitle color={color.pr} size={42}>{user?.comments}</HeadTitle>
                            </Column>
                            <Column style={{ borderWidth: 1, borderColor: '#DEDEDE', borderRadius: 24, flexGrow: 1, paddingVertical: 26, paddingHorizontal: 14, }}>
                                <HandHeart size={32} color={color.qt} />
                                <Title color={color.qt} size={18} style={{ fontFamily: font.medium, marginVertical: 6, }}>Posts curtidos</Title>
                                <HeadTitle color={color.qt} size={42}>{user?.likes}</HeadTitle>
                            </Column>
                        </Row>
                    </Column>
                    <Column style={{ height: 18, }} />
                    <Button style={{ borderWidth: 2, borderColor: color.sc + 60, }} radius={12} onPress={() => { navigation.navigate('Privacidade') }} >
                        <Label style={{ textAlign: 'center' }}>Acessar política de privacidade e termos de uso</Label>
                    </Button>
                    <Column style={{ height: 180, }} />
                </Column>
            </ScrollView>
        </Main>
    )
}
