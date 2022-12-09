import { RouteProp } from "@react-navigation/native";
import { GroupData } from "../redux/slices/AdminSlice/groupListSlice";
import { JobDetailsData } from "../redux/slices/AdminSlice/jobListSlice";

export type BottomStackParamList = {
    JobsScreen: undefined
    MapScreen: undefined
    IndoxScreen: undefined
};

export type DrawerStackParamList = {
    BottomTabs: BottomStackParamList
}

export interface JobDetailsProps {
    description: string
    km: string
    status: string
    title: string
}

export type RootStackParamList = {
    AuthStack: AuthStackParamList
    DrawerScreens: DrawerStackParamList
    MapScreen: undefined
    IndoxScreen: undefined
    JobDuplicateListScreen: undefined
    NotificationScreen: undefined
    JobDetailsScreen: { params: JobDetailsData, type?: string }
    ReportGeneratorScreen: undefined
    BillListScreen: { billType?: string }
    BillCreateScreen: undefined
    CreateBillSectionScreen: { type?: string }
    BillSectionScreen: { id?: number, type: string, isEdit?: boolean }
    FormScreen: undefined
    ProfileScreen: undefined
    ResetPasswordScreen: undefined
    EditProfileScreen: undefined
    CreateFormScreen: undefined
    FormDetailsScreen: { id?: number, isEdit?: boolean }
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
    GroupDetailScreen: { screenName?: string, params: GroupData, isEdit?: boolean },
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