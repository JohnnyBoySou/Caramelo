import React, { useState, useRef, useEffect } from 'react';
import { Main, Scroll, Column, Row, Button, useTheme, Title, Label, Image, LabelBT } from '@theme/global';
import { Heart, MessageCircle, Search, Send } from 'lucide-react-native';

import PagerView from 'react-native-pager-view';
import Animated, { useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';
import { FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Skeleton } from 'moti/skeleton';
export default function BlogScreen({ navigation, route }) {
    const { color, font, margin } = useTheme();

    const [destaque, setdestaque] = useState({
        imgs: ['https://i.pinimg.com/564x/a4/fd/b2/a4fdb25d1b4b63415423ec8440f7c884.jpg', 'https://i.pinimg.com/564x/40/e1/d2/40e1d24a3bfd76fb441c2335229503c3.jpg', 'https://i.pinimg.com/564x/9c/cd/ea/9ccdea1580bd0add9bafa75bc920e90c.jpg'],
        title: 'Mais de 550 animais resgatados!',
        desc: 'Atingimos um novo marco em nosso instituto, alcançamos 550 animais em nosso canil!',
        likes: 32,
        comments: 12,
        id: 1,
    });
    const [recentes, setrecentes] = useState([
        {
            id: 1,
            title: 'Mais de 550 animais resgatados!',
            categories: ['Resgate', 'Adoção'],
            date: 'há 2 dias',
            img: 'https://i.pinimg.com/564x/00/e8/de/00e8de172206673e7f1d53917ee78835.jpg'
        },
        {
            id: 2,
            title: 'Mais de 550 animais resgatados!',
            categories: ['Resgate', 'Adoção'],
            date: 'há 3 dias',
            img: 'https://i.pinimg.com/564x/79/d1/0a/79d10aa540504de8bb11fb0e12c56295.jpg'
        },
        {
            id: 3,
            title: 'Mais de 550 animais resgatados!',
            categories: ['Resgate', 'Adoção'],
            date: 'há 1 semana',
            img: 'https://i.pinimg.com/564x/9c/32/7e/9c327ea4d95b89d230c10fc1588a88cb.jpg'
        },
        {
            id: 4,
            title: 'Mais de 550 animais resgatados!',
            categories: ['Resgate', 'Adoção'],
            date: 'há 2 dias',
            img: 'https://i.pinimg.com/736x/41/5d/82/415d820a90cec9779bfa73fe57596711.jpg'
        },
        {
            id: 5,
            title: 'Mais de 550 animais resgatados!',
            categories: ['Resgate', 'Adoção'],
            date: 'há 3 dias',
            img: 'https://i.pinimg.com/564x/20/f0/f3/20f0f3148da5c022d19e93e230a5ab5f.jpg'
        },
        {
            id: 6,
            title: 'Mais de 550 animais resgatados!',
            categories: ['Resgate', 'Adoção'],
            date: 'há 1 semana',
            img: 'https://i.pinimg.com/564x/0e/d9/22/0ed922bf60e63bc9cfe715a62b7bfccf.jpg'
        },
        {
            id: 7,
            title: 'Mais de 550 animais resgatados!',
            categories: ['Resgate', 'Adoção'],
            date: 'há 2 dias',
            img: 'https://i.pinimg.com/564x/2e/a0/48/2ea048b875052b305d3a67a035bc6ba3.jpg'
        },
        {
            id: 8,
            title: 'Mais de 550 animais resgatados!',
            categories: ['Resgate', 'Adoção'],
            date: 'há 3 dias',
            img: 'https://i.pinimg.com/564x/2a/72/58/2a725871bf962e2a574156efe3e9d097.jpg'
        },
        {
            id: 9,
            title: 'Mais de 550 animais resgatados!',
            categories: ['Resgate', 'Adoção'],
            date: 'há 1 semana',
            img: 'https://i.pinimg.com/564x/0f/a6/22/0fa622e2c927b0b031880f7303e0ae0c.jpg'
        },
    ]
    );

    const [loading, setloading] = useState(true);
    const isFocused = useIsFocused();
    useEffect(() => {
        const fetchData = () => {
            setloading(true)
            try {
                
            } catch (error) {
                
            } finally{
                setTimeout(() => {
                    setloading(false)
                }, 3000);
            }
        }

        fetchData()

    },[isFocused])
   // if(loading){return <SkeletonBody />}
    return (
        <Main>
            <Scroll>
                <Column style={{ marginHorizontal: margin.h, marginVertical: 20, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Image source={require('@imgs/logo_h.png')} style={{ width: 200, height: 52, marginLeft: -12, borderRadius: 50, alignSelf: 'center', }} />
                        <Column style={{ width: 64, height: 64, backgroundColor: '#EFE7E8', justifyContent: 'center', alignItems: 'center', borderRadius: 100, }}>
                            <Button onPress={() => { navigation.navigate('BlogSearch') }} bg={color.sc} style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }}>
                                <Search size={18} color='#fff' />
                            </Button>
                        </Column>
                    </Row>
                </Column>

                <Column style={{ marginVertical: 8, }}>
                    <Title style={{ marginHorizontal: margin.h, letterSpacing: -.7, }}>Em destaque</Title>
                    <Button pv={1} ph={1} radius={2} onPress={() => { navigation.navigate('BlogSingle', { id: destaque?.id }) }} >
                        <>
                            <Carrousel imgs={destaque?.imgs} />
                            <Column style={{ marginHorizontal: margin.h, }}>
                                <Title size={20} style={{ letterSpacing: -.7, }}>{destaque?.title}</Title>
                                <Label style={{ fontSize: 15, fontFamily: font.light, marginTop: 6, }}>{destaque?.desc}</Label>
                                <Row style={{ columnGap: 12, marginVertical: 12, }}>
                                    <Button bg="#F2EDED">
                                        <Row style={{ justifyContent: 'center', alignItems: 'center', columnGap: 6, }}>
                                            <Heart size={16} color={color.sc} />
                                            <Label size={12} style={{ lineHeight: 14, }}>{destaque?.likes} curtidas </Label>
                                        </Row>
                                    </Button>
                                    <Button bg="#F2EDED">
                                        <Row style={{ justifyContent: 'center', alignItems: 'center', columnGap: 6, }}>
                                            <MessageCircle size={16} color={color.sc} />
                                            <Label size={12} style={{ lineHeight: 14, }}>{destaque?.comments} comentários </Label>
                                        </Row>
                                    </Button>
                                    <Button bg="#F2EDED">
                                        <Row style={{ justifyContent: 'center', alignItems: 'center', columnGap: 6, }}>
                                            <Send size={16} color={color.sc} />
                                            <Label size={12} style={{ lineHeight: 14, }}>Enviar</Label>
                                        </Row>
                                    </Button>
                                </Row>
                            </Column>
                        </>
                    </Button>
                </Column>

                <Column style={{ flexGrow: 1, height: 1, backgroundColor: '#f1f1f1', }} />

                <Column style={{ marginHorizontal: margin.h, marginVertical: margin.v, }}>
                    <Title style={{ letterSpacing: -.7, }}>Recentes</Title>
                    <ListPosts data={recentes} navigation={navigation} />
                    <Column style={{ height: 120, }}></Column>
                </Column>
            </Scroll>
        </Main>
    )
}

export const Carrousel = ({ imgs }) => {
    const { color, margin } = useTheme();
    const pagerRef = useRef();
    const handleScreen = (position) => {
        pagerRef.current.setPage(position);
        setCurrentIndex(position);
    }
    const [currentIndex, setCurrentIndex] = useState(0);
    return (
        <Column style={{ height: 242, marginVertical: 14, }}>
            <PagerView style={{ flex: 1, }} initialPage={0} ref={pagerRef} onPageSelected={(event) => { handleScreen(event.nativeEvent.position) }}>
                {imgs?.map((item, index) => (
                    <Image key={index} source={{ uri: item }} style={{ flexGrow: 1, objectFit: 'cover', marginHorizontal: margin.h, borderRadius: 18, height: 242, }} />))}
            </PagerView>
            <Column style={{ position: 'absolute', bottom: 15, right: 40, }}>
                <PaginationDots
                    index={currentIndex}
                    numberOfDots={imgs?.length}
                    activityColor={color.sc}
                    disableColor="#ddd" />
            </Column>
        </Column>
    )
}

export const ListPosts = ({ data, navigation }) => {
    const { color, font, margin } = useTheme()
    const Post = ({ item }) => {
        return (
            <Button pv={1} ph={1} radius={2} onPress={() => { navigation.navigate('BlogSingle', { id: item.id, }) }} >
                <Row>
                    <Image source={{ uri: item?.img }} style={{ width: 84, height: 84, borderRadius: 12, }} />
                    <Column style={{ width: '70%', justifyContent: 'center', marginLeft: 12, }}>
                        <Title size={16} style={{ lineHeight: 16, fontFamily: 'Font_Bold', }}>{item?.title}</Title>
                        <Row style={{ marginTop: 8, justifyContent: 'space-between', alignItems: 'center', }}>
                            <Label size={14}>{item?.categories.join(', ')}</Label>
                            <Label size={14}>{item?.date}</Label>
                        </Row>
                    </Column>
                </Row>
            </Button>
        )
    }

    const [type, settype] = useState();

    const cats = ['Resgate', 'Adoação', 'Saúde Pet', 'Veterinária', 'Reabilitação'];
    return (
        <Column>
            <Row style={{ flexWrap: 'wrap', columnGap: 10, rowGap: 8, marginTop: 12, }}>
                {cats.map((item, index) => (
                    <Button pv={4} ph={12} bg={type == item ? color.sc : "#F2EDED"} onPress={() => { settype(item) }} >
                        <LabelBT size={14} style={{ fontFamily: font.medium, }} color={type == item ? '#fff' : color.title}>{item}</LabelBT>
                    </Button>
                ))}
            </Row>
            <Column style={{ height: 1, backgroundColor: '#f1f1f1', marginVertical: 12, }} />
            <FlatList
                data={data}
                renderItem={({ item }) => <Post item={item} />}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <Column style={{ height: 1, backgroundColor: '#f1f1f1', marginVertical: 15, }} />}
            />

        </Column>
    )
}

