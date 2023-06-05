import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Navigation from 'src/navigation';
import { colors } from 'src/theme/colors';
import { fonts } from 'theme/fonts';

export default function App() {
  const [fontsLoaded] = useFonts({
    [fonts.regular]:
      'https://fonts.cdnfonts.com/s/15011/CircularStd-Medium.woff',
    [fonts.bold]: 'https://fonts.cdnfonts.com/s/15011/CircularStd-Bold.woff',
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" style={styles.loading} />;
  }

  return (
    <ActionSheetProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.root}>
          <Navigation />
          <StatusBar />
        </SafeAreaView>
      </SafeAreaProvider>
    </ActionSheetProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    justifyContent: 'center',
    flex: 1,
  },
  root: {
    flex: 1,
    backgroundColor: colors.grey.background,
  },
});
