import React, { useEffect } from 'react';
import { Main, Title, Label, } from '@theme/global';
import { MotiImage, MotiView } from 'moti';
import { StatusBar } from 'expo-status-bar';


export default function AsyncStaticScreen({ navigation, }) {

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Onboarding')
        }, 2000)
    }, [])
    return (
        <Main style={{ backgroundColor: "#2D0007", flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <StatusBar style='light' />
            <MotiImage transition={{delay: 200,}} from={{opacity: 0, scale: 0, rotate: '-12deg'}} animate={{opacity: 1, scale: 1, rotate: '0deg'}} source={require('@imgs/logo_splash1.png')} style={{ width: 224, height: 224, objectFit: 'contain', }} />
            <MotiImage transition={{delay: 600,}}  from={{opacity: 0, scale: .7, translateY: 124}} animate={{opacity: 1, scale: 1, translateY: 0,}} source={require('@imgs/logo_splash2.png')} style={{ width: 224, height: 64, objectFit: 'contain', }} />
        
            <MotiView transition={{delay: 1000, type: 'timing'}}  from={{opacity: 0, translateY: 124}} animate={{opacity: 1, translateY: 0,}} style={{ backgroundColor: '#440B14', position: 'absolute', bottom: -20, paddingBottom: 40, alignSelf: 'center', height: 120, borderRadius: 18, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32, }}>
                <Label color='#fff'>App por:</Label>
                <Title color='#fff'>@eng.dig</Title>
            </MotiView>
        </Main>
    )
}