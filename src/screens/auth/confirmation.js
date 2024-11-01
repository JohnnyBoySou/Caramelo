import React, { useState, useRef } from 'react';
import { Row, Column, ButtonPrimary, useTheme, Main, Scroll, Title, Label } from '@theme/global';
import { TextInput } from 'react-native';
import { Success, Error } from '@components/Forms/index';
import { verifyEmail } from '@api/request/user';
import { createToken } from '@hooks/token';
import { Header } from '@components/Header';

export default function ConfirmEmail({ route, navigation }) {

    const { color, font, margin, } = useTheme()

    const email = route.params?.email ? route.params.email : '';

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();

    const handleChange = (text, index) => { if (isNaN(text)) return; const newCode = [...code]; newCode[index] = text; setCode(newCode); if (text !== '' && index < 3) { inputs.current[index + 1].focus(); } };
    const handleKeyPress = (event, index) => {
        if (event.nativeEvent.key === 'Backspace') {
            if (index > 0 && code[index] === '') {
                inputs.current[index - 1].focus();
            }
        }
        if (event.nativeEvent.key === 'Enter' && index === 3 && code[index] !== '') {
            handleVerify();
        }
    };


    const handleVerify = async () => {
        seterror()
        setsuccess()
        setloading(true)
        if (code.join('').length == 4) {
            try {
                const res = await verifyEmail(email, code.join(''));
                if (res?.token) {
                    setsuccess('Email verificado com sucesso! Aguarde um momento...')
                    await createToken(res?.token)
                    setTimeout(() => {
                        navigation.replace('Tabs')
                    }, 500);
                }
            } catch (error) {
                console.log(error)
                seterror(error.message)
            } finally {
                setloading(false)
            }
        } else {
            seterror('Preencha o código de verificação')
            setloading(false)
        }
    }
    const inputs = useRef([]);
    const [code, setCode] = useState(new Array(4).fill(''));
    const [focusedIndex, setFocusedIndex] = useState(null);
    const handleFocus = (index) => {
        setFocusedIndex(index);
    };

    const handleBlur = () => {
        setFocusedIndex(null);
    };

    return (
        <Main>
            <Column style={{ flex: 1, marginHorizontal: 20, marginVertical: 20, }}>
                <Header title='' />
                <Column style={{height: 12 }} />
                <Title>Código de Confirmação</Title>
                <Label style={{ marginTop: 10, }}>Digite o código que recebeu em seu e-mail, caso não encontre dê uma olhada na caixa de spam.</Label>

                <Row style={{ columnGap: 12, marginVertical: 24, }}>
                    {code.map((digit, index) => (
                        <TextInput
                            key={index}
                            value={digit}
                            onChangeText={(text) => handleChange(text, index)}
                            onKeyPress={(event) => handleKeyPress(event, index)}
                            style={{
                                height: 84,
                                backgroundColor: focusedIndex === index ? color.pr : '#D1D1D190',
                                color: color.title,
                                fontFamily: font.medium,
                                borderRadius: 12,
                                flexGrow: 1,
                                textAlign: 'center',
                                fontSize: 28,
                            }}
                            onFocus={() => handleFocus(index)} // Detecta quando o input está focado
                            onBlur={handleBlur} // Detecta quando o input perde o foco

                            keyboardType="number-pad"
                            maxLength={1}
                            ref={(input) => (inputs.current[index] = input)}
                        />
                    ))}
                </Row>


                {success ? <Success msg={success} /> : error ? <Error msg={error} /> : null}
                <ButtonPrimary loading={loading} label='Verificar' disabled={loading} onPress={handleVerify} bg={color.pr} pv={14} ph={24} style={{ borderRadius: 18 }} />
            </Column>
        </Main>

    )
}