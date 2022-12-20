import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';

const NotificationController = () => {

    // async function requestUserPermission() {
    //     const authStatus = await messaging().requestPermission();
    //     const enabled =
    //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    //     if (enabled) {
    //         console.log('Authorization status:', authStatus);
    //     }
    // }

    const getToken = async () => {
        try {
            await messaging().registerDeviceForRemoteMessages()
            const fcmToken = await messaging().getToken().then((res) => {
                console.log("GET TOKEN RES ---", { res })
            }).catch((e) => {
                console.log("GET TOKEN CATCH ---", { e })
            })
        } catch (error) {
            console.log("GET TOKEN ERROR ---", { error })
        }
    };

    const handleForegroundNotification = () => {
        PushNotification.configure({
            onNotification: async (notification: { userInteraction: boolean; }) => {
                if (notification.userInteraction === true) {
                    // handle Navigation On User Tap
                    // navigation.navigate('notification');
                }
            },
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            senderID: 29472457280,
            popInitialNotification: true,
            requestPermissions: false,
        });
    };

    // useEffect(() => {
    //     setTimeout(() => {
    //         if (Platform.OS === 'ios') {
    //             try {
    //                 console.log("INSIDE TRY")
    //                 PushNotificationIOS.addNotificationRequest({
    //                     title: "NOTIFICATION",
    //                     body: "HELLO THERE",
    //                     id: "101",
    //                     userInfo: {
    //                         id: 101,
    //                         name: 'test',
    //                     }
    //                 })
    //             } catch (e) {
    //                 console.log("INSIDE CATCH", { e })
    //             }
    //         }
    //     }, 5000);
    // }, [])

    useEffect(() => {
        PushNotification.configure({
            onRegister: function (token: string) {
                console.log("TOKEN:", token);
            },

            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },

            onAction: function (notification) {
                console.log("ACTION:", notification.action);
                console.log("NOTIFICATION:", notification);
            },

            onRegistrationError: function (err) {
                console.error(err.message, err);
            },

            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            popInitialNotification: true,
            requestPermissions: true,
        });
    }, [])

    useEffect(() => {
        getToken()
        messaging().onMessage(remoteMessage => {
            console.log("REMOTE ONMESSAGE = ", { remoteMessage })
            if (Platform.OS === 'ios') {
                let details = {
                    id: "101",
                    body: remoteMessage?.notification?.body ?? '',
                    title: remoteMessage?.notification?.title ?? '',
                };
                PushNotificationIOS.addNotificationRequest(details);
            }
            if (Platform.OS === 'android') {
                PushNotification.createChannel(
                    {
                        channelId: 'fcm_fallback_notification_channel', // (required)
                        channelName: 'fcm_fallback_notification_channel', // (required)
                    },
                    () => { },
                );
                PushNotification.cancelAllLocalNotifications();

                PushNotification.localNotification({
                    channelId: 'fcm_fallback_notification_channel',
                    message: remoteMessage?.notification?.body ?? '',
                    title: remoteMessage?.notification?.title ?? '',
                });
            }
            handleForegroundNotification();
        });
        messaging().setBackgroundMessageHandler(async () => {
            handleForegroundNotification();
        });
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    // navigation.navigate('Tabbar');
                }
            });
    }, []);

    return null
}

export default NotificationController

const styles = StyleSheet.create({})