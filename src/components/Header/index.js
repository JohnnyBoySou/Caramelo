import { useNavigation, } from "@react-navigation/native"
import { Main, Scroll, Title, Row, Column, Label, Button, useTheme, U, Image, } from '@theme/global';
import { ArrowLeft, CircleCheck, CircleX, HelpCircle, MessageCircleQuestionIcon } from 'lucide-react-native';

const Header = ({ title, help }) => {
    const navigation = useNavigation()
    const { color, font, margin, } = useTheme()

    return (
        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
            <Button onPress={() => { navigation.goBack() }} radius={16} pv={0} ph={0} style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }} bg={color.sc}>
                <ArrowLeft size={24} color="#fff" />
            </Button>
            <Title>{title}</Title>
            <Button onPress={() => { navigation.navigate('FAQ') }} pv={0} ph={0} radius={16} style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }} bg={color.sc.sc3}>
                <HelpCircle size={24} color={color.sc} />
            </Button>
        </Row>
    )
}

const HeaderLogo = ({ }) => {
    const navigation = useNavigation()
    const { color, font, margin, } = useTheme()

    return (
        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
            <Button onPress={() => { navigation.goBack() }} radius={16} pv={0} ph={0} style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }} bg={color.sc}>
                <ArrowLeft size={24} color="#fff" />
            </Button>
            <Image source={require('@imgs/logo_h.png')} style={{ width: 146, height: 52, objectFit: 'cover' }} />
        </Row>
    )
}

const HeaderHistory = ({ title, help }) => {
    const navigation = useNavigation()
    const { color, font, margin, } = useTheme()

    return (
        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
            <Button onPress={() => { navigation.goBack() }} radius={16} pv={0} ph={0} style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }} bg='#fff'>
                <ArrowLeft size={24} color={color.sc} />
            </Button>
            <Title color="#fff">{title}</Title>
            <Image source={require('@imgs/logo_history.png')} style={{ width: 48, height: 48, }}/>
        </Row>
    )
}

export { Header, HeaderLogo, HeaderHistory }; 