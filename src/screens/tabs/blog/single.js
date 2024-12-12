import React, { useState, useEffect, useRef } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, Image, U, SCREEN_HEIGHT, ButtonPrimary, Loader } from '@theme/global';

//COMPONENTS
import Modal from '@components/Modal';
import { KeyboardAvoidingView, Share, Platform, TextInput, } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
//API
import { publishComment, toggleLike, listComments, editComment, excludeComment } from '@api/request/blog';

//ICONS
import { ArrowLeft, Edit, Heart, HelpCircle, MessageCircle, Send, Trash } from 'lucide-react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StatusBar } from 'expo-status-bar';
import { Input } from '@components/Forms';
import { formatDateTime } from '@hooks/utils';
import { listUser, } from '@api/request/user';
import { isLike } from '@api/request/blog';
import { MotiImage } from 'moti';
import HeartAnim from '../../../assets/anim/heart';



export default function BlogSingleScreen({ navigation, route }) {
    const { color, font, margin } = useTheme();
    const item = route.params?.item;
    const modalLike = useRef(null);
    const commentsRef = useRef(null);

    const [comments, setcomments] = useState();
    const [totalComments, settotalComments] = useState('0');

    const handleList = async () => {
        try {
            const res = await listComments(item?.id);
            const reslike = await isLike(item?.id);
            setliked(reslike.iscurtir);
            settotalCurtidas(reslike.totalcurtidas);
            settotalComments(res.totalcometarios);
            setcomments(res.comentarios.data);
        } catch (error) {
            console.log(error)
        }
    }

    const [liked, setliked] = useState(false);
    const [totalCurtidas, settotalCurtidas] = useState('0');
    const [loadlike, setloadlike] = useState(false);
    const handleLike = async () => {
        setloadlike(true);
        try {
            const res = await toggleLike(item?.id);
            setliked(res.iscurtir);
            settotalCurtidas(res.totalcurtidas);
            if (res.iscurtir) {
                modalLike.current?.expand();
            }
        } catch (error) {
            console.log(error)
        } finally {
            setloadlike(false);
        }
    }

    const handleShare = async () => {
        try {
            const res = await Share.share({
                message: 'Olha esse post!' + '\n' + item?.url,
            })
            console.log(res)
        } catch (error) {

        }
    }

    useEffect(() => {
        handleList();
    }, [])
    return (
        <Column style={{ flex: 1, backgroundColor: '#fff', }}>
            <StatusBar style="light" backgroundColor={color.sc} animated />
            <Row ph={margin.h} style={{ backgroundColor: color.sc, paddingBottom: 20, paddingTop: 50, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, }}>
                <Button onPress={() => { navigation.goBack() }} radius={16} pv={0} ph={0} style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }} bg='#fff'>
                    <ArrowLeft size={24} color={color.sc} />
                </Button>
                <Column mh={24}>
                    <Title color="#fff">Detalhes</Title>
                    <Label color="#fff">{item?.title?.slice(0, 32) + '...'}</Label>
                </Column>
            </Row>

            <Scroll>
                <Column mh={margin.h}>

                    <MotiImage from={{ opacity: 0, scale: 0, rotate: '12deg' }} animate={{ opacity: 1, scale: 1, rotate: '0deg' }} transition={{ delay: 300, damping: 20, }} source={{ uri: item?.image }} style={{ flexGrow: 1, borderRadius: 24, marginTop: 24, height: 300, backgroundColor: '#d1d1d1', zIndex: 99, }} />
                    <Column style={{ flexGrow: 1, borderRadius: 28, marginTop: 24, height: 300, backgroundColor: color.pr, marginTop: -290, marginRight: -10, marginLeft: 12, }} />
                    <Label style={{ fontFamily: font.light, marginVertical: 12, }}>{item?.content_text}</Label>
                    <Label>Publicado em {formatDateTime(item?.date_published)}</Label>

                    <Row style={{ columnGap: 12, marginVertical: 24, }}>
                        <Button bg="#DFCFD290">
                            <Row style={{ justifyContent: 'center', alignItems: 'center', columnGap: 6, }}>
                                <Heart size={16} color={color.sc} />
                                <Label size={12} style={{ lineHeight: 14, }}>{totalCurtidas} curtidas </Label>
                            </Row>
                        </Button>
                        <Button bg="#DFCFD290" onPress={() => commentsRef.current?.expand()}>
                            <Row style={{ justifyContent: 'center', alignItems: 'center', columnGap: 6, }}>
                                <MessageCircle size={16} color={color.sc} />
                                <Label size={12} style={{ lineHeight: 14, }}>{totalComments} comentários </Label>
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
                        {loadlike ? <Loader size={18} color={color.pr} /> : <>
                            {!liked ? <AntDesign name="hearto" size={24} color={color.sc} /> : <AntDesign name="heart" size={24} color={color.red} />}
                        </>}
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

            <Modal ref={commentsRef} snapPoints={[0.1, 0.9 * SCREEN_HEIGHT]}>

                <Column style={{ flex: 1, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 10, }}>
                        <Button onPress={() => { commentsRef.current?.close() }} radius={16} pv={0} ph={0} style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }} bg={color.sc}>
                            <ArrowLeft size={24} color="#fff" />
                        </Button>
                        <Title>Comentários</Title>
                        <Button onPress={() => { navigation.navigate('FAQ') }} pv={0} ph={0} radius={16} style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }} bg={color.sc.sc3}>
                            <HelpCircle size={24} color={color.sc} />
                        </Button>
                    </Row>

                    <ListComments data={comments} id={item?.id} fetchList={handleList} />
                </Column>
            </Modal>
            <Modal ref={modalLike} snapPoints={[0.1, 330]}>
                <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Column style={{ marginTop: -40, }}>
                        <HeartAnim play={liked} width={100} height={100} />
                    </Column>
                    <Title style={{ marginTop: -30, textAlign: 'center', marginHorizontal: 20, lineHeight: 24, marginBottom: 15, }}>Uau! Que tal compartilhar com alguém?</Title>
                    <Button bg="#DFCFD290" onPress={handleShare} pv={16} ph={20}>
                        <Row style={{ justifyContent: 'center', alignItems: 'center', columnGap: 6, }}>
                            <Send size={18} color={color.sc} />
                            <Label size={16} style={{ lineHeight: 18, marginLeft: 5, }}>Compartilhar</Label>
                        </Row>
                    </Button>
                </Column>
            </Modal>
        </Column>
    )
}


