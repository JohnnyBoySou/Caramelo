import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, HeadTitle, LabelBT, Image, ButtonPrimary, SCREEN_HEIGHT } from '@theme/global';

import { HeaderHistory } from '@components/Header';
import { StatusBar } from 'expo-status-bar';
import { ArrowUpRight, Check, Loader, Plus, Search, TriangleAlert } from 'lucide-react-native';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { FlatList } from 'react-native-gesture-handler';
import { Skeleton } from 'moti/skeleton';
import { listDonate, listNotas } from '@api/request/history';
import { useNavigation } from '@react-navigation/native';
import { formatValue } from '../../hooks/utils';

export default function HistoryScreen({ navigation, }) {
    const { color, font, margin, } = useTheme();

    const [type, settype] = useState('Notas');
    const [date, setdate] = useState('TUDO');
    const [loading, setloading] = useState(false);

    const [donate, setdonate] = useState();
    const [notas, setnotas] = useState();

    const fetchData = async () => {
        setloading(true)
        try {
            const donateres = await listDonate();
            const notasres = await listNotas();
            setdonate(donateres);
            setnotas(notasres);
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const a = false;
    return (
        <Main style={{ paddingTop: 0, backgroundColor: '#fff', flex: 1, }}>
            <StatusBar style="light" backgroundColor={color.sc} />
            <Column style={{ backgroundColor: color.sc, paddingHorizontal: margin.h, paddingTop: 50, borderRadius: 24, }}>
                <HeaderHistory title='Histórico' />
                <Row mv={20} style={{ columnGap: 12, }}>
                    <Button style={{ backgroundColor: type == 'Notas' ? '#fff' : '#ffffff30', flexGrow: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => { settype('Notas') }} >
                        <LabelBT style={{ color: type == 'Notas' ? color.sc : '#fff', }}>Notas fiscais</LabelBT>
                    </Button>
                    <Button style={{ backgroundColor: type == 'Doacoes' ? '#fff' : '#ffffff30', flexGrow: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => { settype('Doacoes') }} >
                        <LabelBT style={{ color: type == 'Doacoes' ? color.sc : '#fff', }}>Doações</LabelBT>
                    </Button>
                    <Button style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', width: 46, height: 46, }}>
                        <Search size={22} color={color.sc} />
                    </Button>
                </Row>
            </Column>

            <Column>
                {a && <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ columnGap: 8, marginVertical: 12, }}>
                    <Column style={{ width: 12, }}></Column>
                    {dates.map((item, index) => (
                        <Button key={index} pv={10} ph={16} style={{ backgroundColor: date == item.name ? color.sc : '#F1F1F1', justifyContent: 'center', alignItems: 'center', }} onPress={() => { setdate(item.name) }}>
                            <LabelBT style={{ color: date == item.name ? '#fff' : color.sc, fontSize: 14, }}>{item.name}</LabelBT>
                        </Button>
                    ))}
                    <Column style={{ width: 12, }}></Column>
                </ScrollView>}


                {loading ? <SkeletonBody /> : <>
                    {type == 'Notas' ?
                        <FlatList
                            data={notas}
                            renderItem={({ item }) => <CardNota item={item} navigation={navigation} />}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={<EmptyNota />}
                            ListHeaderComponent={<Column style={{ height: 20, }}></Column>}
                            ListFooterComponent={<Column style={{ height: 50, }}></Column>}
                            refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchData} colors={[color.sc]} />}
                            contentContainerStyle={{ paddingHorizontal: margin.h, }}
                            ItemSeparatorComponent={() => <Column style={{ height: 1, backgroundColor: '#d7d7d7', }} mv={16} />}
                        />
                        :
                        <FlatList
                            data={donate}
                            renderItem={({ item }) => <CardDoacao item={item} navigation={navigation} />}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            style={{height: 0.8 * SCREEN_HEIGHT, }}
                            ListEmptyComponent={<EmptyDonate />}
                            ListHeaderComponent={<Column style={{ height: 20, }}></Column>}
                            ListFooterComponent={<Column style={{ height: 50, }}></Column>}
                            refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchData} colors={[color.sc]} />}
                            contentContainerStyle={{ paddingHorizontal: margin.h, }}
                            ItemSeparatorComponent={() => <Column style={{ height: 1, backgroundColor: '#d7d7d7', }} mv={16} />}
                        />}</>}

            </Column>
        </Main>
    )
}

