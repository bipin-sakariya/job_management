import { Alert, Linking, PermissionsAndroid, Platform, ToastAndroid } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import appConfig from '../../app.json';
import { strings } from "../languages/localizedStrings";

const hasPermissionIOS = async () => {
    const openSetting = () => {
        Linking.openSettings().catch(() => {
            Alert.alert(strings.unable_to_open_setting);
        });
    };
    const status = await Geolocation.requestAuthorization('always');

    if (status === 'granted') {
        return true;
    }

    if (status === 'denied') {
        Alert.alert(strings.location_permission_denied);
    }

    if (status === 'disabled') {
        Alert.alert(
            `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
            '',
            [
                { text: 'Go to Settings', onPress: openSetting },
                { text: "Don't Use Location", onPress: () => { } },
            ],
        );
    }

    return false;
};

export const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
        const hasPermission = await hasPermissionIOS();
        return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
        return true;
    }

    const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
        return true;
    }

    const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
        ToastAndroid.show(
            'Location permission denied by user.',
            ToastAndroid.LONG,
        );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        ToastAndroid.show(
            'Location permission revoked by user.',
            ToastAndroid.LONG,
        );
    }

    return false;
};