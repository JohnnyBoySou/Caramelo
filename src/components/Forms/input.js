import { useRef, useState, useContext, useEffect } from 'react';
import { useAnimationState, MotiText } from 'moti';
import { Column, Label } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Pressable, TextInput } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

<<<<<<< HEAD
const Input = ({ value, setValue, disabled, label, mask, props, onSubmitEditing = () => {}, pass = false }) => {
  const { font, color } = useContext(ThemeContext);
  const [focus, setFocus] = useState(false);
  const inputRef = useRef();
  const [secure, setsecure] = useState(pass);
  const inputAnimation = useAnimationState({
    from: { translateY: 10, fontSize: 18, },
    to: { translateY: 0, fontSize: 14, },
=======
const Input = ({ value, setValue, disabled, label, mask, props }) => {
  const { font, color } = useContext(ThemeContext);
  const [focus, setFocus] = useState(false);
  const inputRef = useRef();

  const inputAnimation = useAnimationState({
    from: { translateY: 12, fontSize: 18, backgroundColor: '#fff', paddingHorizontal: 6 },
    to: { translateY: -12, fontSize: 14, backgroundColor: '#fff', paddingHorizontal: 6 },
>>>>>>> eb283ca2ee311dea721185daac937a3448434ae9
  });

  useEffect(() => {
    if (value?.length > 0) {
      inputAnimation.transitionTo('to');
    } else {
      inputAnimation.transitionTo('from');
    }
  }, []);

  const handleFocus = () => {
    setFocus(true); inputAnimation.transitionTo('to');
  }
  const handleBlur = () => {
    if (!value?.length > 0) {
      inputAnimation.transitionTo('from'); setFocus(false);
    }
    else {
      setFocus(false)
    }
  }

<<<<<<< HEAD
=======
  const applyMask = (text) => {
    if (!mask) return text;

    // Aplica uma máscara de expressão regular (regex) ou função de máscara personalizada
    if (typeof mask === 'string') {
      // Exemplo simples de aplicação de regex
      return text.replace(new RegExp(mask), '');
    } else if (typeof mask === 'function') {
      // Função de máscara personalizada
      return mask(text);
    }

    return text;
  };

>>>>>>> eb283ca2ee311dea721185daac937a3448434ae9
  const handleChangeText = (text) => {
    const { maskFunction, maxLength } = getMaskFunction(mask);
    let maskedText = maskFunction(text);

    if (maxLength && maskedText.length > maxLength) {
      maskedText = maskedText.slice(0, maxLength);
    }

    setValue(maskedText);
  };


  return (
<<<<<<< HEAD
    <Pressable onPress={() => { inputRef.current.focus() }} >

      <Column style={{ borderColor: disabled ? '#f1f1f1' : focus ? color.label : 'transparent', backgroundColor: '#fff', flexGrow: 1, borderWidth: 2, paddingBottom: 8, paddingTop: 24, paddingHorizontal: 16, borderRadius: 12, }}>
        <MotiText
          state={inputAnimation}
          style={{ fontFamily: font.medium, color: color.label, letterSpacing: -0.6, position: 'absolute', top: 6, left: 16, zIndex: 1, }}
          transition={{ type: 'timing', duration: 200 }}
        >
          {label}
        </MotiText>

        <TextInput
          {...props}
          style={{ fontSize: 18, fontFamily: font.medium, color: disabled ? color.title + 60 : color.title, }}
          ref={inputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!disabled}
          onChangeText={handleChangeText}
          value={value}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={secure}
        />

        {pass && <Pressable onPress={() => {setsecure(!secure)}} style={{ position: 'absolute', right: 16, top: 18 }}>
          {secure ? <Eye
            size={24}
            color={color.title}
          /> : <EyeOff 
            size={24}
            color={color.label}
          />}
        </Pressable>}
      </Column>
    </Pressable>
=======
    <Column style={{ borderColor: disabled ? '#f1f1f1' : focus ? color.sc.sc3 : color.sc.sc3 + 50, backgroundColor: '#fff', borderWidth: 2, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 16, }}>
      <MotiText
        state={inputAnimation}
        style={{ fontFamily: font.medium, color: '#788BA4', position: 'absolute', top: 0, left: 12, letterSpacing: -0.6, }}
        transition={{ type: 'timing', duration: 200 }}
      >
        {label}
      </MotiText>

      <TextInput
      {...props}
        style={{ fontSize: 18, fontFamily: font.medium, color: disabled ? color.title + 60 : '#425a7a', }}
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSubmitEditing={() => setFocus(false)}
        editable={!disabled}
        onChangeText={handleChangeText}
        value={value}
      />
    </Column>
>>>>>>> eb283ca2ee311dea721185daac937a3448434ae9
  );
};

export default Input;

const getMaskFunction = (mask) => {
  switch (mask) {
    case 'CPF':
      return { maskFunction: applyCpfMask, maxLength: 14 };
    case 'PHONE':
      return { maskFunction: applyPhoneMask, maxLength: 16 };
<<<<<<< HEAD
    case 'CEP':
      return { maskFunction: applyCepMask, maxLength: 9 };
=======
>>>>>>> eb283ca2ee311dea721185daac937a3448434ae9
    default:
      return { maskFunction: (text) => text, maxLength: undefined };
  }
};

<<<<<<< HEAD
=======
const applyCpfMask = (text) => {
  return text
    .replace(/\D/g, '') // Remove tudo que não é dígito
    .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona um ponto após os três primeiros dígitos
    .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona um ponto após os três próximos dígitos
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona um traço antes dos dois últimos dígitos
};
>>>>>>> eb283ca2ee311dea721185daac937a3448434ae9

const isValidEmail = (text) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(text);
};
<<<<<<< HEAD

function applyCpfMask(value) {
  return value
    .replace(/\D/g, '') // Remove tudo o que não é dígito
    .slice(0, 11) // Limita a 11 dígitos
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígito
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o sexto e o sétimo dígito
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca um hífen entre o nono e o décimo dígito
}

function applyCepMask(value) {
  return value
    .replace(/\D/g, '') // Remove tudo o que não é dígito
    .slice(0, 9) // Limita a 8 dígitos
    .replace(/(\d{5})(\d)/, '$1-$2'); // Coloca um hífen entre o quinto e o sexto dígito
}

function applyPhoneMask(value) {
  return value
    .replace(/\D/g, '') // Remove tudo o que não é dígito
    .slice(0, 11) // Limita a 11 dígitos
    .replace(/(\d{2})(\d)/, '($1) $2') // Coloca parênteses em volta dos dois primeiros dígitos
    .replace(/(\d{5})(\d)/, '$1-$2'); // Coloca um hífen entre o quinto e o sexto dígito
}
=======
const applyPhoneMask = (text) => {
  return text
    .replace(/\D/g, '') // Remove tudo que não é dígito
    .replace(/^(\d{2})(\d)/, '($1) $2') // Adiciona parênteses em volta dos dois primeiros dígitos e um espaço após o próximo dígito
    .replace(/(\d{1})(\d{4})(\d{4})$/, '$1 $2-$3') // Adiciona o espaço após o primeiro dígito do número e o traço antes dos últimos quatro dígitos
};
>>>>>>> eb283ca2ee311dea721185daac937a3448434ae9
