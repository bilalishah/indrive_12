import { Stack } from "expo-router";
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Drawer>
        <Drawer.Screen
      name="index"
      options={{
        title: 'index', headerStyle: {
          backgroundColor: 'green',
        }
      }}
    />
      <Drawer.Screen
          name="login"
          options={{
            title: 'login', headerStyle: {
              backgroundColor: 'green',
            }
          }}
        />
        <Drawer.Screen
          name="singin"
          options={{
            title: 'singin', headerStyle: {
              backgroundColor: 'green',
            }
          }}
        />

        {/* <Drawer.Screen
          name="index"
          options={{
            title: 'Home 2', headerStyle: {
              backgroundColor: 'green',
            }
          }}
        /> */}
      

      </Drawer>

    </GestureHandlerRootView>




  );
}
