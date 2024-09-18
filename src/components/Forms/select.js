import { Row } from '@theme/global';
import { Check } from 'lucide-react-native';
import { MotiView, useAnimationState } from 'moti';
import { useContext, useEffect } from 'react';
import { ThemeContext } from 'styled-components/native';

const Select = ({ status }) => {
  const { color } = useContext(ThemeContext);
  const animationState = useAnimationState({
    closed: {
      scale: 0,
      opacity: 0,
    },
    open: {
      opacity: 1,
      scale: 1,
    },
  })

  useEffect(() => {
    animationState.transitionTo(status ? 'open' : 'closed')
  }, [status])

  return (
      <MotiView state={animationState} style={{ width: 38, height: 38, borderRadius: 100, backgroundColor: status ? "#2ECA6F" : "#808080" , justifyContent: 'center', alignItems: 'center', }}>
        <Check size={24} color="#fff"/>
      </MotiView>
  )
}
export default Select;