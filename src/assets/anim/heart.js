import LottieView from 'lottie-react-native';
import { MotiView } from 'moti';
import { useEffect, useRef } from 'react';

export default function HeartAnim({w = 200, h = 200, play}){
    const pl = useRef()
    
    useEffect(() => {
        if(play){
            pl.current.play()
        }else{
            pl.current.pause()
        }
    }, [play])
    
    return(
        <LottieView
            ref={pl}
            loop={false}
            style={{
                width: w,
                height: h,
            }}
            source={require('@lottie/heart.json')}
            />
)}