import { View, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text onPress={() => {}}>HomeScreen</Text>
        </View>
    )
}

export default HomeScreen;