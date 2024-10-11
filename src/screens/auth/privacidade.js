import { Main } from '@theme/global';
import { StatusBar } from 'expo-status-bar';
import { Header } from '@components/Header';
import { WebView } from 'react-native-webview';
import { Column } from '@theme/global';

export default function PrivacidadeScreen() {
    return (
        <Main style={{ backgroundColor: '#fff', paddingTop: 20, }}>
            <StatusBar style="dark" backgroundColor='#fff' />
            <Column ph={20}>
                <Header rose title="Termos de Uso" />
                <WebView style={{ flex: 1, }} source={{ uri: 'https://engenhariadigital.net/caramelo/termos/' }} />
            </Column>
        </Main>
    )
}
