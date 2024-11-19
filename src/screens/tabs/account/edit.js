import React, { useContext, useEffect, useRef, useState } from 'react';
import { Main, Scroll, Title, Row, Column, HeadTitle, Label, Image, Button, ButtonPrimary, useTheme, SCREEN_WIDTH } from '@theme/global';
import { AtSign, HandHeart, HeartHandshake, Newspaper, Pencil, Upload } from 'lucide-react-native';

import { Input, Success, Error } from '@components/Forms/index';
import { Header } from '@components/Header';
import { listUser, logoutUser, excludeUser, updateUser } from '@api/request/user';
import Modal from '@components/Modal';

import { excludeToken } from '@hooks/token';
import * as ImagePicker from 'expo-image-picker';
import { Skeleton } from 'moti/skeleton';

export default function AccountEditScreen({ navigation, }) {
    const { color, font, margin } = useTheme();
    const [loading, setloading] = useState(true);
    const [loadingUpdate, setloadingUpdate] = useState(false);
    const excludeModal = useRef();

    useEffect(() => {
        const fetchUser = async () => {
            setloading(true)
            try {
                const res = await listUser()
                setemail(res.email);
                setname(res.name);
                setcpf(res.cpf);
                settel(res.whatsapp);
                setavatar(res.avatar);
                setold_avatar(res.avatar);
            } catch (error) {
                console.log(error)
            }
            finally {
                setloading(false)
            }
        }
        fetchUser();
    }, []);

    const [email, setemail] = useState(' ');
    const [name, setname] = useState(' ');
    const [cpf, setcpf] = useState(' ');
    const [tel, settel] = useState(' ');
    const [avatar, setavatar] = useState('');
    const [old_avatar, setold_avatar] = useState();
    const [success, setsuccess] = useState();
    const [error, seterror] = useState();
    const [password, setpassword] = useState();

    const handleLogout = async () => {
        try {
            const res = await logoutUser();
            if (res) {
                navigation.navigate('AuthLogin');
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const [temporaryImg, settemporaryImg] = useState(false);
    const handleImage = async () => {
        const responsey = await ImagePicker.launchImageLibraryAsync({ base64: true, quality: 1, });
        if (!responsey.canceled) {
            setavatar(responsey.assets[0].base64);
            settemporaryImg(responsey.assets[0].uri);
        } else {
            setavatar(old_avatar?.length > 0 ? old_avatar : null)
        }
    }

    const profile = temporaryImg ? { uri: `file://${temporaryImg}` } : avatar ? { uri: avatar } : {uri: 'https://avatar.iran.liara.run/public/24'}

    const handleUpdate = async () => {
        setsuccess(null)
        seterror(null)
        setloadingUpdate(true)
        try {
            const res = await updateUser({ name: name, whatsapp: tel, avatar: avatar, email: email, });
            if (res) {
                setsuccess('Perfil atualizado com sucesso!')
            }
        } catch (error) {
            console.log(error)
            seterror('Erro ao atualizar perfil')
        } finally {
            setloadingUpdate(false)
        }
    }

    const handleExit = async () => {
        try {
            const res = await excludeUser(password)
            setsuccess(res.message)
            await excludeToken()
            setTimeout(() => {
                navigation.navigate('AuthLogin')
            }, 2000);
        } catch (error) {
            console.log(error)
            seterror(error.message)
        }
    }

    const [test, settest] = useState('TEST');
    if (loading) return <SkeletonBody />

    return (
        <Main>
            <Scroll>
                <Column style={{ marginHorizontal: margin.h,  }}>
                    <Header title="Editar perfil" />
                    <Column style={{ justifyContent: 'center', alignItems: 'center', width: 160, alignSelf: 'center', marginVertical: 20, }}>
                        <Image cachePolicy="disk" source={profile} style={{ width: 154, height: 154, borderRadius: 100, }} />
                        <Button bg={color.sc} onPress={handleImage} style={{ marginTop: -30, width: 48, alignSelf: 'flex-end', height: 48, borderWidth: 4, borderColor: '#fff', borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                            <Upload size={20} color="#fff" />
                        </Button>
                    </Column>

                    <Column style={{ rowGap: 20, marginBottom: 12, }}>
                        <Input
                            value={test}
                            setValue={settest}
                            label="TESTE"
                        />
                        <Input
                            value={name}
                            setValue={setname}
                            label="Nome completo"
                        />
                        <Input
                            value={tel}
                            setValue={settel}
                            mask='PHONE'
                            label="Telefone"
                            keyboard="phone-pad"
                        />
                        <Input
                            value={email}
                            setValue={setemail}
                            label="E-mail"
                            keyboard="email-address"
                            disabled
                        />
                        <Input
                            value={cpf}
                            setValue={setcpf}
                            label="CPF"
                            mask='CPF'
                            disabled
                            keyboard="numeric"
                        />
                    </Column>

                    {success ? <Success msg={success} /> : error ? <Error msg={error} /> : null}

                    <ButtonPrimary loading={loadingUpdate} onPress={handleUpdate} label="Salvar alterações" type="pr" />
                    <Column style={{ height: 12, }} />
                    <ButtonPrimary label="Sair" type="sc" onPress={handleLogout} />
                    <Column style={{ height: 12, }} />
                    <ButtonPrimary label="Excluir Conta" type="q1" onPress={() => excludeModal.current?.expand()} />

                    <Column style={{ height: 120, }} />

                    <Modal ref={excludeModal} snapPoints={[0.1, 400]}>
                        <Column style={{ rowGap: 12, }}>
                            <Title>Para prosseguir com a exclusão digite sua senha:</Title>
                            <Input
                                value={password}
                                setValue={setpassword}
                                placeholder="Senha"
                                label="Senha"
                                secure
                            />
                            {success ? <Success msg={success} /> : error ? <Error msg={error} /> : null}
                            <ButtonPrimary label='Confirmar' onPress={handleExit} bg={color.red + 10} pv={10} ph={1} />
                        </Column>
                    </Modal>
                </Column>
            </Scroll>
        </Main>

    )
}

const SkeletonBody = () => {

    const { color, font, margin } = useTheme();
    return (
        <Column style={{ paddingTop: 50, backgroundColor: '#fff',}}>
            <Column style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20, }}>
                <Skeleton height={52} width={SCREEN_WIDTH - 40} radius={12} colorMode="light" />
            </Column>
            <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Skeleton height={154} width={154} radius={100} colorMode="light" />
            </Column>
            <Column style={{ justifyContent: 'center', alignItems: 'center', rowGap: 16, marginTop: 20, }}>
                <Skeleton height={62} width={SCREEN_WIDTH - 40} radius={12} colorMode="light" />
                <Skeleton height={62} width={SCREEN_WIDTH - 40} radius={12} colorMode="light" />
                <Skeleton height={62} width={SCREEN_WIDTH - 40} radius={12} colorMode="light" />
                <Skeleton height={62} width={SCREEN_WIDTH - 40} radius={12} colorMode="light" />
                <Column style={{ rowGap: 12, }}>
                <Column style={{ width: SCREEN_WIDTH - 40, height: 62, borderRadius: 16, backgroundColor: color.pr, }} />
                <Column style={{ width: SCREEN_WIDTH - 40, height: 62, borderRadius: 16, backgroundColor: color.sc, }} />
                <Column style={{ width: SCREEN_WIDTH - 40, height: 62, borderRadius: 16, backgroundColor: '#000', }} />
                </Column>
            </Column>
        </Column>
    )
}