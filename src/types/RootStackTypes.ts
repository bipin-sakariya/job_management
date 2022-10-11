export type BottomStackParamList = {
    JobsScreen: undefined
    MapScreen: undefined
    IndoxScreen: undefined
};

export type DrawerStackParamList = {
    BottomTabs: BottomStackParamList
}

export type RootStackParamList = {
    AuthStack: AuthStackParamList
    DrawerScreens: DrawerStackParamList
    MapScreen: undefined
    IndoxScreen: undefined
    RouteScreen: undefined
    NotificationScreen: undefined
    JobDetailsScreen: undefined
    UsersScreen: undefined
};

export type AuthStackParamList = {
    SignInScreen: undefined
}