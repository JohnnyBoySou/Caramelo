import React, { useState, useRef, useEffect } from 'react';
import { Main, Scroll, Column, Row, Button, useTheme, Title, Label, Image, LabelBT, ButtonPrimary } from '@theme/global';
import { Heart, MessageCircle, Search, Send } from 'lucide-react-native';

import PagerView from 'react-native-pager-view';
import Animated, { useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';

import { FlatList, Linking } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
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
    useEffect(() => {
        const fetchData = async () => {
            setloading(true)
            try {
                const res = await listPosts()
                setdata(res.data)
                setdestaque(res.data.reverse().slice(0, 8))
            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <Column style={{ paddingTop: 0, backgroundColor: '#fff', }}>
            <Scroll>
                <Column style={{ paddingHorizontal: margin.h, backgroundColor: color.pr, paddingTop: 50, overflow: 'hidden', borderBottomLeftRadius: 32, borderBottomRightRadius: 32, }}>
                    <MotiImage from={{ opacity: 0, scale: 0, rotate: '12deg' }} animate={{ opacity: 1, scale: 1, rotate: '0deg' }} delay={300} source={require('@imgs/logo_blog.png')} style={{ width: 200, height: 52, marginBottom: 12, alignSelf: 'center', }} />
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
    const navigation = useNavigation()
    const handleOpen = (item) => {
        navigation.navigate('BlogSingle', { item: item })
    }
    const Card = ({ item }) => {
        return (
            <Button pv={1} ph={1} radius={16} onPress={() => handleOpen(item)} style={{ backgroundColor: '#fff', paddingVertical: 12, marginBottom: 30, }} >
                <>
                    <Column style={{ marginHorizontal: 12, }}>
                        <MotiImage source={{ uri: item.media_type === 'VIDEO' ? item.thumbnail_url : item?.media_url }} style={{ flexGrow: 1, height: 200, marginBottom: 10, borderRadius: 12, objectFit: 'cover', backgroundColor: '#D1D1D1', }} />
                        <Title size={18} style={{ letterSpacing: -.7, marginBottom: 12, lineHeight: 22, }}>{item?.caption?.length > 54 ? item?.caption?.slice(0, 54) + '...' : item?.caption}</Title>
                        <ButtonPrimary pv={8} label='Ver mais' onPress={() => handleOpen(item)} />
                    </Column>
                </>
            </Button>
        )
    }
    if (!data) {
        return (<Column style={{ marginBottom: 24, alignSelf: 'center', }}>
            <Skeleton width={300} height={200} radius={12} colorMode="light" />
            <Column style={{ height: 12, }} />
            <Skeleton width={300} height={32} radius={6} colorMode="light" />
            <Column style={{ height: 6, }} />
            <Skeleton width={220} height={32} radius={6} colorMode="light" />
            <Column style={{ height: 12, }} />
            <Skeleton width={300} height={52} radius={12} colorMode="light" />
        </Column>)
    }
    return (
        <MotiView from={{ opacity: 0, translateY: 50, }} animate={{ opacity: 1, translateY: 0 }} >
            <Card item={data[0]} />
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
        <Column style={{ height: 202, marginVertical: 14, }}>
            <PagerView style={{ flex: 1, }} initialPage={0} ref={pagerRef} onPageSelected={(event) => { handleScreen(event.nativeEvent.position) }}>
                {imgs?.map((item, index) => (
                    <Image key={index} source={{ uri: item }} style={{ flexGrow: 1, objectFit: 'cover', marginHorizontal: margin.h, borderRadius: 18, height: 202, }} />))}
            </PagerView>
            <Column style={{ position: 'absolute', bottom: 15, zIndex: 99, alignSelf: 'center', }}>
                <PaginationDots
                    index={currentIndex}
                    numberOfDots={imgs?.length}

                    activityColor={color.sc}
                    disableColor={color.sc + 60} />
            </Column>
        </Column>
    )
}

export const ListPosts = ({ data, navigation }) => {
    const Post = ({ item }) => {
        const handleOpen = (item) => {
            navigation.navigate('BlogSingle', { item: item })
        }

        const type = item?.media_type
        return (
            <Button pv={1} ph={1} radius={2} onPress={() => { handleOpen(item) }} >
                <Row>
                    <MotiImage source={{ uri: type === 'VIDEO' ? item.thumbnail_url : item?.media_url }} style={{ width: 84, height: 84, borderRadius: 12, objectFit: 'cover', backgroundColor: '#D1D1D1', }} />
                    <Column style={{ width: '70%', justifyContent: 'center', marginLeft: 12, }}>
                        <Title size={16} style={{ lineHeight: 18, fontFamily: 'Font_Medium', }}>{item?.caption?.length > 72 ? item?.caption?.slice(0, 72) + '...' : item?.caption}</Title>
                        <Label size={12} style={{ lineHeight: 14, marginTop: 6, opacity: .7, }}>Publicado em {formatDateTime(item?.timestamp)}</Label>
                    </Column>
                </Row>
            </Button>
        )
    }

    if (!data) return <SkeletonBody />
    return (
        <Column>

            <Column style={{ height: 1, backgroundColor: '#f1f1f1', marginVertical: 12, }} />
            <FlatList
                data={data}
                renderItem={({ item }) => <Post item={item} />}
                keyExtractor={(item) => item.id}
                windowSize={8}
                initialNumToRender={8}
                maxToRenderPerBatch={8}
                ItemSeparatorComponent={() => <Column style={{ height: 1, backgroundColor: '#f1f1f1', marginVertical: 15, }} />}
            />

        </Column>
    )
}

const PaginationDots = ({ index, numberOfDots, activityColor, disableColor }) => {
    const { color } = useTheme();
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
        <Row style={{ backgroundColor: color.pr, paddingVertical: 4, paddingHorizontal: 2, borderRadius: 100, zIndex: 99, }}>
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
        <Column mv={20}>
            <Row style={{ marginBottom: 20, alignItems: 'center', columnGap: 20, }}>
                <Skeleton width={84} height={84} radius={12} colorMode="light" />
                <Column style={{ rowGap: 10, }}>
                    <Skeleton width={200} height={38} radius={8} colorMode="light" />
                    <Skeleton width={140} height={24} radius={8} colorMode="light" />
                </Column>
            </Row>
            <Column style={{ height: 6, }} />
            <Row style={{ marginBottom: 20, alignItems: 'center', columnGap: 20, }}>
                <Skeleton width={84} height={84} radius={12} colorMode="light" />
                <Column style={{ rowGap: 10, }}>
                    <Skeleton width={200} height={38} radius={8} colorMode="light" />
                    <Skeleton width={140} height={24} radius={8} colorMode="light" />
                </Column>
            </Row>
            <Column style={{ height: 6, }} />
            <Row style={{ marginBottom: 20, alignItems: 'center', columnGap: 20, }}>
                <Skeleton width={84} height={84} radius={12} colorMode="light" />
                <Column style={{ rowGap: 10, }}>
                    <Skeleton width={200} height={38} radius={8} colorMode="light" />
                    <Skeleton width={140} height={24} radius={8} colorMode="light" />
                </Column>
            </Row>
            <Column style={{ height: 6, }} />
            <Row style={{ marginBottom: 20, alignItems: 'center', columnGap: 20, }}>
                <Skeleton width={84} height={84} radius={12} colorMode="light" />
                <Column style={{ rowGap: 10, }}>
                    <Skeleton width={200} height={38} radius={8} colorMode="light" />
                    <Skeleton width={140} height={24} radius={8} colorMode="light" />
                </Column>
            </Row>

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