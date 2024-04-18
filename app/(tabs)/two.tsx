import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import CardNameCity from '@/components/CardNameCity';

interface Uf {
  id: number;
  sigla: string;
  nome: string;
  regiao: Regiao;
}

interface Mesorregiao {
  id: number;
  nome: string;
  UF: Uf;
}

interface Microrregiao {
  id: number;
  nome: string;
  mesorregiao: Mesorregiao;
}

interface Regiao {
  id: number;
  sigla: string;
  nome: string;
}

interface City {
  nome: string;
  microrregiao: Microrregiao;
  id: number;
}

export default function TabTwoScreen() {
  const [isLoading, setLoading] = useState(true);
  const [city, setCity] = useState([]);
  const [pages, setPages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState([0, 10]);


  useEffect(() => {
    console.log('fetching data');
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios')
      .then(response => response.json())
      .then(data => {
        console.log(data[0]);
        setCity(data);
        setPages(data.slice(itemsPerPage[0], itemsPerPage[1]));
        setTotalPages(data[0].length / 10);
      });
    setLoading(false);
    console.log('data fetched');
  }, []);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setPages(city.slice(itemsPerPage[0] + 10, itemsPerPage[1] + 10));
      setItemsPerPage([itemsPerPage[0] + 10, itemsPerPage[0] + 10]);
    }
  }

   return ( <View style={styles.container}>
      { isLoading ?? <Text>Loading...</Text> }
      <Text style={styles.title}>Municipios</Text>
   
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      { pages.map((city: City, index) => {
        return <CardNameCity nome={city.nome} uf={city.microrregiao.mesorregiao.UF.sigla} key={city.id} />
      }) }
    </View>)

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
