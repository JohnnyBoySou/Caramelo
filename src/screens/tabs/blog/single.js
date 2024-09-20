import React, { useState, useEffect, useRef } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, Image, U, SCREEN_HEIGHT, ButtonPrimary } from '@theme/global';

//COMPONENTS
import { Carrousel } from '.';
import Modal from '@components/Modal';

//ICONS
import { ArrowLeft, Heart, HelpCircle, MessageCircle, Send } from 'lucide-react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { FlatList } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';


export default function BlogSingleScreen({ navigation, route }) {
    const { color, font, margin } = useTheme();
    const id = route.params?.id;

    const item = {
        title: 'Lorem ipsum dolor sit amet',
        imgs: ['https://i.pinimg.com/564x/fa/cb/92/facb926a743728c982d054c5ac5386eb.jpg', 'https://i.pinimg.com/736x/e9/ed/ba/e9edba03f93128ee2fe855fc8e8a72b2.jpg', 'https://i.pinimg.com/564x/8b/e0/91/8be091c5c5091f9a43d14f25eba84412.jpg'],
        img1: { url: 'https://i.pinimg.com/564x/75/04/41/750441805adf676479f6769813cedfc2.jpg', alt: 'Descrição da imagem' },
        desc: `É um facto estabelecido de que um leitor é distraído pelo conteúdo legível de uma página quando analisa a sua mancha gráfica. \n\nÉ um facto estabelecido de que um leitor é distraído pelo conteúdo legível`,
        desc2: `É um facto estabelecido de que um leitor é distraído pelo conteúdo legível de uma página quando analisa a sua mancha gráfica. \n\nÉ um facto estabelecido de que um leitor é distraído pelo conteúdo legível. \n\nÉ um facto estabelecido de que um leitor é distraído pelo conteúdo legível`,
        date: '30 de setembro de 2024',
        likes: 32,
        comments: 12,
    }

    const comments = [
        {
            id: 1,
            name: 'João de Sousa',
            avatar: 'https://avatar.iran.liara.run/public/24',
            message: 'Uau! Que fantástico, adorei a publicação ⭐⭐⭐⭐⭐ ',
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

    const handleLike = () => {
        if (liked) {
            setliked(false)
        } else {
            setliked(true)
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
                    <Label color="#fff">{item?.title.slice(0, 20) + '...'}</Label>
                </Column>
            </Row>
            <Scroll>


                <Carrousel imgs={item?.imgs} />
                <Column mh={margin.h}>
                    <Title style={{ letterSpacing: -.7, }} size={22}>{item?.title}</Title>
                    <Label style={{ fontFamily: font.light, marginVertical: 12, }}>{item?.desc}</Label>

                    <Image source={{ uri: item?.img1?.url }} style={{ flexGrow: 1, borderRadius: 24, marginTop: 12, height: 200, backgroundColor: '#d1d1d1', }} />
                    <Label align='center' style={{ marginVertical: 12, }}>{item?.img1?.alt}</Label>

                    <Label style={{ fontFamily: font.light, marginVertical: 12, }}>{item?.desc2}</Label>

                    <Label >Publicado em {item?.date} por <U>Instituto Caramelo.</U></Label>

                    <Row style={{ columnGap: 12, marginVertical: 24, }}>
                        <Button bg="#DFCFD290">
                            <Row style={{ justifyContent: 'center', alignItems: 'center', columnGap: 6, }}>
                                <Heart size={16} color={color.sc} />
                                <Label size={12} style={{ lineHeight: 14, }}>{item?.likes} curtidas </Label>
                            </Row>
                        </Button>
                        <Button bg="#DFCFD290">
                            <Row style={{ justifyContent: 'center', alignItems: 'center', columnGap: 6, }}>
                                <MessageCircle size={16} color={color.sc} />
                                <Label size={12} style={{ lineHeight: 14, }}>{item?.comments} comentários </Label>
                            </Row>
                        </Button>
                        <Button bg="#DFCFD290">
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
                <Button style={{ width: 56, height: 56, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                    <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <Send size={24} color={color.sc} />
                    </Row>
                </Button>
            </Row>
            <Modal ref={commentsRef} snapPoints={[0.1, 0.94 * SCREEN_HEIGHT]}>
                <Column mh={margin.h}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Button onPress={() => { commentsRef.current?.close() }} radius={16} pv={0} ph={0} style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }} bg={color.sc}>
                            <ArrowLeft size={24} color="#fff" />
                        </Button>
                        <Title>Comentários</Title>
                        <Button onPress={() => { navigation.navigate('FAQ') }} pv={0} ph={0} radius={16} style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }} bg={color.sc.sc3}>
                            <HelpCircle size={24} color={color.sc} />
                        </Button>
                    </Row>


                    <ListComments data={comments} />
                </Column>
            </Modal>
        </Column>
    )
}


const ListComments = ({ data }) => {

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
    return (
        <Column>

            <FlatList
                data={data}
                style={{ paddingVertical: 12, }}
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

        </Column>
    )
}