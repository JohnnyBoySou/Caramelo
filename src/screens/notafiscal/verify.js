import React, { useState, useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import { Main, Scroll, Row, Column, Title, Button, useTheme, SCREEN_HEIGHT, Label, HeadTitle, ButtonPrimary, SCREEN_WIDTH, LabelBT } from '@theme/global';

//ICONS
import { RefreshCcw, Keyboard, Trash2, Barcode, X, QrCode, CircleHelp } from 'lucide-react-native';

//COMPONENTS
import { Camera, CameraView } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { Header } from '@components/Header';
import Modal from '@components/Modal/index';
import { TextArea } from '@components/Forms';
import { MaterialCommunityIcons, AntDesign, } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';

//API
import { AnimatePresence, MotiView, } from 'moti';
import * as Haptics from 'expo-haptics';
import { verifyNota, sendNotafiscal } from '@api/request/nota';
import { useNavigation } from '@react-navigation/native';
import { excludeNota, listNotas, addNota } from './hook';

export default function NotafiscalVerifyScreen({ navigation, route }) {
    const { color, font, margin } = useTheme();

    const nota = route.params?.nota ? route.params?.nota : null;
    const modalHelp = useRef(null);

    const [loading, setloading] = useState(false);
    const [loadingSend, setloadingSend] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();
    const [value, setvalue] = useState();

    const [notas, setnotas] = useState([]);
    const fetchNotas = async () => {
        try {
            const res = await listNotas()
            setnotas(res)
        } catch (error) {
            console.log(error)
        }
    }

    const handleVerify = async (nota) => {
        setloading(true)
        setsuccess();
        seterror();
        if (!nota) {
            setloading(false);
            seterror('Você não escaneou \nnenhuma nota fiscal.');
            return
        }
        else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
            try {
                const res = await verifyNota({ nota });
                if (res) {
                    await addNota(nota);
                    setsuccess(true);
                    fetchNotas();
                } else {
                    seterror('Nota fiscal inválida');
                }
            } catch (error) {
                seterror(error.message);
            } finally {
                setTimeout(() => {
                    setloading(false);
                }, 1000);
            }
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
        if (nota) {
            handleVerify(nota)
        } else {
            seterror('Você não escaneou \nnenhuma nota fiscal.');
        }
    }, []);


    return (
        <Main style={{ backgroundColor: '#fff', flex: 1, }}>
            <StatusBar style='light' />
            <Scroll>

                <Column style={{ paddingHorizontal: margin.h, }}>
                    <Header title='Notas escaneadas' />
                </Column>

                <Column style={{ paddingVertical: 20, paddingHorizontal: 30, marginTop: 30, }}>
                    {!error && !success ? <MessageAwait /> : <></>}
                    {error && <MessageError setvalue={setvalue} error={error} seterror={seterror} />}
                    {success && <MessageSuccess handleFinish={handleFinish} setvalue={setvalue} setsuccess={setsuccess} />}
                </Column>
                <Column style={{ marginHorizontal: margin.h, flexGrow: 1,  }}>
                <Button onPress={() => { navigation.goBack() }} mh={20} radius={16} style={{ borderWidth: 2, borderColor: color.sc,  paddingVertical: 12, }}>
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

export const MessageError = ({ error, }) => {
    const { color } = useTheme();
    return (
        <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} exit={{ opacity: 0, }} style={{ justifyContent: 'center', alignItems: 'center', }}>
            <MotiView from={{ opacity: 0, scale: 0, }} animate={{ opacity: 1, scale: 1, }} style={{ width: 124, height: 124, borderRadius: 100, backgroundColor: color.sc + 20, justifyContent: 'center', alignItems: 'center', marginBottom: 30, }}>
                <Column style={{ backgroundColor: '#5F101C', width: 72, height: 72, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                    <MaterialCommunityIcons name="alert-circle-outline" size={32} color='#fff' />
                </Column>
            </MotiView>
            <Title style={{ textAlign: 'center', fontSize: 18, lineHeight: 21, marginTop: 12, }}>{error}</Title>
        </MotiView>
    )
}

export const MessageAwait = () => {
    const { color } = useTheme();
    return (
        <MotiView style={{ justifyContent: 'center', alignItems: 'center', }}>
            <MotiView from={{ opacity: 0, scale: 0, }} animate={{ opacity: 1, scale: 1, }} style={{ width: 124, height: 124, borderRadius: 100, backgroundColor: color.sc + 20, justifyContent: 'center', alignItems: 'center', marginBottom: 30, }}>

                <Column style={{ borderRadius: 100, backgroundColor: color.sc + 20, width: 64, height: 64, justifyContent: 'center', alignItems: 'center', }}>
                    <MaterialCommunityIcons name="qrcode-scan" size={24} color={color.sc} />
                </Column>
            </MotiView>
            <Title style={{ textAlign: 'center', fontSize: 18, marginTop: 12, }}>Aguarde</Title>
            <Label style={{ textAlign: 'center', fontSize: 14, }}>Estamos analisando sua nota fiscal.</Label>

            <ProgressBar indeterminate={true} style={{ height: 12, width: 140, borderRadius: 100, backgroundColor: color.pr, marginTop: 12, }} color={color.sc} />
        </MotiView>
    )
}

export const MessageSuccess = () => {
    const { color } = useTheme();
    const navigation = useNavigation();
    return (
        <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} exit={{ opacity: 0, }} style={{ justifyContent: 'center',  }}>
            <MotiView from={{ opacity: 0, scale: 0, }} animate={{ opacity: 1, scale: 1, }} style={{ width: 124, height: 124, borderRadius: 100, alignSelf: 'center', backgroundColor: '#2ECA6F20', justifyContent: 'center', alignItems: 'center', marginBottom: 15, }}>
                <Column style={{ backgroundColor: '#2ECA6F', width: 72, height: 72, justifyContent: 'center', alignItems: 'center', borderRadius: 100, }}>
                    <MaterialCommunityIcons name="check" size={32} color='#ffffff' />
                </Column>
            </MotiView>
            <Title style={{ textAlign: 'center', fontSize: 18, marginTop: 4, }}>Nota fiscal válida</Title>
            <Label style={{ textAlign: 'center', fontSize: 14, lineHeight: 16, marginBottom: 20, }}>Nota fiscal verificada e confirmada.</Label>
            <ButtonPrimary label='Enviar Nota Fiscal' type='pr' onPress={() => navigation.navigate('NotafiscalList')} />
        </MotiView>
    )
}

export const EmptyNota = () => {
    const { color } = useTheme();
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