import { FlatList, Pressable, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import CardNameCity from '@/components/CardNameCity';

type Uf = {
  id: number;
  sigla: string;
  nome: string;
  regiao: Regiao;
}

type Mesorregiao = {
  id: number;
  nome: string;
  UF: Uf;
}

type Microrregiao = {
  id: number;
  nome: string;
  mesorregiao: Mesorregiao;
}

type Regiao = {
  id: number;
  sigla: string;
  nome: string;
}

type City = {
  nome: string;
  microrregiao: Microrregiao;
  id: number;
}

export default function TabTwoScreen() {
  const initialPage = 1;
  const [isLoading, setLoading] = useState(true);
  const [city, setCity] = useState([]);
  const [pages, setPages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState([0, 10]);


  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios')
      .then(response => response.json())
      .then(data => {
        setCity(data);
        setPages(data.slice(itemsPerPage[0], itemsPerPage[1]));
        setTotalPages(data.length / 10);
      });
    setLoading(false);
  }, []);

   return (<View style={styles.container}>
      <Text style={styles.title}>Municipios</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList
        data={city.slice((currentPage - 1) * 10, currentPage * 10)}
        keyExtractor={(item: City, index) => index.toString()}
        style={{width: '90%'}}
        renderItem={({item, index}) => (
          <CardNameCity nome={item.nome} uf={item.microrregiao.mesorregiao.UF.sigla} id={item.id} key={index} />
        )}
      />
      <View style={styles.pagination} lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
        <Pressable onPress={() => setCurrentPage(currentPage <= initialPage ? initialPage : currentPage - 1)}>
        <AntDesign name="caretleft" size={24} color="black" />
        </Pressable>
        <Text style={{fontSize: 20}}>{currentPage}</Text>
        <Pressable onPress={() => setCurrentPage(currentPage >= totalPages ? initialPage : currentPage + 1)}>
        <AntDesign name="caretright" size={24} color="black" />
        </Pressable>
      </View>
    </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    padding: 15,
    marginTop: 35,
    height: 55,
    width: "80%",
    backgroundColor: "#333333",
    borderRadius: 12,
    color: "#ffffff"
  },
  icon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    color: "#333",
    paddingVertical: 10,
    paddingRight: 10,
    fontSize: 16,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#EE6D00",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    padding: 15,
    marginTop: 35,
    width: "80%",
    alignItems: "center",
    backgroundColor: "#EE6D00",
    borderRadius: 12,
  },
  buttonDisabled: {
    backgroundColor: "#333333",
    borderRadius: 12,
  },
  textInput: {
    padding: 15,
    marginTop: 35,
    width: "80%",
    backgroundColor: "#333333",
    borderRadius: 12,
    color: "#ffffff",
  },
  pagination: {
    flex: 0,
    flexDirection: 'row',
    width: '90%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ce5050',
  }  
});
