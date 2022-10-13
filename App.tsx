import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/Store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <StatusBar
                    translucent
                    backgroundColor="transparent"
                    barStyle="dark-content"
                />
                <AppNavigation />
            </PersistGate>
        </Provider>
    )
}

export default App;

const styles = StyleSheet.create({})