import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

interface CustomTextInputProps {
  placeholder?: string;
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  value?: (val: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  secureTextEntry?: boolean;
}

const PRIMARY = '#6A1B9A';
const LIGHT_PURPLE = '#EFE7F5';

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  placeholder,
  label,
  labelStyle,
  value,
  containerStyle,
  textStyle,
  secureTextEntry,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[{ width: '100%' }, containerStyle]}>
      <Text
        style={[
          { marginBottom: 6, fontWeight: '600', color: PRIMARY },
          labelStyle,
        ]}
      >
        {label}
      </Text>

      <View
        style={{
          backgroundColor: LIGHT_PURPLE,
          borderRadius: 15,
          paddingHorizontal: 15,
          paddingVertical: 5,
          borderWidth: 2,
          borderColor: focused ? PRIMARY : 'transparent',
        }}
      >
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#999"
          onChangeText={value}
          secureTextEntry={secureTextEntry}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={[
            {
              color: '#222',
              fontSize: 16,
              paddingVertical: 10,
            },
            textStyle,
          ]}
        />
      </View>
    </View>
  );
};

export default CustomTextInput;
