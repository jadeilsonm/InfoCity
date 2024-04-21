import { FlatList, Pressable, StyleSheet, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import CardNameCity from "@/components/CardNameCity";

type Uf = {
  id: number;
  sigla: string;
  nome: string;
  regiao: Regiao;
};

type Mesorregiao = {
  id: number;
  nome: string;
  UF: Uf;
};

type Microrregiao = {
  id: number;
  nome: string;
  mesorregiao: Mesorregiao;
};

type Regiao = {
  id: number;
  sigla: string;
  nome: string;
};

type City = {
  nome: string;
  microrregiao: Microrregiao;
  id: number;
};

export default function TabTwoScreen() {
  const initialPage = 1;
  const [search, setSearch] = useState("");
  const [city, setCity] = useState([]);
  const [filteredCites, setFilteredCites] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/municipios")
      .then((response) => response.json())
      .then((data) => {
        setCity(data);
        setFilteredCites(data);
        setTotalPages(filteredCites.length / 10);
      });
  }, []);

  useEffect(() => {
    const filtered = city.filter((item: City) =>
      item.nome.toUpperCase().startsWith(search.toUpperCase())
    );
    setCurrentPage(initialPage);
    setFilteredCites(filtered);
    setTotalPages(filteredCites.length / 10);
  }, [city, search]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Municipios</Text>
      <View
        style={styles.containerInput}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'>
        <TextInput
          style={{ width: "90%", color: "#ffffff", fontWeight: "bold" }}
          value={search}
          onChangeText={setSearch}
          placeholder='Buscar por cidade:'
          placeholderTextColor='#fff'
        />
        <AntDesign name='search1' size={24} color='#ffffff' />
      </View>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <FlatList
        data={filteredCites.slice((currentPage - 1) * 10, currentPage * 10)}
        keyExtractor={(item: City, index) => index.toString()}
        style={{ width: "90%" }}
        renderItem={({ item, index }) => (
          <CardNameCity
            nome={item.nome}
            uf={item.microrregiao.mesorregiao.UF.sigla}
            id={item.id}
          />
        )}
      />
      <View
        style={styles.pagination}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'>
        <Pressable
          onPress={() =>
            setCurrentPage(
              currentPage > initialPage ? currentPage -1 : initialPage
            )
          }>
          <AntDesign name='caretleft' size={24} color='#EE6D00' />
        </Pressable>
        <Text style={{ fontSize: 18 }}>{currentPage}</Text>
        <Pressable
          onPress={() =>
            setCurrentPage(
              currentPage < totalPages ? currentPage + 1 : currentPage
            )
          }>
          <AntDesign name='caretright' size={24} color='#EE6D00' />
        </Pressable>
      </View>
    </View>
  );
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
    width: "90%",
    backgroundColor: "#333",
    borderRadius: 12,
    color: "#ffffff",
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
    marginTop: 55,
    fontWeight: "bold",
    color: "#EE6D00",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  pagination: {
    flex: 0,
    flexDirection: "row",
    width: "80%",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#000000",
    marginBottom: 40
  },
});