const EmptyNota = () => {
    const navigation = useNavigation();
    return (
        <Column style={{ justifyContent: 'center', alignItems: 'center', rowGap: 18, backgroundColor: '#f1f1f1', borderRadius: 12, paddingVertical: 20, paddingHorizontal: 20, }}>
            <Column style={{ width: 64, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffff', height: 64, borderRadius: 100, }}>
                <Plus size={28} color='#5F101C' />
            </Column>
            <Title style={{ textAlign: 'center', }} size={18}>Nenhuma nota fiscal enviada ainda.</Title>
            <ButtonPrimary pv={8} label='Enviar nota' onPress={() => { navigation.navigate('Notafiscal') }} />
        </Column>
    )
}

const EmptyDonate = () => {
    const navigation = useNavigation();
    return (
        <Column style={{ justifyContent: 'center', alignItems: 'center', rowGap: 18, backgroundColor: '#f1f1f1', borderRadius: 12, paddingVertical: 20, paddingHorizontal: 20, }}>
            <Column style={{ width: 64, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffff', height: 64, borderRadius: 100, }}>
                <Plus size={28} color='#5F101C' />
            </Column>
            <Title style={{ textAlign: 'center', }} size={18}>Nenhuma doação feita ainda.</Title>
            <ButtonPrimary pv={8} label='Fazer doação' onPress={() => { navigation.navigate('DonateValue') }} />
        </Column>
    )
}


const CardNota = ({ item, navigation }) => {
    const { color, font, margin } = useTheme()
    const { id, value, date } = item
    return (
        <Button pv={1} ph={1} radius={1} onPress={() => { navigation.navigate('HistorySingle', { id: id, type: 'Nota fiscal', item: item, }) }} >
            <Column>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                    <Row>
                        <Image source={require('@imgs/nota_fiscal.png')} style={{ width: 76, height: 76, borderRadius: 12, }} />
                        <Column mh={12} style={{ justifyContent: 'center', }}>
                            <Title size={18}>{value} nota{value > 1 ? 's' : ''} fisca{value > 1 ? 'is' : 'l'}</Title>
                            <Label size={12} style={{ opacity: .8, marginTop: 4, }}>{date}</Label>
                        </Column>
                    </Row>
                    <Button style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }} bg={color.pr}>
                        <ArrowUpRight size={24} color={color.sc} />
                    </Button>
                </Row>
            </Column>
        </Button>
    )
}

const CardDoacao = ({ item, navigation }) => {
    const { color, font, margin } = useTheme()
    const { id, value, date, label, Status } = item
    const cl = Status == 'aprovado' ? '#2ECA6F' : Status == 'aguardando' ? '#3072C8' : color.sc
    const icon = Status == 'aprovado' ? <Check size={22} color='#fff' /> : Status == 'aguardando' ? <Loader size={22} color='#fff' /> : <TriangleAlert size={22} color='#fff' />

    return (
        <Button pv={1} ph={1} radius={1} onPress={() => { navigation.navigate('HistorySingle', { id: id, type: 'Doação', item: item, }) }} >
            <Column>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                    <Row>
                        <Image source={require('@imgs/doacao.png')} style={{ width: 76, height: 76, borderRadius: 12, }} />
                        <Column mh={12} style={{ justifyContent: 'center', }}>
                            <Title size={20}>R$ {formatValue(value)},00</Title>
                            <Label size={14} style={{ marginVertical: 4, fontFamily: font.semibold, }} color={cl}>{label}</Label>
                            <Label size={10} style={{ marginTop: 4, }}>{date}</Label>
                        </Column>
                    </Row>
                    <Button style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }} bg={cl}>
                        <Row>
                            {icon}
                        </Row>
                    </Button>
                </Row>
            </Column>
        </Button>
    )
}