const PaginationDots = ({ index, numberOfDots, activityColor, disableColor }) => {
    const dotStyle = (dotIndex) => {
        return useAnimatedStyle(() => {
            const width = withTiming(index === dotIndex ? 35 : 14, { duration: 300 });
            const backgroundColor = interpolateColor(
                index === dotIndex ? 1 : 0,
                [0, 1],
                [disableColor, activityColor]
            );

            return {
                backgroundColor,
                width,
            };
        });
    };

    return (
        <Row style={{ backgroundColor: '#F1F1F130', paddingVertical: 4, paddingHorizontal: 2, borderRadius: 100 }}>
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


const SkeletonBody = () => {

    return(
    <Column mh={24} mv={50}>
        <Row style={{ justifyContent: 'space-between', marginBottom: 20, alignItems: 'center',  }}>
            <Skeleton width={200} height={72} radius={12} colorMode="light"/>
            <Skeleton width={72} height={72} radius={120} colorMode="light"/>
        </Row>
        <Skeleton width={200} height={52} radius={12} colorMode="light"/>
        <Column style={{height: 12, }} />
        <Skeleton width={120} height={120} colorMode="light"/>
        <Column style={{height: 12, }} />
        <Skeleton width={120} height={120} colorMode="light"/>
        <Column style={{height: 12, }} />
        <Skeleton width={120} height={120} colorMode="light"/>
    
    </Column>
)}