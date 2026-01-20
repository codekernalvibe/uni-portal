import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import StudentDashboard from './StudentDashboard';
import GPACalculatorScreen from './GPACalculatorScreen';
import TimetableScreen from './TimetableScreen';
import ProfileScreen from './ProfileScreen';
import CourseMaterialsScreen from './CourseMaterialsScreen';
import NotificationsScreen from './NotificationsScreen';
import ChatScreen from './ChatScreen';
import TeacherDashboard from './TeacherDashboard';
import MarkAttendanceScreen from './MarkAttendanceScreen';
import AssignmentManagerScreen from './AssignmentManagerScreen';
import StudentListScreen from './StudentListScreen';
import ClassAnalyticsScreen from './ClassAnalyticsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false, animation: 'none' }}>
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
        <Stack.Screen name="GPACalculator" component={GPACalculatorScreen} />
        <Stack.Screen name="Timetable" component={TimetableScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="CourseMaterials" component={CourseMaterialsScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="TeacherDashboard" component={TeacherDashboard} />
        <Stack.Screen name="MarkAttendance" component={MarkAttendanceScreen} />
        <Stack.Screen name="AssignmentManager" component={AssignmentManagerScreen} />
        <Stack.Screen name="StudentList" component={StudentListScreen} />
        <Stack.Screen name="ClassAnalytics" component={ClassAnalyticsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
