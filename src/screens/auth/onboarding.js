import React, { useState, useContext, useRef } from 'react';
import { View, Dimensions } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { Column, Title, Main, Row, Label, Button, C, LabelBT } from '@theme/global';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import { AnimatePresence, MotiImage, MotiView, } from 'moti';

const { width, height } = Dimensions.get('window');
import PagerView from 'react-native-pager-view';

import Animated, { FadeInDown, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

export default function OnboardingPage({ navigation, route, }) {
    const { color, font } = useContext(ThemeContext)

    const pagerRef = useRef();
    const handleScreen = (position) => {
        pagerRef.current.setPage(position);
        setCurrentIndex(position);
        console.log(position)
    }
    const [currentIndex, setCurrentIndex] = useState(0);
    const numberOfDots = 3;

    const goToNext = () => {
        let next = (currentIndex + 1) % numberOfDots;
        setCurrentIndex(next);
        pagerRef.current.setPage(next);
    };


    return (
        <Main style={{}}>
            <Row style={{ position: 'absolute', top: 50, left: 30, right: 30, zIndex: 99, justifyContent: 'space-between', alignItems: 'center', }}>

                <Button onPress={() => { navigation.goBack() }} pv={0} ph={0} style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }} bg={color.sc.sc3}>
                    <ArrowLeft size={20} color="#fff" />
                </Button>
                <Button pv={8} ph={20} bg={color.sc.sc3 + 30} onPress={() => { setCurrentIndex(2); pagerRef.current.setPage(2) }} >
                    <LabelBT color={color.sc.sc3} align="center">Pular</LabelBT>
                </Button>
            </Row>
            <PagerView style={{ flex: 1, }} initialPage={0} ref={pagerRef} onPageSelected={(event) => { handleScreen(event.nativeEvent.position) }}>
                <Screen0 color={color} />
                <Screen1 color={color} />
                <Screen2 color={color} navigation={navigation} />
            </PagerView>
            <Row style={{ marginBottom: 30, width: width, zIndex: 99, paddingHorizontal: 30, justifyContent: 'space-between', }}>
                <PaginationDots
                    index={currentIndex}
                    numberOfDots={numberOfDots}
                    activityColor={color.sc.sc3}
                    disableColor={color.sc.sc3 + 70} />


                {currentIndex == 2 && <Column style={{ width: 54, height: 54, borderRadius: 100, }}>
                </Column>}
                <AnimatePresence>
                    {currentIndex != 2 &&
                        <MotiView from={{ opacity: 0, scale: 0, }} animate={{ opacity: 1, scale: 1, }} exit={{ opacity: 0, scale: 0, }} transition={{ type: 'timing' }}>
                            <Button onPress={goToNext} style={{ width: 54, height: 54, borderRadius: 100, backgroundColor: color.sc.sc1, justifyContent: 'center', alignItems: 'center', }}>
                                <ArrowRight size={28} color="#fff" />
                            </Button>
                        </MotiView>
                    }
                </AnimatePresence>
            </Row>
        </Main>
    )
}
const Screen0 = ({ color }) => {
    return (
        <Column style={{ flex: 1, marginHorizontal: 30, justifyContent: 'center', }}>
            <MotiImage from={{ opacity: 0, scale: 0, rotate: '12deg' }} animate={{ opacity: 1, scale: 1, rotate: '0deg' }} source={require('@imgs/onboarding_1.png')} style={{ width: '100%', height: 400, objectFit: 'contain', }} />
            <Title style={{ letterSpacing: -1, fontSize: 32, lineHeight: 34, textAlign: 'center', }}>A primeira rede {'\n'}social <C color={color.green}>para Pets</C> {'\n'}do Brasil!</Title>
        </Column>

    )
}

const Screen1 = ({ color }) => {
    return (
        <Column style={{ flex: 1, marginHorizontal: 30, justifyContent: 'center', }}>
            <MotiImage from={{ opacity: 0, scale: 0, rotate: '-12deg' }} animate={{ opacity: 1, scale: 1, rotate: '0deg' }} source={require('@imgs/onboarding_2.png')} style={{ width: '100%', height: 400, objectFit: 'contain', }} />
            <Title style={{ letterSpacing: -1, fontSize: 32, lineHeight: 34, textAlign: 'center', }}><C color="#91A6C4">Acompanhe o {'\n'}diário</C> do seu pet {'\n'}e de pets amigos!</Title>
        </Column>
    )
}

const Screen2 = ({ color, navigation }) => {
    return (
        <Column style={{ flex: 1, marginHorizontal: 30, justifyContent: 'center', }}>
            <Animated.Image entering={FadeInDown} source={require('@imgs/onboarding_3.png')} style={{ width: '100%', height: 400, objectFit: 'contain', }} />
            <Title style={{ letterSpacing: -1, fontSize: 28, lineHeight: 32, textAlign: 'center', }}>Monitore a <C color="#E5C8C9">agenda e {'\n'}boletim</C> do seu Pet a qualquer momento!</Title>
            <Label style={{ letterSpacing: -0.5, fontSize: 18, lineHeight: 22, textAlign: 'center', marginTop: 10, }}>Seja bem vindo ao app da Villa Pongo, utilize seu acesso para fazer login</Label>
            <Column style={{ justifyContent: 'center', alignItems: 'center', columnGap: 20, }}>
                <Button onPress={() => { navigation.navigate('AuthLogin') }} mtop={20} ph={50} bg={color.sc.sc3}>
                    <LabelBT color="#fff" align="center">Entrar</LabelBT>
                </Button>
                <Button onPress={() => { navigation.navigate('AuthRegister') }} bg={color.sc.sc3+40} ph={50} radius={100} mtop={12}>
                    <LabelBT color={color.sc.sc3} align="center">Criar conta</LabelBT>
                </Button>
            </Column>
        </Column>
    )
}


const PaginationDots = ({ index, numberOfDots, activityColor, disableColor }) => {
    // Animated styles
    const dotStyle = (dotIndex) => {
        return useAnimatedStyle(() => {

            // Animated width
            const width = withTiming(index === dotIndex ? 45 : 20);

            return {
                backgroundColor: index === dotIndex ? activityColor : disableColor,
                width,
            };
        });
    };

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
        }}>

            {Array.from({ length: numberOfDots }).map((_, dotIndex) => (
                <Animated.View
                    key={dotIndex}
                    style={[{
                        height: 20,
                        borderRadius: 100,
                        margin: 5,
                    }, dotStyle(dotIndex)]}
                />
            ))}
        </View>
    );
};
