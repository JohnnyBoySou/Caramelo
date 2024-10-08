import React, { useEffect } from 'react';
import { Main, Title, Label, } from '@theme/global';
import { MotiImage, MotiView } from 'moti';
import { StatusBar } from 'expo-status-bar';
import { getToken } from '@hooks/token';
import { listUser } from '@api/request/user';


export default function AsyncStaticScreen({ navigation, }) {

    useEffect(() => {
        const fetchData =  async () => {
            try {
                const user = await listUser();
                if(user){
                    navigation.replace('Tabs')
                }
            } catch (error) {
                navigation.replace('Onboarding')
            }
        }
        setTimeout(() => {
            fetchData()
        }, 2000)
    }, [])
    return (
        <Main style={{ backgroundColor: "#2D0007", flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <StatusBar style='light' />
            <MotiImage transition={{delay: 200,}} from={{opacity: 0, scale: 0, rotate: '-12deg'}} animate={{opacity: 1, scale: 1, rotate: '0deg'}} source={require('@imgs/logo_splash1.png')} style={{ width: 224, height: 224, objectFit: 'contain', }} />
            <MotiImage transition={{delay: 600,}}  from={{opacity: 0, scale: .7, translateY: 124}} animate={{opacity: 1, scale: 1, translateY: 0,}} source={require('@imgs/logo_splash2.png')} style={{ width: 224, height: 64, objectFit: 'contain', }} />
        </Main>
    )
}