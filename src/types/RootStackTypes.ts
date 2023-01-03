import { RouteProp } from "@react-navigation/native";
import { date } from "yup";
import { GroupData } from "../redux/slices/AdminSlice/groupListSlice";
import { JobDetailsData } from "../redux/slices/AdminSlice/jobListSlice";
import { NotificationObjectType } from "../redux/slices/AdminSlice/notificationSlice";

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
    MapScreen: { type: 'viewJob' | 'viewJobs', JobDetails?: { id?: number, image?: [string], created_at?: string, status?: string, button?: string, address?: string, description?: string, km?: string, coordinate?: { latitude: number, longitude: number, latitudeDelta: number, longitudeDelta: number }, } }
    IndoxScreen: undefined
    JobDuplicateListScreen: undefined
    NotificationScreen: undefined
    JobDetailsScreen: { params?: Partial<JobDetailsData> & Partial<NotificationObjectType>, type?: string }
    ReportGeneratorScreen: undefined
    BillListScreen: { billType?: string }
    BillCreateScreen: { screenName?: string }
    CreateBillSectionScreen: { type?: string, screenName?: string }
    BillSectionScreen: { id?: number, type: string, isEdit?: boolean }
    FormScreen: undefined
    ProfileScreen: undefined
    ResetPasswordScreen: undefined
    EditProfileScreen: undefined
    CreateFormScreen: undefined
    FormDetailsScreen: { id?: number, isEdit?: boolean }
    ChatScreen: undefined
    TransferJobScreen: { jobId: number }
    ReturnJobScreen: { jobId: number, status: string | undefined }
    DuplicateScreen?: { params?: number }
    CloseJobScreen: { params?: any }
    RouteScreen: undefined
    RouteChooseLocationDetailScreen: undefined
    RouteMapViewScreen: undefined
    CreateNewJobScreen: { type?: string, jobId?: number }
    JobsScreen: undefined
    ReturnAndAddJobHistoryScreen: { type?: string }
    CustomJobListComponent: { type?: string },
    SelectFormScreen: undefined,
    FillFormScreen: undefined,
    SignBillDetailScreen: { type?: string, item?: any, isCloseJob: boolean },
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