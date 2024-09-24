import React, { useContext, useState, useRef } from 'react';
import { ThemeContext } from 'styled-components/native';
import { Main, Scroll, Row, Column, Label, Title, Button, SubLabel, U, HeadTitle, LabelBT, SCREEN_HEIGHT, Loader, useTheme, ButtonPrimary } from '@theme/global';
import { CircleCheck, CircleX, UserPlus, X } from 'lucide-react-native';
import { ActivityIndicator, TextInput } from 'react-native';
import Modal from '@components/Modal/index';
import { HeaderLogo } from '@components/Header';
import { Input, Success, Error } from '@components/Forms/index';
import { useNavigation } from '@react-navigation/native';
import { resetPassword, resetPasswordCode, resetPasswordNew, registerUser } from '@api/request/user';
import { verifyEmail } from '@api/request/user';
import { createToken } from '@hooks/token';

export default function AuthRegisterScreen({ navigation, }) {
    const { color, font, margin, } = useContext(ThemeContext)

    const [name, setname] = useState('João de SOsua');
    const [cpf, setcpf] = useState('12345678901');
    const [email, setemail] = useState('joaodesousa101@gmail.com');
    const [tel, settel] = useState('49991935657');
    const [password, setpassword] = useState('223761de');

    const modalTermos = useRef();
    const passStrong = useRef();
    const modalConfirm = useRef();

    const checkPasswordStrength = (password) => {
        const criteria = {
            length: password?.length >= 8,
            upperCase: /[A-Z]/.test(password),
            lowerCase: /[a-z]/.test(password),
            number: /\d/.test(password),
        };
        return criteria;
    };

    const passwordCriteria = checkPasswordStrength(password);
    const porcentagePassword = Object.values(passwordCriteria).filter((e) => e).length / Object.values(passwordCriteria).length * 100;
    const messagePassword = porcentagePassword < 50 ? 'Fraca' : porcentagePassword < 80 ? 'Razoável' : 'Forte';
    const colorPassword = porcentagePassword < 50 ? color.red : porcentagePassword < 80 ? '#f5ad42' : color.green;

    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const [loading, setloading,] = useState(false);

    const cpfRef = useRef(null);
    const emailRef = useRef(null);
    const telRef = useRef(null);
    const passwordRef = useRef(null);

    const handleRegister = async () => {
        modalConfirm.current?.expand()
        setloading(true)
        setError('')
        setSuccess('')
        const params = { name, cpf, email, tel, password }
        try {
            const res = await registerUser(params)
            if (res.email) {
                setSuccess('Confirme seu número de telefone!')
                setTimeout(() => {
                    modalConfirm.current?.expand()
                }, 1500);
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setloading(false)
        }
    }

    return (
        <Main >
            <Scroll>
                <Column ph={margin.h}>
                    <HeaderLogo />
                    <HeadTitle style={{ marginTop: 24, }} size={42}>Criar conta</HeadTitle>
                    <Label>Crie sua conta para conhecer mais sobre o Instituto Caramelo e poder participar das nossas campanhas!</Label>

                    <Column style={{ rowGap: 14, marginTop: 14, }}>
                        <Input
                            label="Nome completo *"
                            placeholder="Nome"
                            value={name}
                            onSubmitEditing={() => { cpfRef.current?.focus() }}
                            setValue={setname}
                        />
                        <Input
                            label="CPF *"
                            placeholder="CPF"
                            value={cpf}
                            setValue={setcpf}
                            ref={cpfRef}
                            onSubmitEditing={() => { telRef.current?.focus() }}
                            mask="CPF"
                            maxLength={14}
                        />
                        <Input
                            label="Telefone *"
                            placeholder="Telefone"
                            maxLength={16}
                            value={tel}
                            onSubmitEditing={() => { emailRef.current?.focus() }}
                            ref={telRef}
                            setValue={settel}
                            mask="PHONE"
                        />
                        <Input
                            label="E-mail *"
                            placeholder="Email"
                            ref={emailRef}
                            onSubmitEditing={() => { passwordRef.current?.focus() }}
                            value={email}
                            setValue={setemail}
                        />

                        <Input
                            label="Senha *"
                            placeholder="Senha"
                            value={password}
                            ref={passwordRef}
                            onSubmitEditing={handleRegister}
                            setValue={setpassword}
                            pass={true}
                        />
                    </Column>

                    {password?.length >= 1 &&
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 8, }}>
                            <Column style={{ backgroundColor: color.off, height: 10, borderRadius: 30, width: 100, }}>
                                <Column style={{ width: porcentagePassword, height: 10, borderRadius: 100, backgroundColor: colorPassword, }} />
                            </Column>
                            <Button onPress={() => { passStrong.current.expand() }} >
                                <U>
                                    <SubLabel style={{ color: colorPassword }}>{messagePassword}</SubLabel>
                                </U>
                            </Button>
                        </Row>
                    }


                    {success ? <Success msg={success} /> : error ? <Error msg={error} /> : null}
                    <Column style={{ height: 20, }} />
                    <Button radius={100} bg={color.sc} style={{ backgroundColor: color.sc, }} pv={14} ph={20} onPress={handleRegister} >
                        <Row style={{ alignItems: 'center', justifyContent: 'space-between', }}>


                            <LabelBT size={24} color="#fff" align="center" style={{ marginLeft: 44, }}>Criar conta</LabelBT>
                            <Column style={{ width: 64, height: 64, marginRight: -12, marginTop: -6, marginBottom: -6, backgroundColor: '#8A3E49', borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                                {loading ? <Loader color="#fff" size={32} /> : <UserPlus size={28} color="#fff" />}
                            </Column>
                        </Row>
                    </Button>
                    <Column style={{ height: 20, }} />
                    <Column>
                        <Button style={{ justifyContent: 'center', alignItems: 'center', }} onPress={() => { modalTermos.current?.expand() }} >
                            <Label align="center">
                                Ao criar uma conta você aceita os <U>Termos de Uso e Política de Privacidade</U>.
                            </Label>
                        </Button>
                    </Column>
                </Column>
            </Scroll>


            <Modal ref={modalConfirm} snapPoints={[0.1, 400]} >
                <Column style={{ marginHorizontal: margin.h, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Column>
                            <Title>Confirme seu e-mail</Title>
                            <Column style={{ height: 6, }} />
                            <Label size={14}>Preencha o código enviado no seu e-mail</Label>
                        </Column>
                        <Button onPress={() => { modalConfirm?.current.close() }} style={{ backgroundColor: color.sc, width: 42, height: 42, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                            <X size={24} color='#fff' />
                        </Button>
                    </Row>

                    <ConfirmEmail email={email} navigation={navigation} />
                </Column>
            </Modal>

            <Modal ref={modalTermos} snapPoints={[0.1, SCREEN_HEIGHT]}>
            </Modal>

            <Modal ref={passStrong} snapPoints={[0.1, 200]}>
                <Column style={{ marginHorizontal: margin.h, marginVertical: margin.v, }}>
                    <SubLabel style={{ color: color.secundary, fontSize: 18, }}>Requisitos para a senha</SubLabel>
                    <Row style={{ marginTop: 8, }}>
                        {passwordCriteria?.length ? <CircleCheck size={18} color={color.green} /> : <CircleX size={18} color={color.red} />}
                        <Label style={{ fontSize: 16, marginLeft: 12, fontFamily: 'Font_Medium', color: '#111', }}>Mínimo de 8 caracteres</Label>
                    </Row>
                    <Row style={{ marginTop: 8, }}>
                        {passwordCriteria?.upperCase ? <CircleCheck size={18} color={color.green} /> : <CircleX size={18} color={color.red} />}
                        <Label style={{ fontSize: 16, marginLeft: 12, fontFamily: 'Font_Medium', color: '#111', }}>Uma letra MAIÚSCULA.</Label>
                    </Row>
                    <Row style={{ marginTop: 8, }}>
                        {passwordCriteria?.lowerCase ? <CircleCheck size={18} color={color.green} /> : <CircleX size={18} color={color.red} />}
                        <Label style={{ fontSize: 16, marginLeft: 12, fontFamily: 'Font_Medium', color: '#111', }}>Uma letra minúscula.</Label>
                    </Row>
                    <Row style={{ marginTop: 8, }}>
                        {passwordCriteria?.number ? <CircleCheck size={18} color={color.green} /> : <CircleX size={18} color={color.red} />}
                        <Label style={{ fontSize: 16, marginLeft: 12, fontFamily: 'Font_Medium', color: '#111', }}>Um número.</Label>
                    </Row>
                </Column>
            </Modal>
        </Main>
    )
}

const ConfirmEmail = ({ email, navigation }) => {

    const { color, font, margin, } = useContext(ThemeContext)
    const inputs = useRef([]);
    const [code, setCode] = useState(new Array(4).fill(''));

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();
    const handleChange = (text, index) => { if (isNaN(text)) return; const newCode = [...code]; newCode[index] = text; setCode(newCode); if (text !== '' && index < 3) { inputs.current[index + 1].focus(); } };
    const handleKeyPress = (event, index) => { if (event.nativeEvent.key === 'Backspace' && index > 0 && code[index] === '') { inputs.current[index - 1].focus(); } };
    const handleVerify = async () => {
        seterror()
        setsuccess()
        setloading(true)
        if (code.join('').length == 4) {
            try {
                const res = await verifyEmail(email, code.join(''));
                if (res?.token) {
                    setsuccess('Email verificado com sucesso! Aguarde um momento...')
                    await createToken(res, token)
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

    return (
        <Column>
            <Row style={{ columnGap: 8, marginVertical: 24, }}>
                {code.map((digit, index) => (
                    <TextInput
                        key={index}
                        value={digit}
                        onChangeText={(text) => handleChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        style={{
                            height: 84,
                            backgroundColor: '#D1D1D190',
                            color: color.title,
                            fontFamily: font.medium,
                            borderRadius: 12,
                            flexGrow: 1,
                            textAlign: 'center',
                            fontSize: 28,
                        }}
                        keyboardType="number-pad"
                        maxLength={1}
                        ref={(input) => (inputs.current[index] = input)}
                    />
                ))}
            </Row>
            {success ? <Success msg={success} /> : error ? <Error msg={error} /> : null}
            <ButtonPrimary label='Verificar' disabled={loading} onPress={handleVerify} bg={color.pr} pv={14} ph={24} style={{ borderRadius: 18 }} />
        </Column>
    )
}


const ForgetPassword = (forgetPassword) => {
    const { color, margin, font } = useTheme()
    const [email, setemail] = useState('');
    const [password, setpassword] = useState();
    const [repeatPassword, setrepeatPasswors] = useState();
    const [success, setsuccess] = useState('');
    const [error, seterror] = useState('');
    const [loading, setloading] = useState(false);
    const [step, setstep] = useState(1);
    const navigation = useNavigation();
    const [code, setCode] = useState(new Array(4).fill(''));
    const repPassword = useRef(null);
    const inputs = useRef([]);
    const handleChange = (text, index) => { if (isNaN(text)) return; const newCode = [...code]; newCode[index] = text; setCode(newCode); if (text !== '' && index < 3) { inputs.current[index + 1].focus(); } };
    const handleKeyPress = (event, index) => { if (event.nativeEvent.key === 'Backspace' && index > 0 && code[index] === '') { inputs.current[index - 1].focus(); } };


    const handleVerify = async () => {
        setloading(true);
        try {
            const res = await resetPassword(email);
            setsuccess(res.message)
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
        setloading(true);
        try {
            const res = await resetPasswordCode(email, code.join(''));
            setsuccess(res.message)
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
        setloading(true);
        if (password !== repeatPassword) {
            seterror('As senhas não coincidem')
            setloading(false)
            return
        }
        try {
            const res = await resetPasswordNew(email, code.join(''), password);
            setsuccess(res.message)
            await createToken(res.token)
            setTimeout(() => {
                setstep(3)
                setsuccess()
                navigation.replace('Tabs');
            }, 1500);
        } catch (error) {
            console.log(error)
            seterror(error.message)
        } finally {
            setloading(false);
        }
    }


    return (
        <Column style={{ rowGap: 16, }}>
            {step == 1 && <Column style={{ rowGap: 16, }}>

                <Input
                    value={email}
                    label="Telefone *"
                    keyboard="numeric"
                    onSubmitEditing={handleVerify}
                    placeholder='Ex.: 11 9 9876-5432' setValue={setemail} />
                {success ? <Success msg={success} /> : error ? <Error msg={error} /> : null}
                <Button disabled={loading} onPress={handleVerify} bg={color.pr} pv={14} ph={24} style={{ borderRadius: 18 }}>
                    <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                        {loading ? <ActivityIndicator size="small" color={color.title} /> :
                            <Title size={18} color={color.title} >Enviar</Title>
                        }
                    </Row>
                </Button>
            </Column>}

            {step == 2 && <Column style={{ rowGap: 16, }}>
                <Title>Confirme seu Código</Title>
                <Label>Insira o código enviado para o seu telefone</Label>
                <Row style={{ columnGap: 12, }}>
                    {code.map((digit, index) => (
                        <TextInput
                            key={index}
                            value={digit}
                            onChangeText={(text) => handleChange(text, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            style={{
                                height: 84,
                                backgroundColor: digit == index ? '#505050' : '#303030',
                                color: "#fff",
                                fontFamily: font.medium,
                                borderRadius: 12,
                                flexGrow: 1,
                                textAlign: 'center',
                                fontSize: 32,
                            }}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={(input) => (inputs.current[index] = input)}
                        />
                    ))}
                </Row>
                {success ? <Success msg={success} /> : error ? <Error msg={error} /> : null}
                <Button disabled={loading} onPress={handleValidate} bg={color.pr} pv={14} ph={24} style={{ borderRadius: 18 }}>
                    <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                        {loading ? <ActivityIndicator size="small" color={color.title} /> :
                            <Title size={18} color={color.title} >Validar</Title>
                        }
                    </Row>
                </Button>
            </Column>}

            {step == 3 && <Column style={{ rowGap: 16, }}>
                <Title>Nova senha</Title>
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
                <Button disabled={loading} onPress={handleNewpassword} bg={color.pr} pv={14} ph={24} style={{ borderRadius: 18 }}>
                    <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                        {loading ? <ActivityIndicator size="small" color={color.title} /> :
                            <Title size={18} color={color.title} >Definir nova senha</Title>
                        }
                    </Row>
                </Button>
            </Column>}
        </Column>
    )
}

