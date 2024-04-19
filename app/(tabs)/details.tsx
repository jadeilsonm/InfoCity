import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';

type Details = { id: number }

type History = {
  REGISTRO: string;
  TIPO_MATERIAL: string;
  TITULO_UNIFORME: string;
  MUNICIPIO: string;
  ESTADO: string;
  ESTADO1: string;
  ANO: string;
  NOTAS: string;
  VISUALIZACAO: string;
  MP3: string
  JPG: string;
  ASSUNTOS: string;
  HISTORICO: string;
  HISTORICO_FONTE: string;
  FORMACAO_ADMINISTRATIVA: string;
  GENTILICO: string;
}
      
export default function TabDetails() {
  const router = useRoute();

  const [details, setDetails] = useState({} as History);

  useEffect(() => {
    const { id } = router.params as Details; 
    fetch(`https://servicodados.ibge.gov.br/api/v1/biblioteca?aspas=3&codmun=${id}`)
    .then(response => response.json())
    .then(data => {
      const result = Object.values(data)[0] as History;
      console.log(result);
      setDetails(result);
    });
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Detalhes</Text>
      <Text style={styles.paragrafo}>{details.HISTORICO}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  paragrafo: {
    fontSize: 12,
    
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    padding: 15,
    marginTop: 35,
    width: '80%',
    backgroundColor: '#ffffff',
  },
  buttonDisabled: {
    backgroundColor: '#5c1818',
  },
  textInput: {
    padding: 15,
    marginTop: 35,
    width: '80%',
    backgroundColor: '#3e3c3c',
  }
});
