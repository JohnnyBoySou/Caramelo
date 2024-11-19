import { Title, Column, useTheme } from '@theme/global';
import { CheckIcon } from "lucide-react-native";
const Success = ({ msg }) => {
    const { font } = useTheme();
 
    return (
        <>
            <Column style={{ alignItems: 'center', marginBottom: 12, paddingVertical: 14, paddingHorizontal: 12, borderRadius: 10, backgroundColor: '#778428', flexDirection: 'row' }}>
                <Column style={{ width: 32, height: 32, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                    <CheckIcon size={24} color="#fff" />
                </Column>
                <Title style={{ fontSize: 14, marginLeft: 6, color: '#fff', lineHeight: 16, fontFamily: font.medium, marginRight: 12, }}>{msg}</Title>
            </Column>
        </>
    );
};

export default Success;