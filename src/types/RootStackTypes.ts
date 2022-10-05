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
    MapScreen: undefined
    IndoxScreen: undefined
};