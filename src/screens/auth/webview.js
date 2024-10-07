import { Main } from '@theme/global';
import { StatusBar } from 'expo-status-bar';
import { Header } from '@components/Header';
import { WebView } from 'react-native-webview';
import { Column } from '@theme/global';

export default function WebViewScreen({ route }) {
    const name = route.params.name;
    const link = route.params.link;
    return (
        <Main style={{ backgroundColor: '#fff', paddingTop: 20, }}>
            <StatusBar style="dark" backgroundColor='#fff' />
            <Column ph={20} style={{ paddingBottom:10, }}>
                <Header title={name} />
            </Column>
            <WebView style={{ flex: 1, }} source={{ uri: link }} />
        </Main>
    )
}
