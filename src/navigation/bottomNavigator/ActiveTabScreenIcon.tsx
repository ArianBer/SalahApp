import { View } from "react-native";
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  iconContainer: {
    width: 58,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 37,
    marginBottom: 7,
  },
  activeIconContainer: {
    backgroundColor: '#DBEA8D',
  },
});

const SetActiveTabScreenIcon = ({ focused, icon }: any) => {
  return (
    <View style={[styles.iconContainer, focused ? styles.activeIconContainer : {}]}>
      {icon}
    </View>
  );
};

export { SetActiveTabScreenIcon };