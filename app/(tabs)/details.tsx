import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
      <Text style={styles.subtitle}>Detalhes</Text>
      <Text style={styles.paragrafo}>{details.MUNICIPIO}</Text>
      <Text style={styles.paragrafo}>{details.HISTORICO}</Text>
      <Text style={styles.paragrafo}>{details.HISTORICO_FONTE}</Text>
      <Text style={styles.paragrafo}>{details.FORMACAO_ADMINISTRATIVA}</Text>
      <Text style={styles.paragrafo}>{details.GENTILICO}</Text>
      <Text style={styles.paragrafo}>{details.ASSUNTOS}</Text>
      <Text style={styles.paragrafo}>{details.ANO}</Text>
      <Text style={styles.paragrafo}>{details.ESTADO}</Text>
      <Text style={styles.paragrafo}>{details.ESTADO1}</Text>
      <Text style={styles.paragrafo}>{details.JPG}</Text>
      <Text style={styles.paragrafo}>{details.MP3}</Text>
      <Text style={styles.paragrafo}>{details.NOTAS}</Text>
      <Text style={styles.paragrafo}>{details.REGISTRO}</Text>
      <Text style={styles.paragrafo}>{details.TIPO_MATERIAL}</Text>
      <Text style={styles.paragrafo}>{details.TITULO_UNIFORME}</Text>
      <Text style={styles.paragrafo}>{details.VISUALIZACAO}</Text>

    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
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
