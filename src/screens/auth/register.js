import React, { useState, useRef } from 'react';
import { Main, Scroll, Row, Column, Label, Button, SubLabel, U, HeadTitle, LabelBT, Loader, useTheme } from '@theme/global';
import { CircleCheck, CircleX, UserPlus } from 'lucide-react-native';
//COMPONENTS
import { HeaderLogo } from '@components/Header';
import { Input, Success, Error } from '@components/Forms/index';
import Modal from '@components/Modal/index';
import { KeyboardAvoidingView, Platform } from 'react-native';
//API
import { registerUser } from '@api/request/user';

export default function AuthRegisterScreen({ navigation, }) {
    const { color, margin, } = useTheme()

    const [name, setname] = useState('');
    const [cpf, setcpf] = useState('');
    const [email, setemail] = useState('');
    const [tel, settel] = useState('');
    const [password, setpassword] = useState('');

    const passStrong = useRef();

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
        setloading(true)
        setError('')
        setSuccess('')
        const params = { name, cpf, email, tel, password }
        try {
            const res = await registerUser(params)
            if (res.email) {
                setSuccess('Confirme seu e-mail!')
                setTimeout(() => {
                    navigation.navigate('ConfirmEmail', { email: res.email })
                }, 1500);
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setloading(false)
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'height' : 'height'} style={{ flex: 1, }} >

            <Main>
                <Scroll>
                    <Column ph={margin.h} pv={20}>
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
                                keyboard="numeric"
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
                                keyboard="numeric"
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
                                keyboard="email-address"
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
                            <Button style={{ justifyContent: 'center', alignItems: 'center', }} onPress={() => { navigation.navigate('Privacidade') }} >
                                <Label align="center">
                                    Ao criar uma conta você aceita os <U>Termos de Uso e Política de Privacidade</U>.
                                </Label>
                            </Button>
                        </Column>
                    </Column>
                </Scroll>


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
        </KeyboardAvoidingView>
    )
}