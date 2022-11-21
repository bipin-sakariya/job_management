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
    id: number,
    type: string,
    isEdit?: boolean
}

export type RootStackParamList = {
    AuthStack: AuthStackParamList
    DrawerScreens: DrawerStackParamList
    MapScreen: undefined
    IndoxScreen: undefined
    JobDuplicateListScreen: undefined
    NotificationScreen: undefined
    JobDetailsScreen: { params: any, type?: string }
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
    CreateNewJobScreen: { type?: string }
    JobsScreen: undefined
    UserGroupProfileScreen: { type?: string, userId: number, isEdit?: boolean }
    ReturnAndAddJobHistoryScreen: { type?: string },
    SelectFormScreen: undefined,
    FillFormScreen: undefined,
    SignBillDetailScreen: undefined,
    AddNewJobScreen: undefined
};

export type AuthStackParamList = {
    SignInScreen: undefined
}

export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
    RootStackParamList,
    RouteName
>;