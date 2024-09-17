import React, { useState, useRef } from 'react';
import { Column, Title, Main, Row, Label, Button, C, LabelBT, Image, SCREEN_WIDTH, useTheme } from '@theme/global';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import { AnimatePresence, MotiImage, MotiView, } from 'moti';

import PagerView from 'react-native-pager-view';
import Animated, { FadeInDown, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function OnboardingPage({ navigation, route, }) {
    const { color, font } = useTheme()

    const pagerRef = useRef();
    const handleScreen = (position) => {
        pagerRef.current.setPage(position);
        setCurrentIndex(position);
    }
    const [currentIndex, setCurrentIndex] = useState(0);
    const numberOfDots = 5;

    const goToNext = () => {
        let next = (currentIndex + 1) % numberOfDots;
        setCurrentIndex(next);
        pagerRef.current.setPage(next);
    };

    const goToPrevius = () => {
        if (currentIndex == 0) return;
        let prev = (currentIndex - 1) % numberOfDots;
        setCurrentIndex(prev);
        pagerRef.current.setPage(prev);
    };

    const data = [
        {
            img: require('@imgs/onb1.png'),
            title: 'Bem-vindo ao Instituto Caramelo!',
            desc: 'Estamos felizes em ter você aqui! Junte-se a nós na missão de proteger e cuidar dos animais. Explore o app e descubra como sua participação pode fazer a diferença!',
        },
        {
            img: require('@imgs/onb2.png'),
            title: 'Faça a sua doação direto pelo App!',
            desc: 'Contribua para o bem-estar dos animais com apenas alguns cliques. Sua doação ajuda a transformar vidas e garantir cuidados essenciais para os nossos peludos. Juntos, podemos fazer a diferença!',
        },
        {
            img: require('@imgs/onb3.png'),
            title: 'Acompanhe o que estamos fazendo!',
            desc: 'Fique por dentro das nossas ações e projetos de cuidado animal. Acompanhe de perto nossas iniciativas e veja como estamos transformando vidas, uma patinha de cada vez!',
        },
        {
            img: require('@imgs/onb4.png'),
            title: 'Conheça mais nossa história!',
            desc: 'Saiba mais sobre nossa história, valores e ações em defesa dos animais. Entenda como trabalhamos para garantir um futuro melhor para os peludos e como você pode nos ajudar nessa jornada!',
        },
        {
            img: require('@imgs/onb5.png'),
            title: 'Consulte seu histórico!',
            desc: 'Veja todas as suas contribuições em um só lugar. Acompanhe o impacto das suas doações e mantenha-se informado sobre o envio das suas notas fiscais. Sua generosidade faz a diferença!',
        },
    ]

    return (
        <Main style={{}}>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                <Image source={require('@imgs/logo_h.png')} style={{ width: 130, height: 40, }} />
                <Button onPress={() => { navigation.goBack() }} pv={0} ph={0} style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }} bg={color.sc.sc3}>
                    <ArrowLeft size={20} color="#fff" />
                </Button>
                <PaginationDots
                    index={currentIndex}
                    numberOfDots={numberOfDots}
                    activityColor={color.sc}
                    disableColor="#ddd" />
            </Row>
            <PagerView style={{ flex: 1, }} initialPage={0} ref={pagerRef} onPageSelected={(event) => { handleScreen(event.nativeEvent.position) }}>
                {data.map((item, index) => (
                    <Card item={item} color={color} />
                ))}
            </PagerView>
            <Row style={{ marginBottom: 20, zIndex: 99, paddingHorizontal: 24, justifyContent: 'space-between', }}>
                <AnimatePresence>
                    <MotiView from={{ opacity: 0, scale: 0, }} animate={{ opacity: 1, scale: 1, }} exit={{ opacity: 0, scale: 0, }} transition={{ type: 'timing' }}>
                        <Button onPress={goToPrevius} ph={32} style={{ height: 54, borderRadius: 100, backgroundColor: color.sc + 20, justifyContent: 'center', alignItems: 'center', }}>
                            <LabelBT color={color.sc}>Voltar</LabelBT>
                        </Button>
                    </MotiView>
                </AnimatePresence>
                <AnimatePresence>
                    {currentIndex != 4 &&
                        <MotiView from={{ opacity: 0, scale: 0, }} animate={{ opacity: 1, scale: 1, }} exit={{ opacity: 0, scale: 0, }} transition={{ type: 'timing' }}>
                            <Button onPress={goToNext} ph={32} style={{ height: 54, borderRadius: 100, backgroundColor: color.sc, justifyContent: 'center', alignItems: 'center', }}>
                                <LabelBT color="#fff">Próximo</LabelBT>
                            </Button>
                        </MotiView>
                    }
                    {currentIndex == 4 &&
                        <MotiView from={{ opacity: 0, scale: 0, }} animate={{ opacity: 1, scale: 1, }} exit={{ opacity: 0, scale: 0, }} transition={{ type: 'timing' }}>
                            <Button onPress={() => navigation.navigate('AuthLogin')} ph={32} style={{ height: 54, borderRadius: 100, backgroundColor: color.sc, justifyContent: 'center', alignItems: 'center', }}>
                                <LabelBT color="#fff">Continuar</LabelBT>
                            </Button>
                        </MotiView>
                    }
                </AnimatePresence>
            </Row>
        </Main>
    )
}

const Card = ({ item }) => {
    return (
        <Column style={{ paddingVertical: 12, paddingHorizontal: 24, }}>
            <MotiImage from={{ opacity: 0, scale: 0, rotate: '-12deg' }} animate={{ opacity: 1, scale: 1, rotate: '0deg' }} source={item?.img} style={{ width: '100%', height: 380, objectFit: 'contain', }} />
            <Title style={{ letterSpacing: -1, fontSize: 28, lineHeight: 32, marginTop: 12, marginBottom: 10, }}>{item?.title}</Title>
            <Label style={{ fontFamily: 'Font_Light' }}>{item?.desc}</Label>
        </Column>
    )
}

const PaginationDots = ({ index, numberOfDots, activityColor, disableColor }) => {
    const dotStyle = (dotIndex) => {
        return useAnimatedStyle(() => {
            const width = withTiming(index === dotIndex ? 35 : 14);
            return {
                backgroundColor: index === dotIndex ? activityColor : disableColor,
                width,
            };
        });
    };

    return (
        <Row>
            {Array.from({ length: numberOfDots }).map((_, dotIndex) => (
                <Animated.View
                    key={dotIndex}
                    style={[{
                        height: 14,
                        borderRadius: 100,
                        marginHorizontal: 3,
                    }, dotStyle(dotIndex)]}
                />
            ))}
        </Row>
    );
};
