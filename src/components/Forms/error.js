import { Title, Column, useTheme } from '@theme/global';
import { AlertCircle } from "lucide-react-native";

const Error = ({ msg }) => {
    const { font } = useTheme()
    return (
        <>
            <Column style={{ alignItems: 'center', marginBottom: 12, paddingVertical: 14, paddingHorizontal: 8, borderRadius: 10, backgroundColor: '#CF5050', flexDirection: 'row', }}>
                <Column style={{ width: 32, height: 32, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                    <AlertCircle size={24} color="#fff" />
                </Column>
                <Title style={{ fontSize: 14, maxWidth: 260, marginLeft: 6, color: '#fff', lineHeight: 16, fontFamily: font.medium, marginRight: 12, }}>{msg}</Title>
            </Column>
        </>
    )
}
export default Error;