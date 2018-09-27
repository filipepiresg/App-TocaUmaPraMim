import React from 'react';
import { Modal } from 'react-native';
import { Spinner } from 'native-base';

const Loading = ({ loading=false, transparent = true  }) =>  (
    <Modal visible={loading} transparent={transparent}>
        <Spinner style={{flex:1, alignItems:'center', justifyContent:'center'}}/>
    </Modal>
);

export default Loading;