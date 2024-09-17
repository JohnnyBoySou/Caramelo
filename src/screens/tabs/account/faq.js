import React, { useContext, useEffect, useState } from 'react';
import { Main, Scroll, Title, Row, Column, HeadTitle, Label, Image, Button, ButtonPrimary } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import { AtSign, HandHeart, HeartHandshake, Newspaper, Pencil, Upload } from 'lucide-react-native';
import { useAnimationState, MotiView } from 'moti';

import { Header } from '@components/Header';

export default function FAQScreen({ navigation, }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [data, setdata] = useState([
        {
            "p": "O que é o Instituto Caramelo?",
            "r": "Fundado em 2015, o Instituto Caramelo atua no resgate, tratamento e adoção de animais feridos ou em situação de risco. Mantemos um abrigo com cerca de 300 animais que recebem cuidado integral até serem adotados."
        },
        {
            "p": "Onde fica o Instituto Caramelo?",
            "r": "O Instituto está localizado em Ribeirão Pires, na região metropolitana, em um terreno de 27.000 metros quadrados, com infraestrutura completa para cuidar dos animais."
        },
        {
            "p": "Quantos animais o Instituto Caramelo abriga atualmente?",
            "r": "Atualmente, o Instituto Caramelo abriga cerca de 300 animais, entre cães e gatos, todos resgatados das ruas e em recuperação para adoção."
        },
        {
            "p": "Como posso adotar um animal do Instituto Caramelo?",
            "r": "Você pode adotar um animal visitando o nosso abrigo ou através do nosso site, onde disponibilizamos informações e fotos dos animais disponíveis para adoção."
        },
        {
            "p": "Quais são os custos de manter o Instituto Caramelo?",
            "r": "São necessários cerca de 300 mil reais por mês para manter o abrigo funcionando, e esse valor é arrecadado por meio de doações, parcerias e vendas na nossa loja."
        },
        {
            "p": "Como posso ajudar o Instituto Caramelo?",
            "r": "Você pode nos ajudar por meio de doações financeiras, doação de itens para os animais, voluntariado ou comprando produtos na nossa loja online."
        },
        {
            "p": "O Instituto oferece atendimento veterinário?",
            "r": "Sim, temos um centro cirúrgico e atendimento veterinário 24 horas para os animais resgatados, além de um núcleo de fisioterapia e adestramento psicológico."
        },
        {
            "p": "Como funciona o processo de resgate dos animais?",
            "r": "Resgatamos animais feridos ou em situação de risco, tratamos suas condições físicas e emocionais, e os preparamos para adoção com cuidados veterinários e psicológicos."
        },
        {
            "p": "Posso visitar o abrigo do Instituto Caramelo?",
            "r": "Sim, é possível agendar visitas ao nosso abrigo para conhecer os animais e a estrutura. Entre em contato conosco para marcar uma visita."
        },
        {
            "p": "Como os animais são cuidados no abrigo?",
            "r": "Os animais são alimentados, protegidos e recebem cuidados veterinários, além de terem acesso a áreas de soltura, adestramento psicológico e fisioterapia para se recuperarem totalmente."
        }
    ]
    );

    return (
        <Main>
            <Scroll>
                <Column style={{ marginHorizontal: margin.h, marginVertical: 20, }}>
                    <Header title="FAQ" />
                    <Title style={{ marginVertical: 20, }}>Dúvidas frequentes</Title>
                    <Column style={{ rowGap: 12, }}>
                        {data.map((item, index) => (
                            <Card key={index} question={item.p} answer={item.r} />
                        ))}
                    </Column>
                </Column>
            </Scroll>
        </Main>
    );
}

const Card = ({ question, answer }) => {
    const [expanded, setExpanded] = useState(false);

    const animationState = useAnimationState({
        closed: {
            height: 60,
        },
        open: {
            height: 'auto',
        },
    });

    const toggleExpanded = () => {
        setExpanded(!expanded);
        animationState.transitionTo(expanded ? 'closed' : 'open');
    };

    return (
        <Button onPress={toggleExpanded} ph={1} pv={1} mv={1} mh={1} radius={1}>
            <MotiView
                state={animationState}
                transition={{
                    type: 'timing',
                    duration: 300,
                }}
                style={{
                    overflow: 'hidden',
                    padding: 10,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 10,
                }}
            >

                <Row>
                    <Title size={18} >
                        {question}
                    </Title>
                </Row>
                {expanded && <Label style={{ marginBottom: 10, marginTop: 10, lineHeight: 18, }} size={14}>{answer}</Label>}
            </MotiView>
        </Button>
    )
}