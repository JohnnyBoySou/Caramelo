import React, { useEffect, useState, useContext, useRef, } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Pressable, Vibration } from 'react-native';
import { Column, Label, Title, Row, Button, LabelBT, useTheme, Loader, } from '@theme/global';
import { payCredito, } from '@api/request/donate/payments';
import { MotiView } from 'moti';
import { BookUser, Calendar, Check, CreditCard, X, Lock } from 'lucide-react-native';

import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Input, Success, Error } from '@components/Forms'
import { useNavigation } from '@react-navigation/native';
import { Header } from '@components/Header';

export default function PaymentCredito({ value }) {

    const { color, margin, font } = useTheme();
    const navigation = useNavigation();
    const [error, seterror] = useState();
    const [loading, setloading] = useState(false);
    const [success, setsuccess] = useState();

    const [nome, setnome] = useState('TESTE DA SILVA');
    const [cvv, setcvv] = useState('123');
    const [mes, setmes] = useState('12/32');
    const [numerocartao, setnumerocartao] = useState('4111111111111111');
    const cvvref = useRef()
    const mesref = useRef()
    const numerocartaoref = useRef()


    const handleBuyService = async () => {
        setloading(true)
        seterror()
        setsuccess()
        const params = {
            value: value,
            nome: nome,
            cvv: cvv,
            meseano: mes,
            numerocartao: numerocartao,
        }
        try {
            const res = await payCredito(params)
            if(res.status == 'captured'){
                Vibration.vibrate(300);
                setsuccess('Pagamento realizado com sucesso!')
                navigation.navigate('DonateSuccess', { status: 'Pagamento realizado com sucesso!' });
            }
        } catch (error) {
            seterror(error.message)
            Vibration.vibrate(300);
        } finally {
            setloading(false)
        }
    }


    return (
        <KeyboardAvoidingView behavior={"position"} style={{ flex: 1, }}>
            <Column style={{ marginHorizontal: margin.h, }}>

                <Header title="Dados do cartão" />
                <Column style={{ marginVertical: 20, }}>
                    <Column style={{ backgroundColor: color.pr, borderRadius: 18, paddingVertical: 20, paddingHorizontal: 20, }}>

                        <Title style={{ fontSize: 12, lineHeight: 16, letterSpacing: 1, color: "#fff", }}>NOME COMPLETO</Title>
                        <Column style={{ width: 180, height: 20, backgroundColor: '#ffffff60', borderRadius: 4, marginTop: 4, }} />
                        <Title style={{ fontSize: 12, lineHeight: 16, marginTop: 12, letterSpacing: 1, color: "#fff", }}>NÚMERO DO CARTÃO</Title>
                        <Column style={{ width: 200, height: 20, backgroundColor: '#ffffff60', borderRadius: 4, marginTop: 4, }} />
                        <Row style={{ marginTop: 12, }}>
                            <Column style={{ marginRight: 32, }}>
                                <Title style={{ fontSize: 12, lineHeight: 16, letterSpacing: 1, color: "#fff", }}>CVV</Title>
                                <Column style={{ width: 60, height: 20, backgroundColor: '#ffffff60', borderRadius: 4, marginTop: 4, }} />
                            </Column>
                            <Column>
                                <Title style={{ fontSize: 12, lineHeight: 16, letterSpacing: 1, color: "#fff", }}>VENCIMENTO</Title>
                                <Column style={{ width: 80, height: 20, backgroundColor: '#ffffff60', borderRadius: 4, marginTop: 4, }} />
                            </Column>
                        </Row>
                    </Column>
                </Column>
                <Title>Complete os campos</Title>
                <Column style={{ rowGap: 16, marginTop: 12, }}>
                    <Input
                        label="Nome completo do titular"
                        setValue={setnome}
                        value={nome}
                        onSubmitEditing={() => numerocartaoref.current?.focus()}
                    />
                    <Input
                        label="Número do cartão"
                        value={numerocartao}
                        setValue={setnumerocartao}
                        keyboard="number-pad"
                        onSubmitEditing={() => cvvref.current?.focus()}
                        mask="CARD"
                        ref={numerocartaoref}
                    />

                    <Row style={{ columnGap: 12, }}>
                        <Column style={{ flexGrow: 1, }} >

                            <Input
                                label="CVV"
                                value={cvv}
                                setValue={setcvv}
                                mask="CVV"
                                onSubmitEditing={() => mesref.current?.focus()}
                                keyboard="number-pad"
                                ref={cvvref}
                            />

                        </Column>
                        <Column style={{ flexGrow: 1, }} >

                            <Input
                                mask="EXPIRATION_DATE"
                                label="Vencimento"
                                keyboard="number-pad"
                                setValue={setmes}
                                value={mes}
                                onSubmitEditing={handleBuyService}
                                ref={mesref}
                            />
                        </Column>
                    </Row>

                    <Column style={{ flexGrow: 1, height: 2, backgroundColor: '#d1d1d1', }} />

                    {success ? <Success msg={success} /> : error ? <Error msg={error} /> : null}

                    <Button pv={14} onPress={handleBuyService} style={{ backgroundColor: color.sc, justifyContent: 'center', alignItems: 'center',  }} radius={12}>
                        <Row style={{ justifyContent: 'center', alignItems: 'center',  }}>
                            {loading ? <Loader color={color?.pr}/> : <LabelBT color='#fff'>Finalizar</LabelBT>}
                        </Row>
                    </Button>


                </Column>
            </Column>
        </KeyboardAvoidingView>
    )
}

