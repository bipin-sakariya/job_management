import { RouteProp } from "@react-navigation/native";

export type BottomStackParamList = {
    JobsScreen: undefined
    MapScreen: undefined
    IndoxScreen: undefined
};

export type DrawerStackParamList = {
    BottomTabs: BottomStackParamList
}

interface BillSectionScreenProps {
    name: string,
    unit: string,
    ration: string,
    imageUrl?: string,
    quantity?: string,
    type: string,
}

export type RootStackParamList = {
    AuthStack: AuthStackParamList
    DrawerScreens: DrawerStackParamList
    MapScreen: undefined
    IndoxScreen: undefined
    JobDuplicateListScreen: undefined
    NotificationScreen: undefined
    JobDetailsScreen: undefined
    UsersGroupsScreen: { type?: string }
    UserGroupDetailScreen: { type?: string },
    ReportGeneratorScreen: undefined
    BillListScreen: undefined
    BillCreateScreen: undefined
    CreateBillSectionScreen: { type?: string }
    BillSectionScreen: BillSectionScreenProps
    FormScreen: undefined
    ProfileScreen: undefined
    ResetPasswordScreen: undefined
    EditProfileScreen: undefined
    CreateFormScreen: undefined
    FormDetailsScreen: undefined
    ChatScreen: undefined
    TransferJobScreen: undefined
    ReturnJobScreen: undefined
    DuplicateScreen: undefined
    CloseJobScreen: undefined
    RouteScreen: undefined
    RouteChooseLocationDetailScreen: undefined
    RouteMapViewScreen: undefined
};

export type AuthStackParamList = {
    SignInScreen: undefined
}

export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
    RootStackParamList,
    RouteName
>;