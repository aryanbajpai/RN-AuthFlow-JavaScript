import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

export default function OrderSummary({ navigation }) {
  const [address, setAddress] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const handleAddress = async () => {
    navigation.navigate("Add Address");
  };

  const fetchAddressData = async () => {
    try {
      const storedAddress = await AsyncStorage.getItem("address");
      if (storedAddress) {
        setAddress(JSON.parse(storedAddress));
      } else {
        setAddress({});
      }
    } catch (error) {
      console.log("Failded to fetch Address Data.", error);
    }
  };

  const fetchCartData = async () => {
    try {
      const storedCartItems = await AsyncStorage.getItem("cartData");
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
    } catch (error) {
      console.log("Failed to fetch data.", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAddressData(); // Fetch address when the screen is focused
      fetchCartData();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.container}>
        {/*ADDRESS*/}
        <View
          style={{
            marginTop: 14,
            backgroundColor: "#312c51",
            paddingBottom: 16,
          }}
        >
          <View style={styles.addressContainer}>
            <Text style={{ color: "white", fontSize: 22, fontWeight: 600 }}>
              Deliver to:{" "}
            </Text>

            {address.length === 0 ? (
              <TouchableOpacity
                style={styles.addressBtn}
                onPress={handleAddress}
              >
                <Text style={styles.addressBtnText}>Add address</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.addressBtn}
                onPress={handleAddress}
              >
                <Text style={styles.addressBtnText}>Change</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={{ paddingHorizontal: 13 }}>
            <Text
              style={{
                fontWeight: "bold",
                color: "#f0c38e",
                fontSize: 22,
                marginBottom: 8,
              }}
            >
              {address.fullName}
            </Text>
            <Text style={styles.addressText}>{address.building},</Text>
            <Text style={styles.addressText}>{address.road},</Text>
            <Text style={[styles.addressText, { marginBottom: 8 }]}>
              {address.city} {address.pincode}
            </Text>
            <Text style={styles.addressText}>{address.phoneNo}</Text>
          </View>
        </View>

        {/*ITEMS*/}
        <View style={{ margin: 12 }}>
          {cartItems?.map((data, i) => (
            <View key={i} style={styles.itemCard}>
              <View>
                <Image
                  source={data.img}
                  style={{ width: 100, height: 120, marginBottom: 8 }}
                />
              </View>

              <View style={{ marginHorizontal: 14 }}>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                  {data.prdtName}
                </Text>
                <Text
                  style={{ fontSize: 21, fontWeight: 600, color: "#3f3f3f" }}
                >
                  ₹{data.price}{" "}
                  <Text
                    style={{
                      color: "green",
                      fontSize: 18,
                      fontStyle: "italic",
                    }}
                  >
                    ({data.discountPerc}% OFF)
                  </Text>
                </Text>

                <View style={styles.quantityContainer}>
                  <TouchableOpacity>
                    <Text style={styles.quanSymbol}>--</Text>
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.quanSymbol,
                      {
                        backgroundColor: "#dfdfdf",
                        paddingHorizontal: 10,
                        borderRadius: 20,
                      },
                    ]}
                  >
                    {quantity}
                  </Text>
                  <TouchableOpacity>
                    <Text style={styles.quanSymbol}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>


        {/*DONE */}
        <View style={styles.continueContainer}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>₹Price</Text>
          <TouchableOpacity
            style={[styles.addressBtn, { paddingHorizontal: 20 }]}
            onPress={handleAddress}
          >
            <Text
              style={[styles.addressBtnText, { color: "black", fontSize: 20 }]}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#48426d",
    position: 'relative'
  },
  topic: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#fff",
  },
  addressContainer: {
    backgroundColor: "#312c51",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addressBtn: {
    backgroundColor: "#f0c38e",
    padding: 7,
    borderRadius: 5,
  },
  addressBtnText: {
    color: "#48426d",
    fontWeight: "bold",
    fontSize: 18,
  },
  addressText: {
    color: "#fff",
    fontSize: 20,
  },
  itemCard: {
    backgroundColor: "#fff",
    marginVertical: 8,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 14,
    flexDirection: "row",
  },
  quantityContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "darkgray",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 10,
    paddingVertical: 7,
  },
  quanSymbol: {
    fontSize: 23,
    fontWeight: "bold",
  },
  continueContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 16,
    alignItems: "center",
    position: 'static',
    bottom: 0,
  },
});
