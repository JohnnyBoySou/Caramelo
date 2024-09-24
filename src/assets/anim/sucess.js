import LottieView from 'lottie-react-native';

export default function SucessAnim({w = 300, h = 300}){
    return(
        <LottieView
            autoPlay
            loop={false}
            style={{
                width: w,
                height: h,
            }}
            source={require('@lottie/check.json')}
            />
)}