import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@/components/Themed";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

type Details = { id: number };

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
  MP3: string;
  JPG: string;
  ASSUNTOS: string;
  HISTORICO: string;
  HISTORICO_FONTE: string;
  FORMACAO_ADMINISTRATIVA: string;
  GENTILICO: string;
};

type InformationCity = {
  id: number;
  res: Information;
};

type Information = {
  localidade: string;
  res: any;
  notas: any;
};

type Images = {
  LINK: string;
  CODIGO_MUNICIPIO: string;
  ID: string;
  TITULO: string;
  AUTOR: string;
  ANO: string;
};

export default function TabDetails() {
  const router = useRoute();
  const navigation = useNavigation();
  const [details, setDetails] = useState({} as History);
  const [informationCity, setInformationCity] = useState();
  const [images, setImages] = useState({} as string | undefined);

  useEffect(() => {
    const { id } = router.params as Details;
    fetch(
      `https://servicodados.ibge.gov.br/api/v1/biblioteca?aspas=3&codmun=${id}`
    )
      .then((response) => response.json())
      .then((data) => {
        const result = Object.values(data)[0] as History;
        setDetails(result);
      });
  }, [router]);

  useEffect(() => {
    const { id } = router.params as Details;
    fetch(
      `https://servicodados.ibge.gov.br/api/v1/pesquisas/indicadores/29170|97907|97911/resultados/${id}`
    )
      .then((response) => response.json())
      .then((data) => {
        const result = data;
        setInformationCity(result);
      });
  }, [router]);

  useEffect(() => {
    const { id } = router.params as Details;
    fetch(
      `https://servicodados.ibge.gov.br/api/v1/biblioteca?codmun=${id}&aspas=3&fotografias=1`
    )
      .then((response) => response.json())
      .catch((error) => {
        console.error("error: ", error);
        setImages(undefined);
      })
      .then((data) => {
        const result = data;
        var link: string | undefined;
        if (result !== undefined) {
          console.log("res", result);
          const firstObject = Object.values(result)[0] as Images;
          link =
            firstObject !== undefined
              ? `https://servicodados.ibge.gov.br/api/v1/resize/image?maxwidth=600&maxheight=600&caminho=biblioteca.ibge.gov.br/visualizacao/fotografias/GEBIS%20-%20RJ/${
                  firstObject["LINK"] as string
                }`
              : undefined;
        }
        setImages(link);
      })
      .catch((error) => {
        console.error("error: ", error);
        setImages(undefined);
      });
  }, [router]);

  const onClickBack = () => {
    setDetails({} as History);
    setImages(undefined);
    setInformationCity(undefined);
    // @ts-ignore
    navigation.navigate("two");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onClickBack}>
        <AntDesign name='back' size={24} color='#fafafa' />
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Detalhes</Text>
        <Text style={styles.subtitle}>{details.MUNICIPIO}</Text>
        {images != undefined ? (
          <>
            <Image
              style={styles.image}
              source={{
                uri: `${images}`,
              }}
            />
          </>
        ) : null}
        {informationCity != undefined ? (
          <>
            <Text style={styles.text}>
              Atual prefeito:{" "}
              {
                // @ts-ignore
                Object.values(informationCity[0].res as InformationCity)[0].res[
                  "2021"
                ] as string
              }
            </Text>
            <Text style={styles.text}>
              Numero de habitantes:{" "}
              {
                // @ts-ignore
                Object.values(informationCity[1].res as InformationCity)[0].res[
                  "2022"
                ] as string
              }
            </Text>
            <Text style={styles.text}>
              Densidade demográfica:{" "}
              {
                // @ts-ignore
                Object.values(informationCity[2].res as InformationCity)[0].res[
                  "2022"
                ] as string
              }
            </Text>
          </>
        ) : null}
        <Text style={styles.subtitle}>Historia</Text>
        <Text style={styles.paragraph}>{details.HISTORICO}</Text>
        <Text style={styles.paragraph}>Fonte: {details.HISTORICO_FONTE}</Text>
        <Text style={styles.textHistory}>Gentilico: {details.GENTILICO}</Text>
        <Text style={styles.textHistory}>{details.ESTADO}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    marginTop: 45,
    marginLeft: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "26%",
    alignItems: "center",
    borderRadius: 12,
    position: "absolute",
  },
  buttonText: {
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold",
  },
  image: {
    width: 350,
    height: 350,
    borderRadius: 0,
    marginBottom: 10,
    marginLeft: 10,
    alignItems: "center",
  },
  container: {
    flex: 1,
    paddingTop: 60,
  },
  scrollView: {
    backgroundColor: "#000000",
    marginHorizontal: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    color: "#EE6D00",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    textAlign: "center",
    marginTop: 18,
    marginBottom: 18,
  },
  paragraph: {
    fontSize: 12,
    marginTop: 13,
    fontWeight: "bold",
  },
  textHistory: {
    fontSize: 12,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: "bold",
  },
});
