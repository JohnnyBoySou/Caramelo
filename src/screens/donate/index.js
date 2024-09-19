import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, HeadTitle, U, LabelBT, ButtonPrimary } from '@theme/global';
import { Header } from '@components/Header';
import { Delete } from 'lucide-react-native';


export default function DonateValueScreen({ navigation, }) {
    const { color, font, margin, } = useTheme();
    const [value, setvalue] = useState('40');
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    const handleClick = (digit) => {
        if (digit === '0' && value === '0') {
            return
        } else if (value === '0' && digit !== '0') {
            setvalue(digit);
        }
        else {
            setvalue(value + digit);
        }
    }
    const handleDelete = () => {
        if (value.length === 1) {
            setvalue('0');
        } else {
            setvalue(value ? value.slice(0, -1) : '0');
        }
    };
    const handleClean = () => {
        setvalue('0');
    }
    const formatValue = (val) => {
        return parseInt(val).toLocaleString('pt-BR');
    };
    return (
        <Main>
            <Column mh={margin.h}>
                <Header title="Doação" />
                <Column style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 30, }}>
                    <Title>R$</Title>
                    <HeadTitle size={56} style={{ lineHeight: 60, }}><U>{formatValue(value)}</U>,00</HeadTitle>

                    <Row style={{ columnGap: 12, marginVertical: 20, }}>
                        <Button bg='#F8E7E9'  onPress={() => { setvalue('25') }} >
                            <LabelBT color={color.title}>R$ 25,00</LabelBT>
                        </Button>
                        <Button bg='#F8E7E9' onPress={() => { setvalue('40') }} >
                            <LabelBT color={color.title}>R$ 40,00</LabelBT>
                        </Button>
                        <Button bg='#F8E7E9' onPress={() => { setvalue('60') }} >
                            <LabelBT color={color.title}>R$ 60,00</LabelBT>
                        </Button>
                    </Row>
                </Column>

            </Column>
            <Column style={{ flex: 1, borderTopLeftRadius: 24, borderTopRightRadius: 24, alignItems: 'center', marginBottom: -40, paddingBottom: 40,}} bg={color.pr}>

                <Row style={{ flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginVertical: 20, zIndex: 99,}}>
                    {nums.map((num, index) => (
                        <Button style={{ width: '28%', height: '25%', justifyContent: 'center', alignItems: 'center', }} radius={12} onPress={() => { handleClick(`${num}`) }} >
                            <Title size={42} font={font.black}>{num}</Title>
                        </Button>
                    ))}
                    <Button style={{ width: '28%', height: '25%', justifyContent: 'center', alignItems: 'center', }} radius={12}  >
                        <Title size={42} font={font.black}></Title>
                    </Button>
                    <Button style={{ width: '28%', height: '25%', justifyContent: 'center', alignItems: 'center', }} radius={12} onPress={() => { handleClick('0') }} >
                        <Title size={42} font={font.black}>0</Title>
                    </Button>
                    <Button onPress={handleDelete} onLongPress={handleClean} style={{ width: '28%', height: '25%', justifyContent: 'center', alignItems: 'center', }} radius={12} >
                        <Delete size={42} color={color.sc}></Delete>
                    </Button>
                </Row>

                <ButtonPrimary label='Pronto' type='lg' ph={60} onPress={() => {navigation.navigate('DonateType', {value: value,})}} />
                <Column style={{height: 120, }} />
            </Column>
        </Main>
    )
}