const BuyService = ({ handleBuyService, loading, error, success, }) => {
    const { color } = useTheme();
    const widthValue = useSharedValue(162);
    const heightValue = useSharedValue(52);
    const radiusValue = useSharedValue(12);
    const backgroundValue = useSharedValue(error ? '#850505' : '#00A3FF');
    const navigation = useNavigation();

    useEffect(() => {
        if (success && !loading) {
            // Sucesso
            backgroundValue.value = withSpring(color.green);
            setTimeout(() => {
                navigation.navigate('DonateSuccess', { success: success });
            }, 1500);
        } else if (error && !loading) {
            // Erro
            widthValue.value = withTiming(124, { duration: 300 });
            heightValue.value = withTiming(52, { duration: 300 });
            radiusValue.value = withTiming(100, { duration: 300 });
            backgroundValue.value = withTiming('#f55353');
        }
        else if (loading && !error && !success) {
            // loading
            radiusValue.value = withTiming(100, { duration: 600, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
            widthValue.value = withTiming(52, { duration: 600, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
            heightValue.value = withTiming(52, { duration: 600, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
        } else if (!loading && !error && !success) {
            // Normal
            widthValue.value = withTiming('100%', { duration: 300 });
            heightValue.value = withTiming(52, { duration: 300 });
            radiusValue.value = withTiming(12, { duration: 300 });
            backgroundValue.value = withTiming('#2ECA6F', { duration: 300 });
        }
    }, [success, error, loading]);


    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: widthValue.value,
            height: heightValue.value,
            backgroundColor: backgroundValue.value,
            //  bottom: bottomValue.value,
            borderRadius: radiusValue.value,
        };
    });
    return (
        <Pressable onPress={handleBuyService}>

            <Animated.View style={[{}, animatedStyle]}>
                <Column style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
                    {loading ? <ActivityIndicator size="large" color="#fff" />
                        : <Label style={{ color: '#fff', textAlign: 'center', fontFamily: 'Font_Medium', }}>{error?.length > 0 ? error : 'Verificar e continuar'}</Label>}
                </Column>
                {success &&
                    <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} transition={{ type: 'timing', duration: 500, }} delay={500} style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
                        <MotiView from={{ opacity: 0, scale: 0, }} animate={{ opacity: 1, scale: 1, }} style={{ width: 100, height: 100, borderRadius: 100, backgroundColor: "#ffffff50", justifyContent: 'center', alignItems: 'center', }}>
                            <Check size={32} color="#fff" />
                        </MotiView>
                    </MotiView>}
            </Animated.View>
        </Pressable>
    );
};