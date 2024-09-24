import LottieView from 'lottie-react-native';

export default function QRCodeAnim({w = 300, h = 300}){
    return(
        <LottieView
            autoPlay
            loop={true}
            style={{
                width: w,
                height: h,
            }}
            source={require('@lottie/qrcode.json')}
            />
)}