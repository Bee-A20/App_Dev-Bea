import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

interface CustomButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  label: string;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  containerStyle,
  label,
  textStyle,
  onPress,
  loading,
}) => {
  const { width, height } = Dimensions.get('window');

  return (
    <>
      {loading ? (
        <View style={{ height: 80, padding: 16 }}>
          <ActivityIndicator size={'large'} color={'blue'} />
        </View>
      ) : (
        <View style={containerStyle}>
          <TouchableOpacity onPress={onPress}>
            <View style={{ padding: width * 0.014 }}>
              <Text style={textStyle}>{label}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default CustomButton;
