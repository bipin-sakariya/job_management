import { I18nManager, StatusBar, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
import { strings } from './src/languages/localizedStrings';

const App = () => {

    useEffect(() => {
        I18nManager.forceRTL(true),
            strings.setLanguage("hebrew")
        setTimeout(() => {
            SplashScreen.hide();
        }, 500);
    }, []);

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