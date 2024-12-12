import React, { useState, useEffect, useRef } from 'react';
import { Row, Column, Title, Button, useTheme, SCREEN_HEIGHT, Label, HeadTitle, ButtonPrimary, SCREEN_WIDTH } from '@theme/global';

//ICONS
import { Keyboard, Barcode, X } from 'lucide-react-native';
import { MaterialCommunityIcons, } from '@expo/vector-icons';

//COMPONENTS
import { StatusBar } from 'expo-status-bar';
import { Header } from '@components/Header';
import Modal from '@components/Modal/index';
import { TextArea } from '@components/Forms';
//API

//EXPO CAMERA
import { Camera, CameraView } from 'expo-camera';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

export default function AnonimoNotaScreen({ navigation }) {
    const { color, font, margin } = useTheme();
    const [hasPermission, setHasPermission] = useState(null);

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
    const [flash, setflash] = useState(false);

    const [zoom, setZoom] = useState(0);
    const handleZoomToggle = () => {
        setZoom((prevZoom) => (prevZoom === 0.5 ? 0 : 0.5)); // Alterna entre zoom máximo e padrão
    };

    const tapGesture = Gesture.Tap()
        .numberOfTaps(2)
        .onEnd(() => {
            runOnJS(handleZoomToggle)();
        });




    const handleScaned = (data) => {
        navigation.navigate('AnonimoNotaVerify', { nota: data.data })
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
            <Column style={{ position: 'absolute', marginTop: 50, zIndex: 99, width: '100%', paddingHorizontal: margin.h, }}>
                <Header title='Escanear Nota' />
            </Column>

            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, }}>
                <Button pv={1} ph={1} radius={8} onPress={() => { modalHelp?.current?.expand() }} style={{ width: '100%', }}>
                    <Column style={{ backgroundColor: '#fff', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 12, }}>
                        <Label size={16}>Aponte sua câmera para o QR Code da nota fiscal e aguarde escanear.</Label>
                    </Column>
                </Button>
            </Row>

            <Column style={{ height: SCREEN_HEIGHT * 1.1, width: SCREEN_WIDTH, alignSelf: 'center', position: 'absolute', borderRadius: 24, overflow: 'hidden', }}>
                <Column style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: SCREEN_WIDTH, height: 1.1 * SCREEN_HEIGHT, zIndex: 9, }}>
                    <Column style={{ width: SCREEN_WIDTH, height: 200, backgroundColor: '#00000080', }}></Column>
                    <Row>
                        <Column style={{ flexGrow: 1, height: 250, backgroundColor: '#00000080', }}></Column>
                        <GestureDetector gesture={tapGesture}>
                        <Column style={{ width: 250, height: 250, }}></Column>
                        </GestureDetector>
                        <Column style={{ flexGrow: 1, height: 250, backgroundColor: '#00000080', }}></Column>
                    </Row>
                    <Column style={{ width: SCREEN_WIDTH, height: 500, backgroundColor: '#00000080', }}></Column>
                </Column>
                <CameraView
                    style={{ flex: 1 }}
                    onBarcodeScanned={(data) => handleScaned(data)}
                    facing='back'
                    autoFocus='on'
                    enableTorch={flash}
                    zoom={zoom}
                    barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
                />
            </Column>

            <Row style={{ bottom: 220, alignSelf: 'center', position: 'absolute', columnGap: 20 }}>
                <Button style={{ width: 56, height: 56, borderRadius: 100,  backgroundColor: color.sc, justifyContent: 'center', alignItems: 'center', }} onPress={() => { setflash(!flash) }} >
                    <MaterialCommunityIcons name={flash ? "flashlight-off" : "flashlight"} size={24} color="#FFF" />
                </Button>
            </Row>
            <Row style={{ marginTop: 20, columnGap: 24, marginHorizontal: margin.h, position: 'absolute', bottom: 40, }}>
                <Button pv={1} ph={1} radius={1} onPress={() => { navigation.navigate('AnonimoNotaList') }} style={{ flexGrow: 1, }}>
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
                        <ButtonPrimary label="Validar" onPress={() => navigation.navigate('AnonimoNotaVerify', { nota: digit })} />
                    </Column>
                </Column>
            </Modal>
        </Column>
    );
}
