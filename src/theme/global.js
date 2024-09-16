<<<<<<< HEAD
import { useContext } from "react";
import styled, { ThemeContext } from 'styled-components/native';
import { TouchableRipple } from 'react-native-paper';
import { Dimensions, ScrollView, Image as RNImage, ActivityIndicator } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from 'lucide-react-native';


export function Back() {
  const navigation = useNavigation();
  return (
    <Button onPress={() => { navigation.goBack() }} pv={0} ph={0} style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }} bg='#FFFFFF'>
      <ArrowLeft size={20} color='#858585' />
    </Button>
  )
}

export function ButtonPrimary({ login = false, type = 'Default', label, pv = 12, ph = 20, fontStyle, size = 18, onPress, ...props }) {
  const { color, } = useTheme();
  const bg = type === 'Default' ? '#918C8B' : type === 'Light' ? '#ECEBEB' : '#202020';
  const text = type === 'Default' ? color.light : type === 'Light' ? '#434343' : '#fff';
  return (
    <Button {...props} onPress={onPress} pv={pv} ph={ph} style={{ justifyContent: 'center', alignItems: 'center', }} bg={bg} >
      <Row>
        <SubLabel style={{ fontSize: size, color: text, }}>{label}</SubLabel>
      </Row>
    </Button>
  )
}

export const Loader = ({ color = '#91A6C4', size = 20 }) => {
  return (
    <ActivityIndicator
      color={color}
      size={size} />
  )
}
//UTILS
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
export const useTheme = () => {
  const { color, font, margin } = useContext(ThemeContext);
  return { color, font, margin };
}

export const useNavigate = () => {
  const navigation = useNavigation();
  return navigation
}
=======
import styled from 'styled-components/native';
import { TouchableRipple } from 'react-native-paper';
>>>>>>> eb283ca2ee311dea721185daac937a3448434ae9

//COMPONENTES DE LAYOUT
export const Main = styled.SafeAreaView`
  flex: 1;
  padding-top: 36;
  background-color: ${props => props.bg || props.theme.background};
`
export const Scroll = styled(ScrollView).attrs(() => ({
  showVerticalScrollIndicator: false,
  showHorizontalScrollIndicator: false,
}))`
`

export const Row = styled.View`
  flex-direction: row;
  display: flex;
<<<<<<< HEAD
  padding-vertical: ${props => props.pv || 0}px;
  padding-horizontal: ${props => props.ph || 0}px;
  margin-vertical: ${props => props.mv || 0}px;
  margin-horizontal: ${props => props.mh || 0}px;
=======
  padding-vertical: ${props => props.pv || 12}px;
  padding-horizontal: ${props => props.ph || 20}px;
  margin-top: ${props => props.mtop || 0}px;
  margin-bottom: ${props => props.mbottom || 0}px;
  margin-left: ${props => props.mleft || 0}px;
  margin-right: ${props => props.mright || 0}px;
>>>>>>> eb283ca2ee311dea721185daac937a3448434ae9
`
export const Column = styled.View`
  flex-direction: column;
  display: flex;
<<<<<<< HEAD
  background-color: ${props => props.bg || 'transparent'};
  padding-vertical: ${props => props.pv || 0}px;
  padding-horizontal: ${props => props.ph || 0}px;
  margin-vertical: ${props => props.mv || 0}px;
  margin-horizontal: ${props => props.mh || 0}px;
=======
  padding-vertical: ${props => props.pv || 0}px;
  padding-horizontal: ${props => props.ph || 0}px;
  margin-top: ${props => props.mtop || 0}px;
  margin-bottom: ${props => props.mbottom || 0}px;
  margin-left: ${props => props.mleft || 0}px;
  margin-right: ${props => props.mright || 0}px;
>>>>>>> eb283ca2ee311dea721185daac937a3448434ae9
`

export const Card = styled.View`
  flex-direction: column;
  display: flex;
  border-radius: 20px;
  background-color: #ffffff;
  padding-horizontal: 24; 
  padding-vertical: 20px; 
`

//COMPONENTES DE UTILIDADE
<<<<<<< HEAD

