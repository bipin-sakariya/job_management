import { RouteProp } from "@react-navigation/native";
import { date } from "yup";
import { GroupData } from "../redux/slices/AdminSlice/groupListSlice";
import { JobDetailsData } from "../redux/slices/AdminSlice/jobListSlice";

export interface JobDetailsProps {
    description: string
    km: string
    status: string
    title: string
}

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
    MapScreen: { type: 'viewJob' | 'viewJobs', JobDetails?: { id?: number, image?: string, date?: string, status?: string, button?: string, title?: string, description?: string, km?: string, coordinate?: { latitude: number, longitude: number, latitudeDelta: number, longitudeDelta: number }, } }
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
    TransferJobScreen: { jobId: number }
    ReturnJobScreen: undefined
    DuplicateScreen?: { params?: any }
    CloseJobScreen: { params?: any }
    RouteScreen: undefined
    RouteChooseLocationDetailScreen: undefined
    RouteMapViewScreen: undefined
    CreateNewJobScreen: { type?: string }
    JobsScreen: undefined
    ReturnAndAddJobHistoryScreen: { type?: string }
    CustomJobListComponent: { type?: string },
    SelectFormScreen: undefined,
    FillFormScreen: undefined,
    SignBillDetailScreen: { type?: string, item?: any },
    AddNewJobScreen: undefined,
    UserListScreen: undefined,
    CreateUserScreen: undefined,
    UserDetailScreen: { userId: number, isEdit?: boolean }
    GroupListScreen: undefined,
    CreateGroupScreen: undefined,
    GroupDetailScreen: { screenName?: string, params: GroupData, isEdit?: boolean },
    CreateJobMapScreen: { screenName?: 'RouteChooseLocationDetailScreen' | 'CreateNewJobScreen' | 'AddNewJobScreen' | 'CreateNewJobScreen', isEditing?: boolean, jobLocation?: { latitude?: number, longitude?: number }, isButtonVisible?: boolean, isAddressPreview?: boolean }
    SearchScreen: { screenName?: string }
    AssignJobScreen: undefined,
    TransferJobListScreen: undefined
};

export type AuthStackParamList = {
    SignInScreen: undefined
}

export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
    RootStackParamList,
    RouteName
>;