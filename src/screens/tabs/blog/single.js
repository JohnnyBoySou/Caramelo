import React, { useState, useEffect, useRef } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, Image, U, SCREEN_HEIGHT, ButtonPrimary, Loader } from '@theme/global';

//COMPONENTS
import Modal from '@components/Modal';
import { KeyboardAvoidingView, Share, Platform } from 'react-native';

//API
import { publishComment, toggleLike } from '@api/request/blog';
//ICONS
import { ArrowLeft, Heart, HelpCircle, MessageCircle, Send } from 'lucide-react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { FlatList } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Input } from '@components/Forms';
import { formatDateTime } from '@hooks/utils';


export default function BlogSingleScreen({ navigation, route }) {
    const { color, font, margin } = useTheme();
    const id = route.params?.id;
    const item = route.params?.item;

    const [data, setdata] = useState({
        likes: 32,
        comments: 12,
    });

    const comments = [
        {
            id: 1,
            name: 'João de Sousa',
            avatar: 'https://avatar.iran.liara.run/public/24',
            message: 'Uau! Que fantástico, top a publicação ⭐⭐⭐⭐⭐ ',
        },
        {
            id: 2,
            name: 'Larissa Queiroz',
            avatar: 'https://avatar.iran.liara.run/public/70',
            message: 'Que trabalho incrível que vocês fazem com os Pets 💖💖! Estão de parabéns!!!!',
        }
    ]
    const commentsRef = useRef(null);

    const [liked, setliked] = useState(false);
    const [loadingLike, setloadingLike] = useState();
    const handleLike = async () => {
        setloadingLike(true);
        try {
            const res = await toggleLike(id);
            setliked(res);
        } catch (error) {
            console.log(error)
        } finally {
            setloadingLike(false);
        }
    }

    const handleShare = async () => {
        try {
            const res = await Share.share({
                message: 'Olha esse post!' + '\n' + item?.permalink,
            })
            console.log(res)
        } catch (error) {

        }
    }
    return (
        <Column style={{ flex: 1, backgroundColor: '#fff', }}>

            <StatusBar style="light" backgroundColor={color.sc} animated />
            <Row ph={margin.h} style={{ backgroundColor: color.sc, paddingBottom: 20, paddingTop: 50, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, }}>
                <Button onPress={() => { navigation.goBack() }} radius={16} pv={0} ph={0} style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }} bg='#fff'>
                    <ArrowLeft size={24} color={color.sc} />
                </Button>
                <Column mh={24}>
                    <Title color="#fff">Detalhes</Title>
                    <Label color="#fff">{item?.caption?.slice(0, 32) + '...'}</Label>
                </Column>
            </Row>
            <Scroll>


                <Column mh={margin.h}>

                    <Image source={{ uri: item?.media_url }} style={{ flexGrow: 1, borderRadius: 24, marginTop: 24, height: 300, backgroundColor: '#d1d1d1', zIndex: 99, }} />
                    <Column  style={{ flexGrow: 1, borderRadius: 28, marginTop: 24, height: 300, backgroundColor: color.pr, marginTop: -290, marginRight: -10, marginLeft: 12,  }} />
                    <Label style={{ fontFamily: font.light, marginVertical: 12, }}>{item?.caption}</Label>
                    <Label >Publicado em {formatDateTime(item?.timestamp)}</Label>

                    <Row style={{ columnGap: 12, marginVertical: 24, }}>
                        <Button bg="#DFCFD290">
                            <Row style={{ justifyContent: 'center', alignItems: 'center', columnGap: 6, }}>
                                <Heart size={16} color={color.sc} />
                                <Label size={12} style={{ lineHeight: 14, }}>{data?.likes} curtidas </Label>
                            </Row>
                        </Button>
                        <Button bg="#DFCFD290">
                            <Row style={{ justifyContent: 'center', alignItems: 'center', columnGap: 6, }}>
                                <MessageCircle size={16} color={color.sc} />
                                <Label size={12} style={{ lineHeight: 14, }}>{data?.comments} comentários </Label>
                            </Row>
                        </Button>
                        <Button bg="#DFCFD290" onPress={handleShare}>
                            <Row style={{ justifyContent: 'center', alignItems: 'center', columnGap: 6, }}>
                                <Send size={16} color={color.sc} />
                                <Label size={12} style={{ lineHeight: 14, }}>Enviar</Label>
                            </Row>
                        </Button>
                    </Row>

                    <Column style={{ height: 100, }} />
                </Column>
            </Scroll>
            <Row style={{ backgroundColor: '#f1f1f1', paddingVertical: 4, columnGap: 6, paddingHorizontal: 4, borderRadius: 100, alignSelf: 'center', position: 'absolute', bottom: 30, }}>
                <Button onPress={handleLike} style={{ width: 56, height: 56, borderRadius: 100, backgroundColor: liked ? color.sc : '#f1f1f1', justifyContent: 'center', alignItems: 'center', }}>
                    <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                        {!liked ? <AntDesign name="hearto" size={24} color={color.sc} /> : <AntDesign name="heart" size={24} color={color.red} />}
                    </Row>
                </Button>
                <Button onPress={() => { commentsRef.current?.expand() }} style={{ width: 56, height: 56, borderRadius: 100, backgroundColor: color.sc, justifyContent: 'center', alignItems: 'center', }}>
                    <MessageCircle size={24} color="#fff" />
                </Button>
                <Button style={{ width: 56, height: 56, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }} onPress={handleShare}>
                    <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <Send size={24} color={color.sc} />
                    </Row>
                </Button>
            </Row>
            <Modal ref={commentsRef} snapPoints={[0.1, 1 * SCREEN_HEIGHT]}>
                <Column mh={margin.h} style={{}}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Button onPress={() => { commentsRef.current?.close() }} radius={16} pv={0} ph={0} style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }} bg={color.sc}>
                            <ArrowLeft size={24} color="#fff" />
                        </Button>
                        <Title>Comentários</Title>
                        <Button onPress={() => { navigation.navigate('FAQ') }} pv={0} ph={0} radius={16} style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }} bg={color.sc.sc3}>
                            <HelpCircle size={24} color={color.sc} />
                        </Button>
                    </Row>


                    <ListComments data={comments} id={id} />
                </Column>
            </Modal>
        </Column>
    )
}


