import React, {useState} from 'react'
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Animated,
  Alert,
} from 'react-native';
// import { Picker } from '@react-native-community/picker';
import {Picker} from '@react-native-picker/picker';


const Formulario = ({busqueda, guardarBusdqueda,guardarConsultar}) => {

  const {pais, ciudad} = busqueda;

  const [animacionBoton]=useState( new Animated.Value(1));

  const consultarClima=_=>{
    if(pais.trim()==='' || ciudad.trim()===''){
      mostartAlerta();
      return;
    }
    guardarConsultar(true);
  }

  const mostartAlerta=_=>{
    Alert.alert(
      'Error',
      'Agregar una ciudad y pais para la busqueda',
      [{text: 'Entendido'}]
    )
  }

  const animacionEntrada=_=>{
    Animated.spring(animacionBoton,{
      toValue:.75,//tamaño objeto
      useNativeDriver:true
    }).start();
  }

  const animacionSalida=_=>{
    Animated.spring(animacionBoton,{
      toValue:1,//tamaño objeto
      friction:4,//rebote
      tension:30,
      useNativeDriver:true
    }).start();
  }

  const estiloAnimacion={
    transform:[{scale:animacionBoton}]
  }

  return (
    <>
      <View style={styles.formulario}>
        <View>
          <TextInput
            value={ciudad}
            placeholder='Ciudad'
            placeholderTextColor='#666'
            onChangeText={ciudad=>guardarBusdqueda({...busqueda, ciudad})}
            style={styles.input}
          />
        </View>
        <View>
          <Picker
            selectedValue={pais}
            onValueChange={pais=>guardarBusdqueda({...busqueda, pais})}
            style={{height:120, backgroundColor:'#FFFFFF'}}
            itemStyle={{height:120, backgroundColor:'#FFFFFF'}}
          >
            <Picker.Item label='--Seleccione un pais--' value=''/>
            <Picker.Item label='Chile' value='CL'/>
            <Picker.Item label='UUEE' value='US'/>
            <Picker.Item label='Mexico' value='MX'/>
            <Picker.Item label='España' value='ES'/>
          </Picker>
        </View>
        <TouchableWithoutFeedback
          onPressIn={()=>animacionEntrada()}
          onPressOut={()=>animacionSalida()}
          onPress={()=>consultarClima()}
        >
          <Animated.View
            style={[styles.btnBuscar, estiloAnimacion]}
          >
            <Text style={styles.textoBuscar} >Buscar Clima</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  formulario:{
    marginTop: Platform.OS==='ios'? 50 : 10,
  },
  input:{
    backgroundColor:'#fff',
    fontSize:20,
    height:50,
    marginBottom:20,
    padding:10,
    textAlign:'center',
  },
  btnBuscar:{
    backgroundColor:'#000',
    justifyContent: 'center',
    marginTop:50,
    padding:10,
  },
  textoBuscar:{
    color:'#FFF',
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center',
    textTransform:'uppercase',
  },
})

export default Formulario