export const Image = styled(RNImage).attrs(() => ({
  transition: 300,
}))`
background-color: ${props => props.bg || 'transparent'}
`

export const Button = styled(TouchableRipple).attrs(() => ({
  borderless: true,
  rippleColor: "#FFFFFF90",
}))`
  background-color: ${props => props.bg || 'transparent'};
  border-radius: ${props => props.radius || 100}px; 
  ${props => props.ph ? 'padding-horizontal: ' + props.ph + 'px;' : 'padding-horizontal: 20px;'}
  ${props => props.pv ? 'padding-vertical: ' + props.pv + 'px;' : 'padding-vertical: 12px;'}
  ${props => props.mh ? 'margin-horizontal: ' + props.mh + 'px;' : ''}
  ${props => props.mv ? 'margin-vertical: ' + props.mv + 'px;' : ''}
  ${props => props.mtop ? 'margin-top: ' + props.mtop + 'px;' : ''}
  ${props => props.mbottom ? 'margin-bottom: ' + props.mbottom + 'px;' : ''}
  ${props => props.mleft ? 'margin-left: ' + props.mleft + 'px;' : ''}
  ${props => props.mright ? 'margin-right: ' + props.mright + 'px;' : ''}

=======
export const Button =  styled(TouchableRipple).attrs(() => ({
  borderless: true, 
  rippleColor: "#FFFFFF90",
}))`
  background-color: ${props => props.bg || 'transparent'};
  border-radius: ${props => props.radius || 100}px;
  padding-vertical: ${props => props.pv || 12}px;
  padding-horizontal: ${props => props.ph || 20}px;
  margin-top: ${props => props.mtop || 0}px;
  margin-bottom: ${props => props.mbottom || 0}px;
  margin-left: ${props => props.mleft || 0}px;
  margin-right: ${props => props.mright || 0}px;
>>>>>>> eb283ca2ee311dea721185daac937a3448434ae9
`
export const Spacer = ({ height = 16, width = 16, }) => <Column style={{ height, width }} />



//COMPONENTES DE TEXTO
export const Label = styled.Text`
  font-size: ${props => props.size || '16px'};
  color: ${props => props.color || props.theme.color.label};
  font-family: ${props => props.theme.font.book};
  text-align: ${props => props.align || 'left'};
  line-height: ${props => props.lineHeight || props.size || '16px'};
`;
export const LabelBT = styled.Text`
  font-size: ${props => props.size || '18px'};
  color: ${props => props.color || props.theme.color.label};
  font-family: ${props => props.theme.font.bold};
  text-align: ${props => props.align || 'left'};
`;
export const LabelBT = styled.Text`
  font-size: ${props => props.size || '18px'};
  color: ${props => props.color || props.theme.color.label};
  font-family: ${props => props.theme.font.bold};
  letter-spacing: -0.6px;
  text-align: ${props => props.align || 'left'};
`;
export const SubLabel = styled.Text`
  font-size: ${props => props.size || '14px'};
<<<<<<< HEAD
  color: ${props => props.color || props.theme.color.sublabel};
=======
  color: ${props => props.theme.color.sublabel};
>>>>>>> eb283ca2ee311dea721185daac937a3448434ae9
  font-family: ${props => props.theme.font.bold};
  text-align: ${props => props.align || 'left'};
`;
export const Title = styled.Text`
  font-size: ${props => props.size || '20px'};
<<<<<<< HEAD
  color: ${props => props.color || props.theme.color.title};
  font-family: ${props => props.font || props.theme.font.bold};
=======
  color: ${props => props.theme.color.title};
  font-family: ${props => props.theme.font.bold};
>>>>>>> eb283ca2ee311dea721185daac937a3448434ae9
  text-align: ${props => props.align || 'left'};
  line-height: ${props => props.lineHeight || props.size + 3 || '20px'};
`;


//FORMATACAO DE TEXTO
export const C = styled.Text`
  color:  ${props => props.color || props.theme.color.primary};
`;
export const U = styled.Text`
  text-decoration: underline;
`;
export const B = styled.Text`
  font-weight: 300;
  font-family: ${props => props.theme.font.bold};
`;
