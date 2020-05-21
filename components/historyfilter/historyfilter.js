import React from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "./historyfilter-styles";
import {
  Button,
  Icon,
  DatePicker,
  Picker,
  Header,
  Right,
  Body,
  Left,
  Title,
} from "native-base";

function HistoryFilterComponent({
  filterShowHide,
  onShowHideFilters,
  onFromDateChange,
  onToDateChange,
  onUserIdChange,
}) {
  return (
    <View style={styles.filter}>
      <Text onPress={() => onShowHideFilters()}>Filter</Text>

      {filterShowHide === "hide" ? null : (
        <View
          style={{
            marginTop: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={styles.datePickerViewLeft}>
              <DatePicker
                style={styles.datePicker}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="from Date"
                textStyle={{ color: "#202945" }}
                placeHolderTextStyle={{
                  fontSize: 15,
                  color: "#202945",
                }}
                onDateChange={onFromDateChange}
                disabled={false}
              />
            </View>
            <View style={styles.datePickerViewRight}>
              <DatePicker
                style={styles.datePicker}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="To Date"
                textStyle={{ color: "#202945" }}
                placeHolderTextStyle={{
                  fontSize: 15,
                  color: "#202945",
                }}
                onDateChange={onToDateChange}
                disabled={false}
              />
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={styles.selectField}>
              <TextInput
                placeholder={"User Id"}
                placeholderTextColor="#202945"
                style={styles.input}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button style={styles.buttonStyle} onPress={() => {}}>
              <Text style={{ color: "#202945" }}>Filter</Text>
            </Button>
          </View>
        </View>
      )}
    </View>
  );
}
export { HistoryFilterComponent };