const ListComments = ({ data, id, }) => {
    const { color, font, margin } = useTheme()
    const CommentItem = ({ item }) => {
        return (
            <Row mv={12}>
                <Image source={{ uri: item?.avatar }} style={{ width: 54, height: 54, borderRadius: 12, }} />
                <Column style={{ width: '77%', marginLeft: 12, }}>
                    <Title size={18} style={{ lineHeight: 20, }}>{item?.name}</Title>
                    <Label size={14} style={{ lineHeight: 18, }}>{item?.message}</Label>
                </Column>
            </Row>
        )
    }

    const [comment, setcomment] = useState();
    const [loading, setloading] = useState(false);
    const handleComment = async () => {
        setloading(true);
        try {
            const res = await publishComment(comment, id);
            console.log(res)
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false);
        }
    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'height' : 'height'} style={{ flex: 1, }} keyboardVerticalOffset={20}>
            <FlatList
                data={data}
                style={{ paddingVertical: 12, height: 0.9 * SCREEN_HEIGHT, }}
                renderItem={({ item }) => <CommentItem item={item} />}
                ItemSeparatorComponent={() => <Column style={{ height: 1, backgroundColor: '#D1D1D1', }} />}
                keyExtractor={item => item.id}
                ListEmptyComponent={<Column style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <Image source={require('@imgs/comments_vazio.png')} style={{ width: '100%', height: 140, marginVertical: 20, objectFit: 'contain', }} />
                    <Title align="center">Nada por aqui por enquanto...</Title>
                    <Label align="center" style={{ marginVertical: 12, }}>Seja o primeiro comentar!</Label>
                    <ButtonPrimary label="Comentar!" type="sc" pv={14} ph={36} />
                </Column>}
            />
            <Row style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 20, }}>
                <Column style={{ flexGrow: 1, }}>
                    <Input label="Comentário" setValue={setcomment} value={comment} />
                </Column>
                <Column style={{ width: 12 }} />
                <Button onPress={handleComment} bg={color.sc} style={{ width: 64, justifyContent: 'center', alignItems: 'center', height: 64, }} radius={12}>
                    <Row>
                        {loading ? <Loader size={24} color='#fff' /> : <Send size={24} color="#fff" />}
                    </Row>
                </Button>
            </Row>
        </KeyboardAvoidingView>
    )
}