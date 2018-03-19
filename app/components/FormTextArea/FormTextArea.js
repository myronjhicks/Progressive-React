import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { isEmpty } from '../utils/validate';
import styles from './styles';

class FormTextArea extends Component {
    
  render() {
    const { showLabel, placeholder, autoFocus, onChangeText, secureTextEntry } = this.props;

    return (
      <View style={styles.container}>
        {
          (showLabel) && <FormLabel>{this.props.label}</FormLabel>
        }
        <FormInput
          multiline={true}
          autoGrow
          maxHeight={40}
          autoCapitalize='none'
          clearButtonMode='while-editing'
          underlineColorAndroid={'#fff'}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          inputStyle={styles.inputContainer}
          value={this.props.value}/>
        {
          (!isEmpty(this.props.error)) &&
          <FormValidationMessage>
            {this.props.error}
          </FormValidationMessage>
        }
      </View>
    )
  }
}

FormTextArea.defaultProps = {
  autoFocus: false,
  secureTextEntry: false
}

export default FormTextArea;
