import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import {s} from 'react-native-wind';

const NewRequestModal = ({isModalVisible}) => {
  return (
    <Modal isVisible={isModalVisible}>
      <View style={s`flex-1 justify-center items-center bg-background`}>
        <Text>hiiiiii</Text>
      </View>
    </Modal>
  );
};

export default NewRequestModal;
