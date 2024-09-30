import React, { useState, useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import { Row, Column, Title, Button, useTheme, SCREEN_HEIGHT, Label, HeadTitle, ButtonPrimary, SCREEN_WIDTH, LabelBT } from '@theme/global';

//ICONS
import { RefreshCcw, Keyboard, Trash2, Barcode, X, QrCode } from 'lucide-react-native';

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

export default function NotafiscalScreen({ navigation }) {
    const { color, font, margin } = useTheme();
    const [hasPermission, setHasPermission] = useState(null);
    const [facing, setFacing] = useState('back');

    useEffect(() => {
        const getCameraPermission = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        };
        getCameraPermission();
    }, []);

    const modalList = useRef(null);
    const modalHelp = useRef(null);
    const modalDigit = useRef(null);

    const [digit, setdigit] = useState();
    const [notas, setNotas] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();
    const [value, setvalue] = useState();

    const handleSend = async (nota) => {
        setloading(true)
        setsuccess();
        seterror();
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        try {
            const res = await verifyNota({ nota: nota })
            if (res) {
                if (notas?.includes(nota)) {
                    setTimeout(() => {
                        seterror('Nota fiscal repetida');
                        setloading(false);
                    }, 1500);
                } else {
                    setNotas((prevNotas) => [...prevNotas, nota]);
                    setTimeout(() => {
                        setloading(false);
                        setsuccess(true)
                    }, 1500);
                }
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

    const handleFinish = async () => {
        try {
            const res = await sendNotafiscal(notas)
            navigation.navigate('NotafiscalSuccess', { status: res })
        } catch (err) {
            navigation.navigate('NotafiscalError', { status: err.message })
        } finally {
        }
    }

    const handleRemove = (item) => {
        setNotas((prevNotas) => prevNotas.filter((nota) => nota !== item));
    };

    if (hasPermission === null) {
        return <Column style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
            <Title align="center">Solicitando permissão para usar a câmera...</Title>
        </Column>
    }
    if (hasPermission === false) {
        return <Column style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
            <Title align="center" >Permissão para acessar a câmera foi negada</Title>
        </Column>
    }

    return (
        <Column style={{ backgroundColor: '#fff', flex: 1, }}>
            <StatusBar style='light' />
            <Column style={{ position: 'absolute', top: 50, zIndex: 99, width: '100%', paddingHorizontal: margin.h, }}>
                <Header title='Escanear Nota' />
            </Column>
            <Column style={{ height: SCREEN_HEIGHT * .74, width: '100%', alignSelf: 'center', borderBottomLeftRadius: 24, borderBottomRightRadius: 24, overflow: 'hidden', }}>
                <CameraView
                    style={{ flex: 1 }}
                    facing={facing}
                    onBarcodeScanned={(data) => {
                        if (value === data.data) return;
                        else { setvalue(data.data); handleSend(data.data); }
                    }}
                />

                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, position: 'absolute', bottom: 20, left: 0, right: 0, }}>
                    <Button pv={1} ph={1} radius={8} onPress={() => { modalHelp.current?.expand() }} style={{ width: '80%', }}>
                        <Column style={{ backgroundColor: '#fff', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 12, }}>
                            <Label size={14}>Aponte sua câmera para o QR Code da nota fiscal e aguarde escanear.</Label>
                        </Column>
                    </Button>
                    <Button onPress={() => { setFacing(current => (current === 'back' ? 'front' : 'back')) }} style={{ width: 56, marginLeft: 12, height: 56, borderRadius: 100, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', }}>
                        <RefreshCcw size={18} color={color.sc} />
                    </Button>
                </Row>
            </Column>
            <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} exit={{ opacity: 0, }} style={{ backgroundColor: error || success ? '#00000080' : 'transparent', position: 'absolute', top: 0, width: SCREEN_WIDTH, height: 1.1 * SCREEN_HEIGHT, justifyContent: 'center', alignItems: 'center', }}>
                <AnimatePresence >
                    {loading ? <MessageAwait /> : <>
                        {error && <MessageError setvalue={setvalue} error={error} seterror={seterror} />}
                        {success && <MessageSuccess handleFinish={handleFinish} setvalue={setvalue} setsuccess={setsuccess} />}</>}
                </AnimatePresence>
            </MotiView>

            <Row style={{ marginTop: 20, columnGap: 24, marginHorizontal: margin.h, }}>
                <Button pv={1} ph={1} radius={1} onPress={() => { modalList.current?.expand() }} style={{ flexGrow: 1, }}>
                    <Column style={{ flexGrow: 1, borderRadius: 18, backgroundColor: color.pr, paddingVertical: 20, paddingHorizontal: 20, }}>
                        <Column style={{ width: 48, marginBottom: 20, height: 48, borderRadius: 100, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', }}>
                            <Barcode size={18} color={color.sc} />
                        </Column>
                        <Title style={{ lineHeight: 24, }}>Minhas {'\n'}Notas</Title>
                    </Column>
                </Button>
                <Button pv={1} ph={1} radius={1} onPress={() => { modalDigit.current?.expand() }} style={{ flexGrow: 1, }}>
                    <Column style={{ flexGrow: 1, borderRadius: 18, backgroundColor: color.sc, paddingVertical: 20, paddingHorizontal: 20, }}>
                        <Column style={{ width: 48, marginBottom: 20, height: 48, borderRadius: 100, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', }}>
                            <Keyboard size={18} color={color.sc} />
                        </Column>
                        <Title color="#fff" style={{ lineHeight: 24, }}>Digitar {'\n'}Nota</Title>
                    </Column>
                </Button>
            </Row>

            <Modal ref={modalList} snapPoints={[0.1, 500]}>
                <Column style={{ marginHorizontal: margin.h, flexGrow: 1, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Title>Minhas Notas</Title>
                        <Button onPress={() => modalList.current?.close()} style={{ width: 48, height: 48, borderRadius: 100, backgroundColor: color.sc, justifyContent: 'center', alignItems: 'center', }}>
                            <X size={22} color="#fff" />
                        </Button>
                    </Row>

                    <FlatList
                        data={notas}
                        keyExtractor={index => index.toString()}
                        maxToRenderPerBatch={6}
                        initialNumToRender={6}
                        windowSize={6}
                        ListEmptyComponent={<EmptyNota modalList={modalList} />}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => <ListNotas index={index} item={item} onRemove={handleRemove} />}
                    />
                    {notas?.length >= 1 && <Row style={{ padding: 12, borderRadius: 12, marginTop: 30, backgroundColor: color.secundary + 20, justifyContent: 'center', alignItems: 'center', }}>
                        <AntDesign name="questioncircleo" size={24} color={color.secundary} />
                        <Column style={{ marginLeft: 12, marginRight: 12, width: '80%' }}>
                            <Label style={{ fontSize: 14, lineHeight: 16, marginTop: 5, color: color.secundary, }}>Envie várias de uma única vez. Escaneie todas as notas fiscais que desejar e clique em enviar logo abaixo.</Label>
                        </Column>
                    </Row>}
                </Column>
            </Modal>

            <Modal ref={modalHelp} snapPoints={[0.1, 500]}>
                <Column style={{ marginHorizontal: margin.h, flexGrow: 1, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Title>Como escanear</Title>
                        <Button onPress={() => modalHelp.current?.close()} style={{ width: 48, height: 48, borderRadius: 100, backgroundColor: color.sc, justifyContent: 'center', alignItems: 'center', }}>
                            <X size={22} color="#fff" />
                        </Button>
                    </Row>
                    <Column style={{ rowGap: 24, marginVertical: 20, }}>
                        <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Column style={{ width: 56, height: 56, backgroundColor: color.sc, justifyContent: 'center', alignItems: 'center', borderRadius: 100, marginRight: 12, }}>
                                <HeadTitle color='#fff'>1</HeadTitle>
                            </Column>
                            <Column style={{ width: '80%' }}>
                                <Title size={20}>Pegue sua nota fiscal</Title>
                                <Label style={{ fontFamily: font.light, marginTop: 4, lineHeight: 18, }} size={15}>Coloque-a em uma superfície plana e bem iluminada.</Label>
                            </Column>
                        </Row>
                        <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Column style={{ width: 56, height: 56, backgroundColor: '#f1f1f1', justifyContent: 'center', alignItems: 'center', borderRadius: 100, marginRight: 12, }}>
                                <HeadTitle color={color.sc}>2</HeadTitle>
                            </Column>
                            <Column style={{ width: '80%' }}>
                                <Title size={20}>Centralize sua câmera</Title>
                                <Label style={{ fontFamily: font.light, marginTop: 4, lineHeight: 18, }} size={15}>Posicione a câmera sobre o QR Code da nota fiscal, centralizando-a na tela.</Label>
                            </Column>
                        </Row>
                        <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Column style={{ width: 56, height: 56, backgroundColor: color.sc, justifyContent: 'center', alignItems: 'center', borderRadius: 100, marginRight: 12, }}>
                                <HeadTitle color='#fff'>3</HeadTitle>
                            </Column>
                            <Column style={{ width: '80%' }}>
                                <Title size={20}>Aguarde ser escaneado</Title>
                                <Label style={{ fontFamily: font.light, marginTop: 4, lineHeight: 18, }} size={15}>Ao concluir o escaneamento, o aparelho vibrará, sinalizando que a nota fiscal foi validada.</Label>
                            </Column>
                        </Row>


                    </Column>
                    <ButtonPrimary label="Okay" onPress={() => { modalHelp.current?.close() }} />
                </Column>
            </Modal>

            <Modal ref={modalDigit} snapPoints={[0.1, 700]}>
                <Column style={{ marginHorizontal: margin.h, flexGrow: 1, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Title>Digitar nota fiscal</Title>
                        <Button onPress={() => modalDigit.current?.close()} style={{ width: 48, height: 48, borderRadius: 100, backgroundColor: color.sc, justifyContent: 'center', alignItems: 'center', }}>
                            <X size={22} color="#fff" />
                        </Button>
                    </Row>

                    <Column style={{ marginVertical: 20, rowGap: 20, }}>
                        <TextArea label="Digite o código da nota fiscal" setValue={setdigit} value={digit} />
                        <ButtonPrimary label="Validar" onPress={() => modalDigit.current?.close()} />
                    </Column>
                </Column>
            </Modal>
        </Column>
    );
}

export const ListNotas = ({ item, onRemove, index }) => {
    const { color } = useTheme();
    return (
        <Row style={{ borderBottomColor: '#d7d7d7', borderBottomWidth: 2, paddingVertical: 12, paddingHorizontal: 12, marginTop: 12, justifyContent: 'space-between', alignItems: 'center', }}>
            <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Title>#{index + 1}</Title>
                <Label style={{ fontSize: 14, marginLeft: 12, }}>{item?.toString().slice(0, 20) + '...'}</Label>
            </Row>
            <Button onPress={() => onRemove(item)} style={{ backgroundColor: color.sc, width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center', }}>
                <Trash2 size={24} color='#fff' />
            </Button>
        </Row>
    )
}

export const MessageError = ({ error, seterror, setvalue }) => {
    const { color } = useTheme();
    return (
        <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} exit={{ opacity: 0, }} style={{ marginTop: -100, justifyContent: 'center', width: 280, alignItems: 'center', alignSelf: 'center', backgroundColor: "#fff", padding: 20, borderRadius: 12, }}>
            <Column style={{ backgroundColor: color.red + 20, padding: 12, borderRadius: 100, }}>
                <MaterialCommunityIcons name="alert-circle-outline" size={32} color={color.red} />
            </Column>

            <Title style={{ textAlign: 'center', fontSize: 20, lineHeight: 21, marginTop: 12, }}>{error}</Title>
            <Label style={{ textAlign: 'center', fontSize: 14, color: color.secundary + 99, lineHeight: 16, marginTop: 4, }}>Você pode tentar novamente com outra nota fiscal.</Label>
            <Button onPress={() => { seterror(null); setvalue(); }} style={{ paddingVertical: 8, paddingHorizontal: 16, marginTop: 12, }}>
                <LabelBT style={{ fontSize: 16, }}>Tentar novamente</LabelBT>
            </Button>
        </MotiView>
    )
}

export const MessageAwait = () => {
    const { color } = useTheme();
    return (
        <MotiView from={{ opacity: 0, translateY: 30, }} animate={{ opacity: 1, translateY: 0, }} exit={{ opacity: 0, translateY: 30, }} style={{ marginTop: -100, justifyContent: 'center', width: 280, alignItems: 'center', alignSelf: 'center', backgroundColor: "#fff", padding: 20, borderRadius: 12, }}>
            <Column style={{ borderRadius: 100, backgroundColor: color.sc + 20, width: 64, height: 64, justifyContent: 'center', alignItems: 'center', }}>
                <MaterialCommunityIcons name="qrcode-scan" size={32} color={color.sc} />
            </Column>
            <Title style={{ textAlign: 'center', fontSize: 18, marginTop: 4, }}>Analisando nota fiscal</Title>
            <Label style={{ textAlign: 'center', fontSize: 14, lineHeight: 16, }}>Estamos analisando sua {'\n'}nota fiscal.</Label>

            <ProgressBar indeterminate={true} style={{ height: 8, width: 100, borderRadius: 100, backgroundColor: color.pr, marginTop: 12, }} color={color.sc} />
        </MotiView>
    )
}

export const MessageSuccess = ({ setvalue, setsuccess, handleFinish }) => {
    const { color } = useTheme();
    return (
        <MotiView from={{ opacity: 0, translateY: 30, }} animate={{ opacity: 1, translateY: 0, }} exit={{ opacity: 0, translateY: 30, }} style={{ justifyContent: 'center', marginTop: -100, width: 280, alignItems: 'center', alignSelf: 'center', backgroundColor: "#fff", padding: 20, borderRadius: 12, }}>
            <Column style={{ backgroundColor: color.green + 20, width: 64, height: 64, justifyContent: 'center', alignItems: 'center', borderRadius: 100, }}>
                <MaterialCommunityIcons name="check" size={32} color={color.green} />
            </Column>
            <Title style={{ textAlign: 'center', fontSize: 18, marginTop: 4, }}>Nota fiscal válida</Title>
            <Label style={{ textAlign: 'center', fontSize: 14, lineHeight: 16, marginBottom: 16, }}>Nota fiscal verificada e confirmada.</Label>
            <ButtonPrimary label='Continuar enviando' onPress={() => { setvalue(null); setsuccess(null) }} />
            <Column style={{ height: 12, }} />
            <ButtonPrimary label='Enviar nota fiscal' type='sc' onPress={handleFinish} />
        </MotiView>
    )
}

export const EmptyNota = () => {
    const { color } = useTheme();
    return (
        <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0, }} transition={{ type: 'timing', duration: 300 }} style={{ justifyContent: 'center', alignItems: 'center', padding: 12, }}>
            <Column style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20, }}>
                <MotiView from={{ opacity: 0, scale: 0, }} animate={{ opacity: 1, scale: 1, }} style={{ width: 124, height: 124, borderRadius: 100, backgroundColor: color.sc + 20, justifyContent: 'center', alignItems: 'center', marginBottom: 30, }}>
                    <Column style={{ width: 72, height: 72, borderRadius: 100, backgroundColor: color.sc, justifyContent: 'center', alignItems: 'center', }}>
                        <QrCode size={34} color="#fff" />
                    </Column>
                </MotiView>
                <Title align='center' style={{ lineHeight: 24, }}>Você ainda não {'\n'}registrou nenhuma {'\n'}nota fiscal.</Title>
            </Column>
        </MotiView>
    )
}