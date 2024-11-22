import React, { useState, useRef } from 'react';
import { Main, Scroll, Row, Column, Label, Button, Title, U, HeadTitle, LabelBT, Loader, Image, ButtonPrimary, useTheme } from '@theme/global';
import { ArrowRight, UserPlus, X } from 'lucide-react-native';

import Modal from '@components/Modal/index';
import { HeaderLogo } from '@components/Header';
import { Input, Success, Error } from '@components/Forms/index';
import { loginUser, verifyEstabelecimento } from '@api/request/user';
import { createToken } from '@hooks/token';

import { KeyboardAvoidingView, Platform } from 'react-native';
import { createOrigin } from '@hooks/origin';

export default function AuthLoginScren({ navigation, }) {
  const { color, font, margin, } = useTheme()

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const modalPassword = useRef();
  const modalAnonim = useRef();

  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [loading, setloading,] = useState(false);

  const passRef = useRef(null)

  const handleLogin = async () => {
    if (email === '' || password === '') {
      setError('Preencha todos os campos')
      return
    }
    else {
      setloading(true)
      try {
        const res = await loginUser(email, password)
        console.log(res)
        if (res.token) {
          await createToken(res.token)
          setSuccess('Logado com sucesso!')
          setTimeout(() => {
            navigation.replace('Tabs')
          }, 2000);
        } else {
          setSuccess('Email não verificado!')
          setTimeout(() => {
            navigation.navigate('ConfirmEmail', { email: email })
          }, 2000);
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setloading(false)
      }
    }
  }

  const [loadingAnonimo, setloadingAnonimo] = useState(false);
  const [successAnonimo, setSuccessAnonimo] = useState();
  const [errorAnonimo, setErrorAnonimo] = useState();
  const handleAnonimo = async () => {
    setloadingAnonimo(true)
    try {
      const res = await verifyEstabelecimento(email)
      setSuccessAnonimo(res.message)
      await createOrigin(email)
      setTimeout(() => {
        navigation.navigate('AnonimoNota')
      }, 1500);

    } catch (error) {
      setErrorAnonimo(error.message)
      console.log(error)
    } finally {
      setloadingAnonimo(false)
    }
  }

  return (

    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'height' : 'height'} style={{ flex: 1, }} >
      <Main >
        <Scroll>
          <Column ph={margin.h} >
            <HeaderLogo />
            <Column style={{ height: 12, }} />
            <HeadTitle size={42}>Entrar</HeadTitle>
            <Label>Entre em nossa comunidade e veja o que estamos fazendo agora!</Label>

            <Column style={{ rowGap: 14, marginTop: 14, }}>
              <Input
                label="E-mail *"
                placeholder="Email"
                value={email}
                onSubmitEditing={() => { passRef.current?.focus() }}
                setValue={setemail}
                keyboard="email-address"
              />

              <Input
                label="Senha *"
                placeholder="Senha"
                value={password}
                setValue={setpassword}
                ref={passRef}
                pass={true}
                onSubmitEditing={handleLogin}
              />
            </Column>

            <Button style={{ justifyContent: 'center', alignItems: 'center', marginTop: 12, alignSelf: 'flex-end', }} onPress={() => { navigation.navigate('ForgotPassword') }} >
              <Label align="center"><U>Recuperar senha</U></Label>
            </Button>

            {success ? <Success msg={success} /> : error ? <Error msg={error} /> : null}

            <Column style={{ height: 20, }} />

            <Button radius={100} bg={color.pr} pv={14} ph={20} onPress={handleLogin}>
              <Row style={{ alignItems: 'center', justifyContent: 'space-between', }}>
                <LabelBT size={24} color="#fff" align="center" style={{ marginLeft: 94, }}>Entrar</LabelBT>
                <Column style={{ width: 64, height: 64, marginRight: -12, marginTop: -6, marginBottom: -6, backgroundColor: '#FAC423', borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                  {loading ? <Loader color="#fff" size={32} /> : <ArrowRight size={28} color="#fff" />}
                </Column>
              </Row>
            </Button>
            <Title align="center" style={{ marginVertical: 20, }}>ou</Title>
            <Button radius={100} bg="#AB7C8380" pv={14} ph={20} onPress={() => { navigation.navigate('AuthRegister') }} >
              <Row style={{ alignItems: 'center', justifyContent: 'space-between', }}>
                <LabelBT size={24} color={color.sc} align="center" style={{ marginLeft: 44, }}>Criar conta</LabelBT>
                <Column style={{ width: 64, height: 64, marginRight: -12, marginTop: -6, marginBottom: -6, backgroundColor: color.sc, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                  <UserPlus size={28} color="#fff" />
                </Column>
              </Row>
            </Button>

            <Button onPress={() => { modalAnonim.current?.expand() }} bg={color.sc + 20} style={{ marginTop: 30, alignSelf: 'center', paddingHorizontal: 24, marginBottom: -30, }}>
              <LabelBT>Entrar como estabelecimento</LabelBT>
            </Button>
            <Image source={require('@imgs/pata.png')} style={{ width: 430, height: 100, objectFit: 'contain', marginLeft: -40, marginTop: 50, }} />
            <Column style={{ height: 20, }} />
          </Column>
        </Scroll>


       

        <Modal ref={modalAnonim} snapPoints={[0.1, 400]}>
          <Column>

            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, }}>
              <Column style={{ width: 300, }}>
                <Title>Preencha o email</Title>
                <Label>Confirme o email do estabelecimento</Label>
              </Column>
              <Button onPress={() => { modalAnonim?.current?.close() }} style={{ width: 48, position: 'absolute', right: 0, top: 0, justifyContent: 'center', alignItems: 'center', height: 48, borderRadius: 100, backgroundColor: color.sc, }}>
                <X size={24} color='#fff' />
              </Button>
            </Row>
            <Column mh={20} mv={12}>
              <Input
                label="Email"
                value={email}
                setValue={setemail}
              />
              <Column style={{ height: 12, }} />

              {successAnonimo ? <Success msg={successAnonimo} /> : errorAnonimo ? <Error msg={errorAnonimo} /> : null}

              <ButtonPrimary loading={loadingAnonimo} label='Verificar' onPress={handleAnonimo} />
            </Column>
          </Column>
        </Modal>

      </Main>
    </KeyboardAvoidingView>
  )
}


