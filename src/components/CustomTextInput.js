import { useState } from 'react';
import { Text, View, TextInput } from 'react-native';

const PRIMARY = '#6A1B9A';
const LIGHT_PURPLE = '#EFE7F5';

const CustomTextInput = ({
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
              color: '#222', // ✅ FIXED TEXT COLOR
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