import React, { useState, useRef } from 'react';
import { Column, Title, Main, Row, Label, Button, C, LabelBT, Image, SCREEN_WIDTH, useTheme, Scroll } from '@theme/global';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import { AnimatePresence, MotiImage, MotiView, } from 'moti';
import { Animated, ScrollView } from 'react-native'
import { ExpandingDot } from "react-native-animated-pagination-dots";
import { useNavigation } from '@react-navigation/native';

export default function OnboardingPage({ navigation, route, }) {
    const { color, font } = useTheme()

    const pagerRef = useRef();


    const data = [
        {
            img: require('@imgs/onb1.png'),
            title: 'Bem-vindo ao Instituto Caramelo!',
            desc: 'Estamos felizes em ter você aqui! Junte-se a nós na missão de proteger e cuidar dos animais. Explore o app e descubra como sua participação pode fazer a diferença!',
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
            next: true,
        },
    ]
    /*
        {
            img: require('@imgs/onb2.png'),
            title: 'Faça a sua doação direto pelo App!',
            desc: 'Contribua para o bem-estar dos animais com apenas alguns cliques. Sua doação ajuda a transformar vidas e garantir cuidados essenciais para os nossos peludos. Juntos, podemos fazer a diferença!',
        },
      */

    const [currentIndex, setCurrentIndex] = useState(0); // Índice atual
    const scrollX = React.useRef(new Animated.Value(0)).current;

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        {
            useNativeDriver: false,
            listener: (event) => {
                const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
                setCurrentIndex(index);
            }
        }
    );

    const goToNext = () => {
        if (currentIndex < data.length - 1) {
            pagerRef.current.scrollTo({ x: (currentIndex + 1) * SCREEN_WIDTH, animated: true });
        }
    };

    const goToPrevius = () => {
        if (currentIndex > 0) {
            pagerRef.current.scrollTo({ x: (currentIndex - 1) * SCREEN_WIDTH, animated: true });
        }
    };

    return (
        <Main style={{}}>
            <Scroll>

            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 24, marginVertical: 12, }}>
                <Image source={require('@imgs/logo_h.png')} style={{ width: 130, height: 40, }} />
                <Button onPress={() => { navigation.goBack() }} pv={0} ph={0} style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }} bg={color.sc.sc3}>
                    <ArrowLeft size={20} color="#fff" />
                </Button>

                <ExpandingDot
                    data={data}
                    expandingDotWidth={30}
                    activeDotColor={color.sc}
                    inActiveDotColor={color.sc+90}
                    scrollX={scrollX}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 5
                    }}
                    containerStyle={{
                        position: 'relative',
                        paddingVertical: 12,
                        top: 0,
                        borderRadius: 100,
                        paddingHorizontal: 12,
                        backgroundColor: color.sc+10,
                    }}
                />

            </Row>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1, }} ref={pagerRef} pagingEnabled onScroll={handleScroll}>
                {data.map((item, index) => (
                    <Card item={item} color={color} goToNext={goToNext} goToPrevius={goToPrevius} numberOfDots={data?.length} />
                ))}
            </ScrollView>

            </Scroll>

        </Main>
    )
}

const Card = ({ item, goToNext, goToPrevius }) => {
    const { color, font } = useTheme()
    const navigation = useNavigation()

    return (
        <Column style={{ paddingVertical: 12, paddingHorizontal: 24, width: SCREEN_WIDTH, }}>
            <MotiImage from={{ opacity: 0, scale: 0, rotate: '-12deg' }} animate={{ opacity: 1, scale: 1, rotate: '0deg' }} source={item?.img} style={{ width: '100%', height: 380, objectFit: 'cover', borderRadius: 24, }} />
            <Title style={{ letterSpacing: -1, fontSize: 28, lineHeight: 32, marginTop: 12, marginBottom: 10, }}>{item?.title}</Title>
            <Label style={{ fontFamily: 'Font_Light' }}>{item?.desc}</Label>
            <Row style={{ marginBottom: 20, zIndex: 99, marginTop: 20, justifyContent: 'space-between', }}>
                <AnimatePresence>
                    <MotiView from={{ opacity: 0, scale: 0, }} animate={{ opacity: 1, scale: 1, }} exit={{ opacity: 0, scale: 0, }} transition={{ type: 'timing' }}>
                        <Button onPress={goToPrevius} ph={32} style={{ height: 54, borderRadius: 100, backgroundColor: color.sc + 20, justifyContent: 'center', alignItems: 'center', }}>
                            <LabelBT color={color.sc}>Voltar</LabelBT>
                        </Button>
                    </MotiView>
                </AnimatePresence>
                <AnimatePresence>
                    {item?.next ?
                        <MotiView from={{ opacity: 0, scale: 0, }} animate={{ opacity: 1, scale: 1, }} exit={{ opacity: 0, scale: 0, }} transition={{ type: 'timing' }}>
                            <Button onPress={() => navigation.navigate('AuthLogin')} ph={32} style={{ height: 54, borderRadius: 100, backgroundColor: color.sc, justifyContent: 'center', alignItems: 'center', }}>
                                <LabelBT color="#fff">Continuar</LabelBT>
                            </Button>
                        </MotiView>
                        :
                        <MotiView from={{ opacity: 0, scale: 0, }} animate={{ opacity: 1, scale: 1, }} exit={{ opacity: 0, scale: 0, }} transition={{ type: 'timing' }}>
                            <Button onPress={goToNext} ph={32} style={{ height: 54, borderRadius: 100, backgroundColor: color.sc, justifyContent: 'center', alignItems: 'center', }}>
                                <LabelBT color="#fff">Próximo</LabelBT>
                            </Button>
                        </MotiView>
                    }
                </AnimatePresence>
            </Row>
        </Column>
    )
}
