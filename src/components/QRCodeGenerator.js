'use strict';
 
import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';
import { styles as s, wrap } from 'react-native-style-tachyons'

import {
    View
} from 'react-native';
 
class QRCodeGenerator extends Component { 
  render() {
    return (
      <View style={[s.bg_secondary, s.flx_i, s.aic, s.jcc]}>
        <QRCode
          value={this.props.userId}
          size={200}
          bgColor={s.primary.color}
          fgColor='white'/>
      </View>
    );
  };
}
export default QRCodeGenerator;