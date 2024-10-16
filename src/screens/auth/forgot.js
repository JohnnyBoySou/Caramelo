import React, { useState, useRef } from 'react';
import { Row, Column, ButtonPrimary, useTheme, Main, Scroll, Title, Label, Button, } from '@theme/global';
import { TextInput } from 'react-native';
import { Success, Error, Input } from '@components/Forms/index';
import { verifyEmail } from '@api/request/user';
import { createToken } from '@hooks/token';
import { Header } from '@components/Header';
import { PinInput, } from '@pakenfit/react-native-pin-input';
import { loginUser, verifyEstabelecimento, resetPassword, resetPasswordCode, resetPasswordNew } from '@api/request/user';

export default function ForgotPassword({ navigation }) {
    const { color, margin, font } = useTheme()

    const [email, setemail] = useState('');
    const [password, setpassword] = useState();
    const [repeatPassword, setrepeatPasswors] = useState();
    const [success, setsuccess] = useState('');
    const [error, seterror] = useState('');
    const [loading, setloading] = useState(false);
    const [step, setstep] = useState(1);
    const [code, setCode] = useState(new Array(4).fill(''));


    const repPassword = useRef(null);
    const inputs = useRef([]);
    const handleChange = (text, index) => { if (isNaN(text)) return; const newCode = [...code]; newCode[index] = text; setCode(newCode); if (text !== '' && index < 3) { inputs.current[index + 1].focus(); } else if (index == 4) { handleValidate() } };
    const handleKeyPress = (event, index) => { if (event.nativeEvent.key === 'Backspace' && index > 0 && code[index] === '') { inputs.current[index - 1].focus(); } };


    const handleVerify = async () => {
        seterror()
        setsuccess()
        if (email === '') {
            seterror('Preencha o campo de e-mail')
            return
        }
        setloading(true);
        try {
            const res = await resetPassword(email);
            setsuccess('E-mail enviado com sucesso!')
            setTimeout(() => {
                setstep(2)
                setsuccess()
            }, 1500);
        } catch (error) {
            console.log(error)
            seterror(error.message)
        } finally {
            setloading(false);
        }
    }

    const handleValidate = async () => {
        setsuccess()
        seterror()
        setloading(true);
        try {
            const res = await resetPasswordCode(email, code.join(''));
            setsuccess('Código validado com sucesso!')
            setTimeout(() => {
                setstep(3)
                setsuccess()
            }, 1500);
        } catch (error) {
            console.log(error)
            seterror(error.message)
        } finally {
            setloading(false);
        }
    }

    const handleNewpassword = async () => {
        seterror()
        setsuccess()
        setloading(true);
        if (password !== repeatPassword) {
            seterror('As senhas não coincidem')
            setloading(false)
            return
        }
        try {
            const params = { email: email, code: code.join(''), password: password, password_confirmation: repeatPassword }
            const res = await resetPasswordNew(params);
            setsuccess(res.message)
            setTimeout(() => {
                setstep(3)
                setsuccess()
                navigation.replace('AuthLogin');
            }, 1500);
        } catch (error) {
            console.log(error)
            seterror(error.message)
        } finally {
            setloading(false);
        }
    }

    const [focusedIndex, setFocusedIndex] = useState(null);
    const handleFocus = (index) => {
        setFocusedIndex(index);
    };

    const handleBlur = () => {
        setFocusedIndex(null);
    };


    return (
        <Main>
            <Scroll>
                <Column mh={20} pv={20} style={{ rowGap: 16, }}>
                    <Header title='Recuperar senha' />

                    {step == 1 && <Column style={{ rowGap: 16, marginTop: 16, }}>
                        <Title>Preencha o email da sua conta</Title>
                        <Input
                            value={email}
                            label="E-mail *"
                            keyboard="email-address"
                            onSubmitEditing={handleVerify}
                            placeholder='Ex.: jonhdoe@mail.com' setValue={setemail} />
                        {success ? <Success msg={success} /> : error ? <Error msg={error} /> : null}
                        <ButtonPrimary disabled={loading} label='Verificar' loading={loading} onPress={handleVerify} bg={color.primary} pv={14} ph={24} />
                    </Column>}

                    {step == 2 && <Column style={{ rowGap: 16, }}>
                        <Title>Insira o código enviado para o seu e-mail</Title>
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
                        <ButtonPrimary label='Validar' loading={loading} disabled={loading} onPress={handleValidate} bg={color.primary} pv={14} ph={24} style={{ borderRadius: 18 }} />
                    </Column>}

                    {step == 3 && <Column style={{ rowGap: 16, }}>
                        <Label>Preencha sua nova senha</Label>
                        <Input
                            value={password}
                            label="Senha *"
                            onSubmitEditing={() => { repPassword.current?.focus() }}
                            placeholder='Ex.: *********' setValue={setpassword}
                            pass={true}
                        />
                        <Input
                            value={repeatPassword}
                            label="Repita a Senha *"
                            ref={repPassword}
                            onSubmitEditing={handleNewpassword}
                            placeholder='Ex.: *********' setValue={setrepeatPasswors}
                            pass={true}
                        />
                        {success ? <Success msg={success} /> : error ? <Error msg={error} /> : null}
                        <ButtonPrimary loading={loading} label='Definir nova senha' disabled={loading} onPress={handleNewpassword} bg={color.primary} pv={14} ph={24} style={{ borderRadius: 18 }} />
                    </Column>}
                </Column>
            </Scroll>
        </Main>

    )
}