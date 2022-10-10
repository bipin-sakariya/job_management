export type BottomStackParamList = {
    JobsScreen: undefined
    MapScreen: undefined
    IndoxScreen: undefined
};

export type DrawerStackParamList = {
    BottomTabs: BottomStackParamList
}

export type RootStackParamList = {
    DrawerScreens: DrawerStackParamList
    AuthStack: AuthStackParamList
    MapScreen: undefined
    IndoxScreen: undefined
};

export type AuthStackParamList = {
    SignInScreen: undefined
}