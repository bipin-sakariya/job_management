import { RootStackParamList } from '../types/RootStackTypes';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';

const useCustomNavigation = (screenName: keyof RootStackParamList) => {
  type Props = StackScreenProps<RootStackParamList, typeof screenName>;

  type ScreenNavigationProp = Props['navigation'];

  type ScreenRouteProp = Props['route'];

  const navigation = useNavigation<ScreenNavigationProp>();
  // const route = useRoute<ScreenRouteProp>();
  // const navigationParams = route?.params ?? null;

  // return { navigation, route, navigationParams };
  return navigation
};

export default useCustomNavigation;
