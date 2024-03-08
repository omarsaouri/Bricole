import {View, Text, TextInput} from 'react-native';
import {useState} from 'react';
import {s} from 'react-native-wind';

const ValidationInput = ({
  text,
  setText,
  placeholder,
  regex,
  validationMsg,
  keyboardType,
  secureTextEntry,
  setAreFieldsValid,
  index,
  style,
  setIsFormValid,
}) => {
  const [validationMessage, setValidationMessage] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleTextChange = text => {
    setText(text);
    const isValidInput = regex.test(text);
    setIsFormValid(isValidInput);
    setIsValid(isValidInput);
    if (!isValidInput) setValidationMessage(validationMsg);
    else setValidationMessage('');
  };

  const validate = input => {
    setIsValid(regex.test(text));
  };

  return (
    <View>
      <TextInput
        onChangeText={handleTextChange}
        value={text}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={'#a28dbe'}
        style={
          isValid
            ? s`bg-foreground text-copy border-border border-2 p-3 pb-4 rounded-lg text-lg ${style}`
            : s`bg-foreground text-copy border-error border-2 p-3 pb-4 rounded-lg text-lg ${style}`
        }
      />
      <Text style={s`text-red-800 font-semibold text-justify p-1`}>
        {validationMessage}
      </Text>
    </View>
  );
};

export default ValidationInput;
