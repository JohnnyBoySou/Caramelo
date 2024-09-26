import React, { useState, useRef, useEffect } from 'react';
import { Main, Scroll, Column, Row, Button, useTheme, Title, Label, Image, LabelBT, ButtonPrimary } from '@theme/global';
import { Heart, MessageCircle, Search, Send } from 'lucide-react-native';

import PagerView from 'react-native-pager-view';
import Animated, { useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';

import { FlatList, Linking } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Skeleton } from 'moti/skeleton';

import { listPosts } from '@api/request/blog';
import { MotiImage, MotiView } from 'moti';
import { formatDateTime } from '@hooks/utils';

import { Swiper } from 'rn-swiper-list';
import { MaterialIcons } from '@expo/vector-icons';




export default function BlogScreen({ navigation, route }) {
    const { color, font, margin } = useTheme();

    const [destaque, setdestaque] = useState();
    const [data, setdata] = useState();


    const [loading, setloading] = useState(true);
    const isFocused = useIsFocused();
    useEffect(() => {
        const fetchData = async () => {
            setloading(true)
            try {
                const res = await listPosts()
                setdata(res.data)
                setdestaque(res.data.slice(0, 3))
            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        }
        fetchData()
    }, [isFocused])

    return (
        <Column style={{ paddingTop: 0, backgroundColor: '#fff', }}>
            <Scroll>
                <Column style={{ paddingHorizontal: margin.h, backgroundColor: color.pr, paddingTop: 50, overflow: 'hidden', borderBottomLeftRadius: 32, borderBottomRightRadius: 32,}}>
                    <MotiImage from={{opacity: 0, scale: 0, rotate: '12deg'}} animate={{opacity: 1, scale: 1, rotate: '0deg'}} source={require('@imgs/logo_blog.png')} style={{ width: 200, height: 52, marginBottom: 12, alignSelf: 'center', }} />
                    <Destaque data={destaque} />
                    <Image source={require('@imgs/about3.png')} style={{ width: '120%', zIndex: -2, height: 122, position: 'absolute', bottom: 20, objectFit: 'cover', alignSelf: 'center', }} />
                </Column>
                <Column style={{ marginHorizontal: margin.h, marginVertical: 24, }}>
                    <Title style={{ letterSpacing: -.7, }}>Publicações recentes</Title>
                    <ListPosts data={data} navigation={navigation} />
                    <Column style={{ height: 120, }}></Column>
                </Column>
            </Scroll>
        </Column>



    )
}


const Destaque = ({ data }) => {
    const { color, margin } = useTheme();
    const swipRef = useRef()
    const handleOpen = (item) => {
        Linking.openURL(item)
    }
    const Card = ({ item }) => {
        return (
            <Button pv={1} ph={1} radius={16} onPress={() => { handleOpen(item?.permalink) }} style={{ backgroundColor: '#fff', paddingVertical: 12, }} >
                <>
                    <Column style={{ marginHorizontal: 12, }}>
                        <MotiImage source={{ uri: item?.media_url }} style={{ width: 300, height: 240, marginBottom: 10, borderRadius: 12, objectFit: 'cover', backgroundColor: '#D1D1D1', }} />
                        <Title size={20} style={{ letterSpacing: -.7, }}>{item?.caption?.length > 32 ? item?.caption?.slice(0, 32) + '...' : item?.caption}</Title>
                        <ButtonPrimary label='Ver mais' onPress={() => { handleOpen(item?.permalink) }} />
                    </Column>
                </>
            </Button>
        )
    }
    //<Title style={{ marginHorizontal: margin.h, letterSpacing: -.7, color: '#fff', }}>Em destaque</Title>
    return (
        <MotiView from={{opacity: 0, translateY: 50,}} animate={{opacity: 1, translateY: 0}} >
            <Column style={{ height: 340, marginTop: 10, alignItems: 'center', }}>
                <Swiper
                    ref={swipRef}
                    data={data}
                    renderCard={(item) => <Card item={item} />}
                />

            </Column>
            <MaterialIcons name="swipe" size={24} color={color.sc} style={{ alignSelf: 'center', marginBottom: 20, marginTop: 20, zIndex: -1, }} />
        </MotiView>
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
        const handleOpen = (item) => {
            Linking.openURL(item)
        }
        return (
            <Button pv={1} ph={1} radius={2} onPress={() => { handleOpen(item?.permalink) }} >
                <Row>
                    <MotiImage source={{ uri: item?.media_url }} style={{ width: 84, height: 84, borderRadius: 12, objectFit: 'cover', backgroundColor: '#D1D1D1', }} />
                    <Column style={{ width: '70%', justifyContent: 'center', marginLeft: 12, }}>
                        <Title size={18} style={{ lineHeight: 20, fontFamily: 'Font_Medium', }}>{item?.caption?.length > 38 ? item?.caption?.slice(0, 38) + '...' : item?.caption}</Title>
                        <Label size={14} style={{ lineHeight: 14, marginTop: 4, }}>Publicado em {formatDateTime(item?.timestamp)}</Label>
                    </Column>
                </Row>
            </Button>
        )
    }


    return (
        <Column>

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

    return (
        <Column mh={24} mv={50}>
            <Row style={{ justifyContent: 'space-between', marginBottom: 20, alignItems: 'center', }}>
                <Skeleton width={200} height={72} radius={12} colorMode="light" />
                <Skeleton width={72} height={72} radius={120} colorMode="light" />
            </Row>
            <Skeleton width={200} height={52} radius={12} colorMode="light" />
            <Column style={{ height: 12, }} />
            <Skeleton width={120} height={120} colorMode="light" />
            <Column style={{ height: 12, }} />
            <Skeleton width={120} height={120} colorMode="light" />
            <Column style={{ height: 12, }} />
            <Skeleton width={120} height={120} colorMode="light" />

        </Column>
    )
}




/* 
const [type, settype] = useState();
const cats = ['Resgate', 'Adoação', 'Saúde Pet', 'Veterinária', 'Reabilitação'];

<Row style={{ flexWrap: 'wrap', columnGap: 10, rowGap: 8, marginTop: 12, }}>
            {cats.map((item, index) => (
                <Button pv={4} ph={12} bg={type == item ? color.sc : "#F2EDED"} onPress={() => { settype(item) }} >
                    <LabelBT size={14} style={{ fontFamily: font.medium, }} color={type == item ? '#fff' : color.title}>{item}</LabelBT>
                </Button>
            ))}
        </Row> */