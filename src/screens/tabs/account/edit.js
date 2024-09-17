import React, { useContext, useEffect, useState } from 'react';
import { Main, Scroll, Title, Row, Column, HeadTitle, Label, Image, Button, ButtonPrimary } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import { AtSign, HandHeart, HeartHandshake, Newspaper, Pencil, Upload } from 'lucide-react-native';

import { Input } from '@components/Forms/index';
import { Header } from '@components/Header'; 

export default function AccountEditScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);

    const [user, setuser] = useState({
        name: 'João de Sousa',
        email: 'joaosousa@gmail.com',
        cpf: '00000000000',
        tel: '00000000000',
        avatar: 'https://i.pinimg.com/564x/b6/f9/07/b6f9073a96f7408459f82df4b21e4643.jpg',
    });

    useEffect(() => {
        const fetchUser = () => {
            try {

                setemail(user.email);
                setname(user.name);
                setcpf(user.cpf);
                settel(user.tel);
            } catch (error) {

            }
        }
        fetchUser();
    }, []);

    const [email, setemail] = useState(' ');
    const [name, setname] = useState(' ');
    const [cpf, setcpf] = useState(' ');
    const [tel, settel] = useState(' ');

    return (
        <Main>
            <Scroll>
                <Column style={{ marginHorizontal: margin.h, marginVertical: 20, }}>


                    <Header title="Editar perfil"/>
                    <Column style={{ justifyContent: 'center', alignItems: 'center', width: 160, alignSelf: 'center', marginVertical: 20, }}>
                        <Image source={{ uri: user.avatar }} style={{ width: 154, height: 154, borderRadius: 100, }} />
                        <Button bg={color.sc} onPress={() => { }} style={{ marginTop: -30, width: 48, alignSelf: 'flex-end', height: 48, borderWidth: 4, borderColor: '#fff', borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                            <Upload size={20} color="#fff" />
                        </Button>
                    </Column>

                    <Column style={{ rowGap: 20, marginBottom: 12, }}>
                    <Input
                        value={name}
                        setValue={setname}
                        label="Nome completo"
                    />
                    <Input
                        value={email}
                        setValue={setemail}
                        label="E-mail"
                        keyboard="email-address"
                    />
                    <Input
                        value={cpf}
                        setValue={setcpf}
                        label="CPF"
                        mask='CPF'
                        keyboard="numeric"
                    />
                    <Input
                        value={tel}
                        setValue={settel}
                        mask='PHONE'
                        label="Telefone"
                        keyboard="phone-pad"
                    />
                    </Column>

                    <ButtonPrimary label="Salvar alterações" type="sc"/>


                </Column>
            </Scroll>
        </Main>

    )
}