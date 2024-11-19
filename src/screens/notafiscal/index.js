import React, { useState, useEffect, useRef } from 'react';
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

    const modalHelp = useRef(null);
    const modalDigit = useRef(null);

    const [digit, setdigit] = useState();
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();
    const [value, setvalue] = useState();

    const handleScaned = (data) => {
        navigation.navigate('NotafiscalVerify', { nota: data.data })
    }

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
                    onBarcodeScanned={(data) => handleScaned(data)}
                />
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, position: 'absolute', bottom: 20, left: 0, right: 0, }}>
                    <Button pv={1} ph={1} radius={8} onPress={() => { modalHelp?.current?.expand() }} style={{ width: '100%', }}>
                        <Column style={{ backgroundColor: '#fff', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 12, }}>
                            <Label size={14}>Aponte sua câmera para o QR Code da nota fiscal e aguarde escanear.</Label>
                        </Column>
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
                <Button pv={1} ph={1} radius={1} onPress={() => { navigation.navigate('NotafiscalVerify') }} style={{ flexGrow: 1, }}>
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
                        <Button onPress={() => modalDigit?.current?.close()} style={{ width: 48, height: 48, borderRadius: 100, backgroundColor: color.sc, justifyContent: 'center', alignItems: 'center', }}>
                            <X size={22} color="#fff" />
                        </Button>
                    </Row>

                    <Column style={{ marginVertical: 20, rowGap: 20, }}>
                        <TextArea label="Digite o código da nota fiscal" setValue={setdigit} value={digit} />
                        <ButtonPrimary label="Validar" onPress={() => navigation.navigate('NotafiscalVerify', { nota: digit})} />
                    </Column>
                </Column>
            </Modal>
        </Column>
    );
}
