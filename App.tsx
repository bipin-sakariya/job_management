import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/Store';

const App = () => {
    return (
        <Provider store={store}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="dark-content"
            />
            <AppNavigation />
        </Provider>
    )
}

export default App;

const styles = StyleSheet.create({})