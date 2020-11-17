import React from 'react'
import { Image, StyleSheet, Text, View, Linking, Platform, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Button, Card, Title } from 'react-native-paper'
import { MaterialIcons, Entypo }  from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'

const Profile = (props) => {
    const {_id,name,email,phone,image,position,salary} = props.route.params.item

    const deleteEmployee = () => {

        fetch("https://employeeapp-backend.herokuapp.com/delete",{
            method:"post",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                id:_id
            })
        })
        .then(res=>res.json())
        .then(deletedEmp=>{
            Alert.alert(`${deletedEmp.name} deleted`)
            props.navigation.navigate("Home")
        })
        .catch(err=>{
            Alert.alert("something went wrong")
        })
    }

    const openDial = () =>{
        if(Platform.OS === "android"){
            Linking.openURL(`tel:${phone}`)
        }else{
            Linking.openURL(`telprompt:${phone}`)
        }
    }
    return (
        <View style={styles.root}>
            <LinearGradient 
                colors={["cyan","#6bc1ff"]}
                style={{height:"20%"}}
            />
            <View style={{alignItems:"center",marginTop:-50}}>
                <Image 
                    style={{height:140,width:140,borderRadius:70}}
                    source={{uri:image}}
                />
            </View>
            <View style={{alignItems:"center",margin:15}}>
                <Title style={{color:"#fff"}} >{name} </Title>
                <Text style={{color:"#fff",fontSize:15}} > {position} </Text>
            </View>
            <Card style={styles.mycard} onPress={()=>{
                Linking.openURL(`mailto:${email}`)
            }} >
                <View style={styles.cardContent}>
                    <MaterialIcons name="email" size={32} color="cyan" /> 
                <Text style={styles.mytext} > {email} </Text>
                </View>
            </Card>
            <Card style={styles.mycard} onPress={()=>openDial()} >
                <View style={styles.cardContent}>
                    <Entypo name="phone" size={32} color="cyan" /> 
                <Text style={styles.mytext} > {phone} </Text>
                </View>
            </Card>
            <Card style={styles.mycard} >
                <View style={styles.cardContent}>
                    <MaterialIcons name="attach-money" size={32} color="cyan" /> 
        <Text style={styles.mytext} > {salary}</Text>
                </View>
            </Card>
            <View style={{padding:5, flexDirection:"row", justifyContent:"space-around"}}>
                <Button 
                    icon="account-edit" 
                    mode="contained"
                    theme={theme} 
                    onPress={() => {
                        props.navigation.navigate("Create",
                        {_id,name,image,phone,salary,email,position}
                        ) 
                     }} >
                    edit
                </Button>
                <Button 
                    icon="delete" 
                    mode="contained"
                    theme={theme} 
                    onPress={()=>deleteEmployee()} >
                    fire employee
                </Button>
            </View>
        </View>
    )
}

export default Profile

const theme = {
    colors:{
        primary:"cyan"
    }
}

const styles = StyleSheet.create({
    root:{
        flex:1 ,
        backgroundColor:"#191919"
    },
    mytext:{
        fontSize:18,
        color:"#000",
        marginTop:3,
        marginLeft:5,
    },
    mycard:{
        margin:3
    },
    cardContent:{
        padding:8,
        flexDirection:"row"
    }
});
