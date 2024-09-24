import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, HeadTitle, ButtonPrimary, U, Loader } from '@theme/global';
import { Header } from '@components/Header';
import { Check,  TriangleAlert } from 'lucide-react-native';
import { MotiView } from 'moti';
import { singleExtract } from '@api/request/history';

export default function HistorySingleScreen({ navigation, route }) {
    const { color, font, margin } = useTheme();
    const type = route.params ? route.params.type : 'Doação';
    const id = route.params ? route.params.id : 1;
    const [item, setItem] = useState(null);

    const [loading, setloading] = useState(true);
    const fetchData = async () => {
        setloading(true)
        try {
            const res = await singleExtract(id, type);
            setItem(res);
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])


    return (
        <Scroll style={{ backgroundColor: '#fff', }}>
            <Column mh={margin.h} mv={24}>
                <Header title="Detalhes" />
                <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                    {loading ? <Column style={{ justifyContent: 'center', alignItems: 'center', height: 500, }}><Loader size={32} color={color.sc} /></Column> : <>{type === 'Doação' ? <Doacao item={item} navigation={navigation} /> : <Nota item={item} navigation={navigation} />}</>}
                </Column>
            </Column>
        </Scroll>
    )
}

const Nota = ({ item, navigation }) => {
    const value = item?.value;
    const date = item?.date;
    return (
        <Column style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 12, }}>
            <MotiView from={{ opacity: 0, scale: 0, }} animate={{ opacity: 1, scale: 1, }} style={{ backgroundColor: '#C0EFD4', width: 124, height: 124, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                <Column style={{ backgroundColor: '#2ECA6F', width: 72, height: 72, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                    <Check size={32} color='#fff' />
                </Column>
            </MotiView>
            <Title color="#2ECA6F" style={{ marginTop: 12, marginBottom: 4, }}>{value} Nota{value > 1 ? 's' : ''} fisca{value > 1 ? 'is' : 'l'} doada</Title>
            <Label>{date}</Label>

            <HeadTitle style={{ font: 'Font_Black', letterSpacing: -1, lineHeight: 32, fontSize: 32, textAlign: 'center', marginTop: 30, marginBottom: 20, }}>Agradecemos muito por usa ajuda!</HeadTitle>
            <Label align='center' size={18}>Você está contribuindo para projetos como esse: </Label>

            <Column style={{ height: 20, }}>

            </Column>
            <ButtonPrimary ph={50} onPress={() => { navigation.navigate('Tabs', { screen: 'Blog' }) }} label='Ver mais' type='sc' />
        </Column>
    )
}

const Doacao = ({ item, }) => {
    const { status, value, date, label, forma, tipo } = item;
    const cl = status == 'Confirmado' ? '#2ECA6F' : status == 'Análise' ? '#3072C8' : color.sc
    const icon = status == 'Confirmado' ? <Check size={32} color='#fff' /> : status == 'Análise' ? <Loader size={32} color='#fff' /> : <TriangleAlert size={32} color='#fff' />

    return (
        <Column style={{ justifyContent: 'center', marginTop: 12, marginBottom: 20, }}>
            <MotiView from={{ opacity: 0, scale: 0, }} animate={{ opacity: 1, scale: 1, }} style={{ backgroundColor: cl + 30, width: 124, height: 124, alignSelf: 'center', borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                <Column style={{ backgroundColor: cl, width: 72, height: 72, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                    {icon}
                </Column>
            </MotiView>
            <Title color={cl} style={{ marginTop: 12, marginBottom: 12, textAlign: 'center', }}>{label}</Title>
            <HeadTitle style={{ font: 'Font_Black', letterSpacing: -1, lineHeight: 32, fontSize: 32, textAlign: 'center', marginBottom: 20, }}><U>R$ {value},00</U></HeadTitle>

            <Column style={{ backgroundColor: '#f1f1f1', paddingVertical: 24, paddingHorizontal: 20, borderRadius: 12, rowGap: 16, marginBottom: 20, }}>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                    <Label size={16} style={{ fontFamily: 'Font_SemiBold' }}>Data e hora:</Label>
                    <Label size={16} style={{ fontFamily: 'Font_Light' }}>{date}</Label>
                </Row>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                    <Label size={16} style={{ fontFamily: 'Font_SemiBold' }}>Forma de pagamento:</Label>
                    <Label size={16} style={{ fontFamily: 'Font_Light' }}>{forma}</Label>
                </Row>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                    <Label size={16} style={{ fontFamily: 'Font_SemiBold' }}>Pagamento:</Label>
                    <Label size={16} style={{ fontFamily: 'Font_Light' }}>{tipo}</Label>
                </Row>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                    <Label size={16} style={{ fontFamily: 'Font_SemiBold' }}>Beneficiário:</Label>
                    <Label size={16} style={{ fontFamily: 'Font_Light' }}>Instituto Caramelo</Label>
                </Row>
                <Row style={{ marginHorizontal: -20, columnGap: 10, marginBottom: -42, alignSelf: 'center', }}>
                    <Column style={{ width: 32, height: 32, backgroundColor: '#fff', borderRadius: 100, }}></Column>
                    <Column style={{ width: 32, height: 32, backgroundColor: '#fff', borderRadius: 100, }}></Column>
                    <Column style={{ width: 32, height: 32, backgroundColor: '#fff', borderRadius: 100, }}></Column>
                    <Column style={{ width: 32, height: 32, backgroundColor: '#fff', borderRadius: 100, }}></Column>
                    <Column style={{ width: 32, height: 32, backgroundColor: '#fff', borderRadius: 100, }}></Column>
                    <Column style={{ width: 32, height: 32, backgroundColor: '#fff', borderRadius: 100, }}></Column>
                    <Column style={{ width: 32, height: 32, backgroundColor: '#fff', borderRadius: 100, }}></Column>
                </Row>
            </Column>
            <Column style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, }}>
                {status === 'Confirmado' ? <ButtonPrimary ph={40} pv={16} label='Exportar recibo' type='sc' /> : <ButtonPrimary ph={40} pv={16} label='Efetuar o pagamento' type='pr' />}
            </Column>
        </Column>
    )
}