const ListComments = ({ data, id, fetchList }) => {
    const { color, font, margin } = useTheme()


    const CommentItem = ({ item }) => {
        console.log(item.avatar)
        const userAvatar = item?.avatar === 'https://caramelo.engenhariadigital.net/' ? require('@imgs/user.png') : { uri: item?.avatar }
        return (
            <Row mv={12}>
                <Image source={userAvatar} style={{ width: 54, height: 54, borderRadius: 100, backgroundColor: '#303030', }} />
                <Column style={{ width: '68%', marginLeft: 12, }}>
                    <Title size={18} style={{ lineHeight: 20, }}>{item?.name}</Title>
                    <Label size={14} style={{ lineHeight: 18, }}>{item?.texto}</Label>
                </Column>
                {user?.id === item?.IDUsuario &&
                    <Button onPress={() => { setselect(item); setcomment(item?.texto) }} style={{ backgroundColor: color.sc + 20, justifyContent: 'center', alignItems: 'center', width: 36, height: 36, }}>
                        <Edit size={14} color={color.sc} />
                    </Button>}
            </Row>
        )
    }
    const [user, setuser] = useState();
    const [comment, setcomment] = useState();
    const [loading, setloading] = useState(false);
    const [select, setselect] = useState();

    const handleUser = async () => {
        try {
            const user = await listUser();
            setuser(user);
        } catch (error) {

        }
    }


    const handleComment = async () => {
        setloading(true);
        try {
            const res = await publishComment(comment, id);
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false);
            setcomment('');
            fetchList();
        }
    }

    const handleEdit = async () => {
        setloading(true);
        try {
            const res = await editComment(select?.id, id, comment);
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false);
            fetchList();
            setselect(null);
        }
    }

    const handleExclude = async () => {
        setloading(true);
        try {
            const res = await excludeComment(select?.id, id,);
            console.log(res)
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false);
            fetchList();
            setselect(null);
        }
    }

    useEffect(() => {
        handleUser();
    }, [])

    const avatarImg = select?.avatar === 'https://caramelo.engenhariadigital.net/' ? require('@imgs/user.png') : { uri: select?.avatar }

    const [focusInput, setfocusInput] = useState();
    return (
        <>
            <FlatList
                data={data}
                style={{ paddingVertical: 12, height: SCREEN_HEIGHT, paddingHorizontal: 20, }}
                renderItem={({ item }) => <CommentItem item={item} />}
                ItemSeparatorComponent={() => <Column style={{ height: 1, backgroundColor: '#D1D1D1', }} />}
                keyExtractor={item => item?.id}
                ListEmptyComponent={<Column style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <Image source={require('@imgs/comments_vazio.png')} style={{ width: '100%', height: 140, marginVertical: 20, objectFit: 'contain', }} />
                    <Title align="center">Nada por aqui por enquanto...</Title>
                    <Label align="center" style={{ marginVertical: 12, }}>Seja o primeiro comentar!</Label>
                    <ButtonPrimary label="Comentar!" type="sc" pv={14} ph={36} />
                </Column>}
                ListFooterComponent={<Column style={{ height: 120, }}></Column>}
            />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : 'height'} style={{ flex: 1, }}  keyboardVerticalOffset={90}>
                <Column style={{ position: 'absolute', backgroundColor: '#FFF', borderTopWidth: 2, borderTopColor: '#F1F1F1', bottom: 5, paddingBottom: 30, paddingHorizontal: 20, paddingTop: 20, }}>
                    {select &&
                        <Column>
                            <Row style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 15, }}>
                                <Image source={avatarImg} style={{ width: 54, height: 54, borderRadius: 100, }} />
                                <Column style={{ width: '65%', marginLeft: 12, }}>
                                    <Title size={18} style={{ lineHeight: 20, }}>{select?.name}</Title>
                                    <Label size={14} style={{ lineHeight: 18, }}>{select?.texto}</Label>
                                </Column>
                                <Button bg='#C00000' style={{ justifyContent: 'center', alignItems: 'center', width: 42, height: 42, }} onPress={handleExclude}>
                                    <Trash size={18} color='#fff' />
                                </Button>
                            </Row>
                        </Column>
                    }
                    <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <Column style={{ width: '78%', }}>
                            <TextInput
                                placeholder="Comentar"
                                placeholderTextColor={color.sc+90}
                                style={{
                                    backgroundColor: '#fff',
                                    borderWidth: 2, 
                                    borderColor: focusInput ? color.sc : '#F1F1F1',
                                    borderRadius: 12, paddingHorizontal: 12, paddingVertical: 20, fontFamily: font.medium, color: color.sc,
                                }}
                                value={comment}
                                onChangeText={setcomment}
                                onFocus={() => setfocusInput(true)}
                                onBlur={() => setfocusInput(false)}
                            />
                        </Column>
                        <Column style={{ width: 12 }} />
                        <Button onPress={select ? handleEdit : handleComment} bg={color.sc} style={{ width: 64, justifyContent: 'center', alignItems: 'center', height: 64, }} radius={12}>
                            <Row>
                                {loading ? <Loader size={24} color='#fff' /> : <Send size={24} color="#fff" />}
                            </Row>
                        </Button>
                    </Row>
                </Column>
            </KeyboardAvoidingView>
        </>
    )
}