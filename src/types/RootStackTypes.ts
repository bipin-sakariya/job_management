import { RouteProp } from "@react-navigation/native";

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
    UsersGroupsScreen: { type?: string }
    UserGroupDetailScreen: { type?: string },
    ReportGeneratorScreen: undefined
    BillListScreen: undefined
    BillCreateScreen: undefined
    CreateBillSectionScreen: { type?: string }

};

export type AuthStackParamList = {
    SignInScreen: undefined
}

export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
    RootStackParamList,
    RouteName
>;