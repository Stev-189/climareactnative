import React, {useState, useEffect} from 'react';
import {StyleSheet, View,TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import Clima from './componentes/Clima';
import Formulario from './componentes/Formulario';

const App = () => {

  const [busqueda, guardarBusdqueda]=useState({
    ciudad:'',
    pais:'',
  })

  const [consultar, guardarConsultar]= useState(false)
  const [resultado, guardarResultado]= useState({})
  const [bgcolor, guardarBgcolor]=useState('rgb(71,149,212)')

  const {pais, ciudad} = busqueda;

  const mostartAlerta=_=>{
    Alert.alert(
      'Error',
      'No hay Resultados',
      [{text: 'OK'}]
    )
  }

  
  useEffect(() => {
    const consultarClima= async()=>{
      if(consultar){
        const apiKey='cc25e71c7b991f6b01aef0d634bd4a60'
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`
        // console.log(url);
        try {
          const respuesta= await fetch(url);
          const resultado = await respuesta.json();
          // console.log(resultado);
          guardarResultado(resultado)
          guardarConsultar(false);
          
          //modifica color de fondo vasado en temperatura
          const kelvin = 273.15;
          const { main } = resultado;
          const actual = main.temp - kelvin;
          
          if(actual < 10) {
            guardarBgcolor('rgb( 105, 108, 149 )');
          } else if(actual >= 10 && actual < 25) {
            guardarBgcolor('rgb(71, 149, 212)');
          } else {
            guardarBgcolor('rgb( 178, 28, 61)');
          }
          
        } catch (error) {
          mostartAlerta()
        }
      }
    }
    consultarClima();
  }, [consultar])
  
  const ocultarTeclado=_=>Keyboard.dismiss()
  const bgcolorApp={
  backgroundColor: bgcolor
}
  
  return (
    <TouchableWithoutFeedback
    onPress={()=>ocultarTeclado()}
    >
      <View style={[styles.app, bgcolorApp]}>
        <View style={styles.contenido}>
          <Clima
            resultado={resultado}
          />
          <Formulario
            busqueda={busqueda}
            guardarBusdqueda={guardarBusdqueda}
            guardarConsultar={guardarConsultar}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  app:{
    flex:1,
    // backgroundColor:'rgb(71,149,212)',
    justifyContent: 'center'
  },
  contenido:{
    marginHorizontal:'2.5%'
  }
});

export default App;
