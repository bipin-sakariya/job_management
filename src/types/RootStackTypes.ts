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
    JobDuplicateListScreen?: {
        params?: any,
    }
    NotificationScreen: undefined
    JobDetailsScreen: { params?: any, type?: string }
    ReportGeneratorScreen: undefined
    BillListScreen: { billType?: string }
    BillCreateScreen: undefined
    CreateBillSectionScreen: { type?: string }
    BillSectionScreen: BillSectionScreenProps
    FormScreen: undefined
    ProfileScreen: undefined
    ResetPasswordScreen: undefined
    EditProfileScreen: undefined
    CreateFormScreen: undefined
    FormDetailsScreen: { id?: number | undefined, isEdit?: boolean }
    ChatScreen: undefined
    TransferJobScreen: undefined
    ReturnJobScreen: undefined
    DuplicateScreen?: { params?: any }
    CloseJobScreen: undefined
    RouteScreen: undefined
    RouteChooseLocationDetailScreen: undefined
    RouteMapViewScreen: undefined
    CreateNewJobScreen: { type?: string }
    JobsScreen: undefined
    ReturnAndAddJobHistoryScreen: { type?: string }
    CustomJobListComponent: { type?: string },
    SelectFormScreen: undefined,
    FillFormScreen: undefined,
    SignBillDetailScreen: { type: string },
    AddNewJobScreen: undefined,
    UserListScreen: undefined,
    CreateUserScreen: undefined,
    UserDetailScreen: { userId: number, isEdit?: boolean }
    GroupListScreen: undefined,
    CreateGroupScreen: undefined,
    GroupDetailScreen: { screenName?: string, params?: any, isEdit?: boolean },
    CreateJobMapScreen: undefined,
    SearchScreen: { screenName?: string }
    AssignJobScreen: undefined
};

export type AuthStackParamList = {
    SignInScreen: undefined
}

export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
    RootStackParamList,
    RouteName
>;