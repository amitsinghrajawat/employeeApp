import React,{ useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, FlatList,ActivityIndicator, Alert } from 'react-native'
import { Card, FAB } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'

const Home = ({navigation}) => {
    // const data = [
    //     {_id:"1",name:"Aniket",position:"web dev",email:"abc@abc.com",salary:"5 LPA",phone:"9887612345",image:"https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=335&q=80"},
    //     {_id:"2",name:"Amit",position:"app dev",email:"abc@abc.com",salary:"5 LPA",phone:"9887612345",image:"https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=335&q=80"},
    //     {_id:"3",name:"Sanskar",position:"android dev",email:"abc@abc.com",salary:"5 LPA",phone:"9887612345",image:"https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=335&q=80"},
    //     {_id:"4",name:"mahesh",position:"web dev",email:"abc@abc.com",salary:"5 LPA",phone:"9887612345",image:"https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=335&q=80"},
    //     {_id:"5",name:"mukesh",position:"web dev",email:"abc@abc.com",salary:"5 LPA",phone:"9887612345",image:"https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=335&q=80"},
    //     {_id:"6",name:"ramesh",position:"app dev",email:"abc@abc.com",salary:"5 LPA",phone:"9887612345",image:"https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=335&q=80"},
    //     {_id:"7",name:"suresh",position:"android dev",email:"abc@abc.com",salary:"5 LPA",phone:"9887612345",image:"https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=335&q=80"},
    // ]

    // const [data, setData] = useState([])
    // const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()

    const {data, loading} = useSelector((state)=>{
        return state
    }) 

    const fetchData = () => {
        fetch("https://employeeapp-backend.herokuapp.com/")
        .then(res=>res.json())
        .then(results=>{
            // setData(results)
            // setLoading(false)
            dispatch({type:"ADD_DATA",payload:results})
            dispatch({type:"SET_LOADING",payload:false})
        }).catch(err=>{
            Alert.alert("something went wrong")
        })
    }

    useEffect(() => {
        fetchData()
    }, [])


    const randerList = ((item)=>{
        return(
            <Card style={styles.mycard}  onPress={()=>navigation.navigate("Profile",{item})}>
                <View style={styles.cardview}>
                <Image
                style={{width:60,height:60,borderRadius:30}}
                source={{uri:item.image}}
                />
                <View style={{marginLeft:15}}>
                <Text style={styles.text}>{item.name}</Text>
                <Text >{item.position}</Text>
                </View>
                </View>
            </Card>
        )
    })
    return (
        <View style={{backgroundColor:"#191919",flex:1}}>
                       
            <FlatList 
                data={data}
                renderItem={({item})=>{
                    return randerList(item)
                }}
                keyExtractor={item=>item._id}
                onRefresh={()=>fetchData()}
                refreshing={loading}
            />
            
            <FAB
                style={styles.fab}
                small={false}
                icon="plus"
                // theme={{colors:{accent:"cyan"}}}
                onPress={()=>navigation.navigate("Create")}
            />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    mycard:{
        margin:5,
    },
    cardview:{
        flexDirection:"row",
        padding:6,
    },
    text:{
        fontSize:18,
        
    },
    fab:{
        position:"absolute",
        margin:16,
        right:0,
        bottom:0,
    }

});