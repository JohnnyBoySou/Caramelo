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

export function ButtonPrimary({ login = false, type = 'pr', label, pv = 12, ph = 20, fontStyle, size = 18, onPress, ...props }) {
  const { color, } = useTheme();
  const bg = type === 'pr' ? color.pr : type === 'sc' ? color.sc : '#202020';
  const text = type === 'pr' ? color.sc : type === 'sc' ? '#fff' : '#fff';
  return (
    <Button {...props} onPress={onPress} pv={pv} ph={ph} style={{ justifyContent: 'center', alignItems: 'center', }} bg={bg} radius={16}>
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

//COMPONENTES DE LAYOUT
export const Image = styled(RNImage).attrs(() => ({
  transition: 300,
}))`
background-color: ${props => props.bg || 'transparent'}
`

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
  padding-vertical: ${props => props.pv || 0}px;
  padding-horizontal: ${props => props.ph || 0}px;
  margin-vertical: ${props => props.mv || 0}px;
  margin-horizontal: ${props => props.mh || 0}px;
`
export const Column = styled.View`
  flex-direction: column;
  display: flex;
  background-color: ${props => props.bg || 'transparent'};
  padding-vertical: ${props => props.pv || 0}px;
  padding-horizontal: ${props => props.ph || 0}px;
  margin-vertical: ${props => props.mv || 0}px;
  margin-horizontal: ${props => props.mh || 0}px;
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
export const Button = styled(TouchableRipple).attrs(() => ({
  borderless: true,
  rippleColor: "#FFFFFF90",
}))`
  background-color: ${props => props.bg || 'transparent'};
  border-radius: ${props => props.radius || 100}px;
  padding-vertical: ${props => props.pv || 8}px;
  padding-horizontal: ${props => props.ph || 14}px;
  margin-top: ${props => props.mtop || 0}px;
  margin-bottom: ${props => props.mbottom || 0}px;
  margin-left: ${props => props.mleft || 0}px;
  margin-right: ${props => props.mright || 0}px;
`
export const Spacer = ({ height = 16, width = 16, }) => <Column style={{ height, width }} />



//COMPONENTES DE TEXTO
export const HeadTitle = styled.Text`
  font-size: ${props => props.size || '28px'};
  color: ${props => props.color || props.theme.color.title};
  font-family: ${props => props.theme.font.bold};
  text-align: ${props => props.align || 'left'};
  line-height: ${props => props.lineHeight || props.size + 3 || '36px'};
`;

export const Title = styled.Text`
  font-size: ${props => props.size || '24px'};
  color: ${props => props.color || props.theme.color.title};
  font-family: ${props => props.theme.font.semibold};
  text-align: ${props => props.align || 'left'};
  line-height: ${props => props.lineHeight || props.size + 3 || '28px'};
`;

export const Label = styled.Text`
  font-size: ${props => props.size || '16px'};
  color: ${props => props.color || props.theme.color.label};
  font-family: ${props => props.theme.font.regular};
  text-align: ${props => props.align || 'left'};
  letter-spacing: -.8px;
  line-height: ${props => props.lineHeight || props.size || '20px'};
`;

export const LabelBT = styled.Text`
  font-size: ${props => props.size || '16px'};
  color: ${props => props.color || props.theme.color.label};
  font-family: ${props => props.theme.font.semibold};
  letter-spacing: -0.6px;
  text-align: ${props => props.align || 'center'};
`;



export const SubLabel = styled.Text`
  font-size: ${props => props.size || '14px'};
  color: ${props => props.color || props.theme.color.sublabel};
  font-family: ${props => props.theme.font.bold};
  text-align: ${props => props.align || 'left'};
`;




//FORMATACAO DE TEXTO
export const C = styled.Text`
  color:  ${props => props.color || props.theme.color.pr};
`;
export const U = styled.Text`
  text-decoration: underline;
`;
export const B = styled.Text`
  font-weight: 300;
  font-family: ${props => props.theme.font.bold};
`;