const dates = [
    {
        id: 1,
        name: 'TUDO',
    },
    {
        id: 2,
        name: 'HOJE',
    },
    {
        id: 3,
        name: 'SEMANA',
    },
    {
        id: 4,
        name: 'MÊS',
    },
    {
        id: 5,
        name: 'ANO',
    }
]


const SkeletonBody = () => {
    return (
        <Column style={{ marginHorizontal: 24, marginVertical: 0, rowGap: 16, }}>
            <Row style={{ columnGap: 12, justifyContent: 'space-between', alignItems: 'center', flexGrow: 1, }}>
                <Row style={{ justifyContent: 'center', alignItems: 'center', columnGap: 12, }}>
                    <Skeleton radius={12} height={76} width={76} colorMode='light' />
                    <Column style={{ rowGap: 8, }}>
                        <Skeleton radius={6} height={32} width={164} colorMode='light' />
                        <Skeleton radius={6} height={24} width={136} colorMode='light' />
                    </Column>
                </Row>
                <Skeleton radius={100} height={46} width={46} colorMode='light' />
            </Row>
            <Column style={{ height: 1, flexGrow: 1, backgroundColor: '#DEDEDE', }} />
            <Row style={{ columnGap: 12, justifyContent: 'space-between', alignItems: 'center', flexGrow: 1, }}>
                <Row style={{ justifyContent: 'center', alignItems: 'center', columnGap: 12, }}>
                    <Skeleton radius={12} height={76} width={76} colorMode='light' />
                    <Column style={{ rowGap: 8, }}>
                        <Skeleton radius={6} height={32} width={164} colorMode='light' />
                        <Skeleton radius={6} height={24} width={136} colorMode='light' />
                    </Column>
                </Row>
                <Skeleton radius={100} height={46} width={46} colorMode='light' />
            </Row>
            <Column style={{ height: 1, flexGrow: 1, backgroundColor: '#DEDEDE', }} />
            <Row style={{ columnGap: 12, justifyContent: 'space-between', alignItems: 'center', flexGrow: 1, }}>
                <Row style={{ justifyContent: 'center', alignItems: 'center', columnGap: 12, }}>
                    <Skeleton radius={12} height={76} width={76} colorMode='light' />
                    <Column style={{ rowGap: 8, }}>
                        <Skeleton radius={6} height={32} width={164} colorMode='light' />
                        <Skeleton radius={6} height={24} width={136} colorMode='light' />
                    </Column>
                </Row>
                <Skeleton radius={100} height={46} width={46} colorMode='light' />
            </Row>
            <Column style={{ height: 1, flexGrow: 1, backgroundColor: '#DEDEDE', }} />
            <Row style={{ columnGap: 12, justifyContent: 'space-between', alignItems: 'center', flexGrow: 1, }}>
                <Row style={{ justifyContent: 'center', alignItems: 'center', columnGap: 12, }}>
                    <Skeleton radius={12} height={76} width={76} colorMode='light' />
                    <Column style={{ rowGap: 8, }}>
                        <Skeleton radius={6} height={32} width={164} colorMode='light' />
                        <Skeleton radius={6} height={24} width={136} colorMode='light' />
                    </Column>
                </Row>
                <Skeleton radius={100} height={46} width={46} colorMode='light' />
            </Row>
            <Column style={{ height: 1, flexGrow: 1, backgroundColor: '#DEDEDE', }} />
            <Row style={{ columnGap: 12, justifyContent: 'space-between', alignItems: 'center', flexGrow: 1, }}>
                <Row style={{ justifyContent: 'center', alignItems: 'center', columnGap: 12, }}>
                    <Skeleton radius={12} height={76} width={76} colorMode='light' />
                    <Column style={{ rowGap: 8, }}>
                        <Skeleton radius={6} height={32} width={164} colorMode='light' />
                        <Skeleton radius={6} height={24} width={136} colorMode='light' />
                    </Column>
                </Row>
                <Skeleton radius={100} height={46} width={46} colorMode='light' />
            </Row>
            <Column style={{ height: 1, flexGrow: 1, backgroundColor: '#DEDEDE', }} />
        </Column>
    )
}