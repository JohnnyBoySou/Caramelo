import React, { useContext, useState, useRef } from 'react';
import { ThemeContext } from 'styled-components/native';
import { Main, Scroll, Row, Column, Label, Button, Title, U, HeadTitle, LabelBT, SCREEN_HEIGHT, Loader, Image } from '@theme/global';
import { ArrowRight, UserPlus } from 'lucide-react-native';

import Modal from '@components/Modal/index';
import { HeaderLogo, Header } from '@components/Header';
import { Input, Success, Error } from '@components/Forms/index';

export default function AuthLoginScren({ navigation, }) {
  const { color, font, margin, } = useContext(ThemeContext)

  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const modalPassword = useRef();

  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [loading, setloading,] = useState(false);

  const [tel, settel] = useState();
  return (
    <Main >
      <Scroll>
        <HeaderLogo />
        <Column ph={margin.h}>
          <HeadTitle size={42}>Entrar</HeadTitle>
          <Label>Entre em nossa comunidade e veja o que estamos fazendo agora!</Label>

          <Column style={{ rowGap: 14, marginTop: 14, }}>
            <Input
              label="E-mail *"
              placeholder="Email"
              value={email}
              setValue={setemail}
            />

            <Input
              label="Senha *"
              placeholder="Senha"
              value={password}
              setValue={setpassword}
              pass={true}
            />
          </Column>

          <Button style={{ justifyContent: 'center', alignItems: 'center', marginTop: 12, alignSelf: 'flex-end', }} onPress={() => { modalPassword.current?.expand() }} >
            <Label align="center"><U>Recuperar senha</U></Label>
          </Button>

          {success ? <Success msg={success} /> : error ? <Error msg={error} /> : null}

          <Column style={{ height: 20, }} />

          <Button radius={100} bg={color.pr} pv={1} ph={1} onPress={() => {navigation.navigate('Tabs')}} >
            <Row style={{ alignItems: 'center', justifyContent: 'space-between', }}>
              <LabelBT size={24} color="#fff" align="center" style={{ marginLeft: 94, }}>Entrar</LabelBT>
              <Column style={{ width: 64, height: 64, marginRight: -12, marginTop: -6, marginBottom: -6, backgroundColor: '#FAC423', borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                {loading ? <Loader color="#fff" size={32} /> : <ArrowRight size={28} color="#fff" />}
              </Column>
            </Row>
          </Button>
          <Title align="center" style={{ marginVertical: 20, }}>ou</Title>
          <Button radius={100} bg="#AB7C8380" pv={1} ph={1} onPress={() => { navigation.navigate('AuthRegister') }} >
            <Row style={{ alignItems: 'center', justifyContent: 'space-between', }}>
              <LabelBT size={24} color={color.sc} align="center" style={{ marginLeft: 44, }}>Criar conta</LabelBT>
              <Column style={{ width: 64, height: 64, marginRight: -12, marginTop: -6, marginBottom: -6, backgroundColor: color.sc, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                {loading ? <Loader color="#fff" size={32} /> : <UserPlus size={28} color="#fff" />}
              </Column>
            </Row>
          </Button>




          <Image source={require('@imgs/pata.png')} style={{ width: 430, height: 100, objectFit: 'contain', marginLeft: -40, marginTop: 50, }} />
          <Column style={{ height: 20, }} />
        </Column>
      </Scroll>
      <Modal ref={modalPassword} snapPoints={[0.1, SCREEN_HEIGHT]}>
        <Header title="Recuperar senha" />
        <Column ph={24}>
          <Label>Enviaremos um SMS com o código de verificação para o seu telefone.</Label>
          <Column style={{ height: 20, }} />
          <Input
            label="Telefone *"
            placeholder="Telefone"
            value={tel}
            setValue={settel}
          />
        </Column>
      </Modal>
    </Main>
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
      const res = await forgetpassword(email);
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
      const res = await forgetpasswordvalidate(email, code.join(''));
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
      const res = await resetpassword(email, code.join(''), password);
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
    <Column mh={20} style={{ rowGap: 16, }}>

      {step == 1 && <Column style={{ rowGap: 16, }}>
        <Title>Recuperar senha</Title>
        <Label>Preencha seu e-mail </Label>
        <Input
          value={email}
          label="E-mail *"
          keyboard="email-address"
          onSubmitEditing={handleVerify}
          placeholder='Ex.: jonhdoe@mail.com' setValue={setemail} />
        {success ? <Success msg={success} /> : error ? <Error msg={error} /> : null}
        <Button disabled={loading} onPress={handleVerify} bg={color.primary} pv={14} ph={24} style={{ borderRadius: 18 }}>
          <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
            {loading ? <ActivityIndicator size="small" color={color.title} /> :
              <Title size={18} color={color.title} >Enviar</Title>
            }
          </Row>
        </Button>
      </Column>}

      {step == 2 && <Column style={{ rowGap: 16, }}>
        <Title>Confirme seu Código</Title>
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
        <Button disabled={loading} onPress={handleValidate} bg={color.primary} pv={14} ph={24} style={{ borderRadius: 18 }}>
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
        <Button disabled={loading} onPress={handleNewpassword} bg={color.primary} pv={14} ph={24} style={{ borderRadius: 18 }}>
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