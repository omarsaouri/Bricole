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
}) => {
  // const [text, setText] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  const handleTextChange = input => {
    setText(input);
    if (validationMessage) {
      validate(input);
    }
  };

  const validate = input => {
    const isValid = regex.test(input);
    if (!isValid || !input) {
      setValidationMessage(validationMsg);
      setAreFieldsValid(prevState => {
        const newState = [...prevState];
        newState[index] = false;
        return newState;
      });
    } else {
      setValidationMessage('');
      setAreFieldsValid(prevState => {
        const newState = [...prevState];
        newState[index] = true;
        return newState;
      });
    }
  };

  const handleEndEditing = () => {
    validate(text);
  };

  return (
    <View>
      <TextInput
        onChangeText={handleTextChange}
        onEndEditing={handleEndEditing}
        value={text}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={s`self-stretch border border-black p-3`}
      />
      <Text style={s`text-red-800`}>{validationMessage}</Text>
    </View>
  );
};

export default ValidationInput;
