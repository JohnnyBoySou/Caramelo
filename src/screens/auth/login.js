import React, { useContext, useState, useRef } from 'react';
import { Main, Scroll, Row, Column, Label, Button, Title, U, HeadTitle, LabelBT, SCREEN_HEIGHT, Loader, Image, ButtonPrimary, useTheme } from '@theme/global';
import { ArrowRight, UserPlus, X } from 'lucide-react-native';

import Modal from '@components/Modal/index';
import { HeaderLogo, Header } from '@components/Header';
import { Input, Success, Error } from '@components/Forms/index';
import { loginUser, verifyEstabelecimento, resetPassword, resetPasswordCode, resetPasswordNew } from '@api/request/user';
import { createToken } from '@hooks/token';
import { useNavigation } from '@react-navigation/native';

import { TextInput, KeyboardAvoidingView, Platform } from 'react-native';
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
        }else{
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
        <Column ph={margin.h}>
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

          <Button style={{ justifyContent: 'center', alignItems: 'center', marginTop: 12, alignSelf: 'flex-end', }} onPress={() => { modalPassword.current?.expand() }} >
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


      <Modal ref={modalPassword} snapPoints={[0.1, SCREEN_HEIGHT]}>
        <Column>

          <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, }}>
            <Column>
              <Title>Recuperar senha</Title>
            </Column>
            <Button onPress={() => { modalPassword.current?.close() }} style={{ width: 48, justifyContent: 'center', alignItems: 'center', height: 48, borderRadius: 100, backgroundColor: color.sc, }}>
              <X size={24} color='#fff' />
            </Button>
          </Row>
          <ForgetPassword />
        </Column>
      </Modal>


      <Modal ref={modalAnonim} snapPoints={[0.1, 400]}>
        <Column>

          <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, }}>
            <Column>
              <Title>Preencha o email</Title>
              <Label>Confirme o email do estabelecimento</Label>
            </Column>
            <Button onPress={() => { modalAnonim.current?.close() }} style={{ width: 48, justifyContent: 'center', alignItems: 'center', height: 48, borderRadius: 100, backgroundColor: color.sc, }}>
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




const ForgetPassword = () => {
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


  return (
    <Column mh={20} style={{ rowGap: 16, }}>

      {step == 1 && <Column style={{ rowGap: 16, marginTop: 16, }}>
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
        <Label>Insira o código enviado para o seu e-mail</Label>
        <Row style={{ columnGap: 12, }}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              style={{
                height: 84,
                backgroundColor: color.sc + 20,
                color: color.sc,
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
  )
}