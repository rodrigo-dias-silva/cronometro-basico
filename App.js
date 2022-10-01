import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function App() {
  const [number, setNumber] = useState('00:00:00');
  const [btn, setBtn] = useState('INICIAR');
  const [last, setLast] = useState(null);

  function start() {
    if (timer !== null) {
      //Aqui vai parar o timer
      clearInterval(timer);
      timer = null;
      setBtn('INICIAR');
    } else {
      //Começar o timer
      timer = setInterval(() => {
        ss++;

        if (ss == 60) {
          ss = 0;
          mm++;
        }

        if (mm == 60) {
          mm = 0;
          hh++;
        }

        let format =
          (hh < 10 ? '0' + hh : hh) + ':'
          + (mm < 10 ? '0' + mm : mm) + ':'
          + (ss < 10 ? '0' + ss : ss);

        setNumber(format);
      }, 10);

      setBtn('PARAR')
    }
  }

  function clear() {
    if (timer !== null) {
      //Parar o timer
      clearInterval(timer);
      timer = null;
    }

    setLast(number);

    setNumber('00:00:00');
    ss = 0;
    mm = 0;
    hh = 0;

    setBtn('INICIAR')
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Image
        source={require('./src/images/crono.png')}
      />

      <Text style={styles.timer}>
        {number}
      </Text>

      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={start}>
          <Text style={styles.textBtn}>
            {btn}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={clear}>
          <Text style={styles.textBtn}>
            LIMPAR
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lastArea}>
        <Text style={styles.lastText}>
          {last ? 'Ultimo tempo: ' + last : ''}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00aeef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: "#fff"
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 9,
    margin: 17
  },
  textBtn: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef'
  },
  lastArea: {
    marginTop: 40,
  },
  lastText: {
    fontSize: 23,
    color: '#fff',
    fontStyle: 'italic'
  }
});
