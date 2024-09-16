import React, { useContext, useState, useRef, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { Main, Scroll, Title, Row, Column, Label, Button, SubLabel, U } from '@theme/global';
import { ArrowLeft, CircleCheck, CircleX } from 'lucide-react-native';
import Input from '@components/Forms/input';
import Modal from '@components/Modal/index';

const { width, height } = Dimensions.get('window');

export default function AuthRegisterPage({ navigation, route, }) {
    const { color, font, margin, } = useContext(ThemeContext)

    const [name, setname] = useState();
    const [cpf, setcpf] = useState();
    const [email, setemail] = useState();
    const [tel, settel] = useState();
    const [password, setpassword] = useState();
    const [password2, setpassword2] = useState();

    const passStrong = useRef()

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

    return (
        <Main style={{}}>
            <Scroll>
                <Column ph={28}>
                    <Button onPress={() => { navigation.goBack() }} pv={0} ph={0} style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }} bg={color.sc.sc3}>
                        <ArrowLeft size={20} color="#fff" />
                    </Button>
                    <Title style={{ fontSize: 26, marginVertical: 20, }}>Olá! &#128075; Crie sua conta na Villa Pongo aqui</Title>

                    <Input
                        label="Nome *"
                        placeholder="Nome"
                        value={name}
                        setValue={setname}
                    />
                    <Column style={{ height: 16, }} />
                    <Input
                        label="CPF *"
                        placeholder="CPF"
                        value={cpf}
                        setValue={setcpf}
                        mask="CPF"
                        maxLength={14}
                    />
                    <Column style={{ height: 16, }} />
                    <Input
                        label="E-mail *"
                        placeholder="Email"
                        value={email}
                        setValue={setemail}
                    />
                    <Column style={{ height: 16, }} />
                    <Input
                        label="Telefone *"
                        placeholder="Telefone"
                        maxLength={16}
                        value={tel}
                        setValue={settel}
                        mask="PHONE"
                    />
                    <Column style={{ height: 16, }} />

                    <Input
                        label="Senha *"
                        placeholder="Senha"
                        value={password}
                        setValue={setpassword}
                    />
                    <Column style={{ height: 16, }} />
                    <Input
                        label="Confirme sua senha *"
                        placeholder="Confirme sua senha"
                        value={password2}
                        setValue={setpassword2}
                    />
                    <Column style={{ height: 16, }} />

                    {password?.length >= 1 &&
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 8, marginBottom: -10, }}>
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
    )
}

