import React, { useState, useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import { Main, Scroll, Row, Column, Title, Button, useTheme, Label, ButtonPrimary, LabelBT } from '@theme/global';

//ICONS
import { Trash2, X, QrCode } from 'lucide-react-native';

//COMPONENTS
import { StatusBar } from 'expo-status-bar';
import { Header } from '@components/Header';
import Modal from '@components/Modal/index';

//API
import { MotiView, } from 'moti';
import { sendNotafiscal } from '@api/request/nota';
import { excludeNota, listNotas } from './hook';

export default function NotafiscalListScreen({ navigation, route }) {
    const { color, font, margin } = useTheme();

    const modalHelp = useRef(null);
    const [loadingSend, setloadingSend] = useState(false);

    const [notas, setnotas] = useState([]);
    const fetchNotas = async () => {
        try {
            const res = await listNotas()
            setnotas(res)
        } catch (error) {
            console.log(error)
        }
    }

    const handleFinish = async () => {
        setloadingSend(true);
        try {
            const res = await sendNotafiscal(notas)
            setTimeout(() => {
                navigation.replace('NotafiscalSuccess', { status: res })
            }, 1500);
        } catch (err) {
            setTimeout(() => {
                navigation.replace('NotafiscalError', { status: err.message })
            }, 1500);
        } finally {
            setTimeout(() => {
                setloadingSend(false);
            }, 1500);
        }
    }

    const handleRemove = async (item) => {
        try {
            await excludeNota(item);
        } catch (error) {
            console.log(error)
        }
        finally {
            fetchNotas();
        }
    };

    useEffect(() => {
        fetchNotas();
    }, []);


    return (
        <Main style={{ backgroundColor: '#fff', flex: 1, }}>
            <StatusBar style='light' />
            <Scroll>
                <Column style={{ paddingHorizontal: margin.h, }}>
                    <Header title='Minhas notas' />
                </Column>

                <Column style={{ marginHorizontal: margin.h, flexGrow: 1, marginVertical: 20,}}>
                    {notas?.length > 1 && <Title size={20}>Notas escaneadas</Title>}
                    <FlatList
                        data={notas}
                        keyExtractor={index => index.toString()}
                        maxToRenderPerBatch={6}
                        initialNumToRender={6}
                        ListEmptyComponent={<EmptyNota />}
                        windowSize={6}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => <ListNotas index={index} item={item} onRemove={handleRemove} />}
                    />
                    <Column style={{ height: 24, }} />
                    {notas?.length >= 1 && <ButtonPrimary disabled={loadingSend} loading={loadingSend} label='Enviar Notas Fiscais' type='pr' onPress={handleFinish} />}
                    <Column style={{ height: 24, }} />
                    <Button onPress={() => { navigation.goBack() }} radius={16} style={{ borderWidth: 2, borderColor: color.sc, paddingHorizontal: 45, paddingVertical: 12, }}>
                        <LabelBT color={color.title} style={{ fontSize: 18, }}>Continuar Escaneando</LabelBT>
                    </Button>
                </Column>
            </Scroll>
            <Modal ref={modalHelp} snapPoints={[0.1, 300]}>
                <Column style={{ marginHorizontal: margin.h, flexGrow: 1, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Title>Enviando em lote</Title>
                        <Button onPress={() => modalHelp.current?.close()} style={{ width: 48, height: 48, borderRadius: 100, backgroundColor: color.sc, justifyContent: 'center', alignItems: 'center', }}>
                            <X size={22} color="#fff" />
                        </Button>
                    </Row>
                    <Label style={{ fontSize: 16, lineHeight: 20, marginBottom: 20, marginTop: 10, color: color.label, }}>Envie várias notas fiscais de uma única vez. Escaneie todas as notas fiscais que desejar e clique em enviar, você também pode excluir uma nota clicando no ícone de lixeira ao lado direito da nota fiscal.</Label>
                    <ButtonPrimary label="Entendi" onPress={() => { modalHelp.current?.close() }} />
                </Column>
            </Modal>
        </Main>
    );
}

export const ListNotas = ({ item, onRemove, index }) => {
    const { color } = useTheme();
    return (
        <Row style={{ borderColor: '#d7d7d7', borderRadius: 8, borderWidth: 1, paddingVertical: 12, paddingHorizontal: 12, marginTop: 12, justifyContent: 'space-between', alignItems: 'center', }}>
            <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Title>#{index + 1}</Title>
                <Label style={{ fontSize: 14, marginLeft: 12, }}>{item?.toString().slice(0, 20) + '...'}</Label>
            </Row>
            <Button onPress={() => onRemove(item)} style={{ borderWidth: 1.5, borderColor: color.sc, width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center', }}>
                <Trash2 size={18} color={color.sc} />
            </Button>
        </Row>
    )
}

export const EmptyNota = () => {
    return (
        <MotiView style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 12, }}>
            <Column style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20, }}>
                <MotiView from={{ opacity: 0, scale: 0, }} animate={{ opacity: 1, scale: 1, }} style={{ width: 124, height: 124, borderRadius: 100, backgroundColor: '#A4D6ED40', justifyContent: 'center', alignItems: 'center', marginBottom: 15, }}>
                    <Column style={{ width: 72, height: 72, borderRadius: 100, backgroundColor: '#A4D6ED', justifyContent: 'center', alignItems: 'center', }}>
                        <QrCode size={34} color="#fff" />
                    </Column>
                </MotiView>
                <Title align='center' style={{ lineHeight: 20, fontSize: 18, }}>Você não escaneou nenhuma {'\n'}nota fiscal nesta ação.</Title>
            </Column>
        </MotiView>
    )
}