import React,{ useState } from 'react'
import { View, Text, StyleSheet, Modal, Alert, KeyboardAvoidingView } from 'react-native'
import { Button, TextInput, } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const CreateEmployee = ({navigation,route}) => {

    // if (route.params) {
    //     console.log(route.params)
    // }

    const getDetails = (type)=>{
        if(route.params){
           switch(type){
               case "name":
                   return route.params.name
               case "phone":
                  return route.params.phone
               case "email":
                 return route.params.email
               case "salary":
                   return route.params.salary  
               case "image":
                   return  route.params.image
               case "position":
                 return  route.params.position  
           }
        }
        return ""
     }

    const [name, setName] = useState(getDetails("name"))
    const [phone, setPhone] = useState(getDetails("phone"))
    const [email, setEmail] = useState(getDetails("email"))
    const [salary, setSalary] = useState(getDetails("salary"))
    const [position, setPosition] = useState(getDetails("position"))
    const [image, setImage] = useState(getDetails("image"))
    const [modal, setModal] = useState(false)
    const [enableshift, setEnableshift] = useState(false)

    const updateDetails = () =>{

        fetch("https://employeeapp-backend.herokuapp.com/update",{
            method:"post",
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id:route.params._id,
                name,
                email,
                phone,
                salary,
                image,
                position
            })
        })
        .then(res=>res.json())
        .then(data=>{
            Alert.alert(`${data.name} is updated successfuly`)
            navigation.navigate("Home")
        })
        .catch(err=>{
          Alert.alert("someting went wrong")
      })
    }

    const submitData = ()=>{
        fetch("https://employeeapp-backend.herokuapp.com/send-data",{
            method:"post",
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name,
                position,
                email,
                phone,
                salary,
                image
            })
        })
        .then(res=>res.json())
        .then(data=>{
            Alert.alert(`${data.name} is saved successfuly.`)
            navigation.navigate("Home")
        })
        .catch(err=>{
            Alert.alert("something went wrong")
        })
  }


    const pickFromGallery = async ()=>{
        const {granted} =  await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(granted){
             let data =  await ImagePicker.launchImageLibraryAsync({
                  mediaTypes:ImagePicker.MediaTypeOptions.Images,
                  allowsEditing:true,
                  aspect:[1,1],
                  quality:0.5
              })
              if(!data.cancelled){
                  let newfile = { 
                    uri:data.uri,
                    type:`test/${data.uri.split(".")[1]}`,
                    name:`test.${data.uri.split(".")[1]}` 
                    
                }
                  _handleUpload(newfile)
              }
        }else{
           Alert.alert("you need to give up permission to work")
        }
     }

    const pickFromCamera = async () =>{
        const{granted} = await Permissions.askAsync(Permissions.CAMERA)
        if(granted){
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            })
            if(!data.cancelled){
                let newfile = { 
                    uri:data.uri,
                    type:`test/${data.uri.split(".")[1]}`,
                    name:`test.${data.uri.split(".")[1]}` 
                    }
                    _handleUpload(newfile)
                }
            // console.log(data)
        }else{
            Alert.alert("you need to give permission to work")
        }
    }

    const _handleUpload = (image)=>{
        const data = new FormData()
        data.append('file',image)
        data.append('upload_preset','employeeapp')
        data.append("cloud_name","amitsingh1122")

        fetch("https://api.cloudinary.com/v1_1/amitsingh1122/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json()).
        then(data=>{
            // console.log(data)
            setImage(data.url)
            setModal(false)
        }).catch(err=>{
            Alert.alert("error while upload")
        })
   }
   

    return (
        <KeyboardAvoidingView style={styles.root} enabled={enableshift} behavior="position">
        <View >
            <TextInput 
                label="Name"
                onFocus={()=>setEnableshift(true)}
                value={name}
                style={styles.inputStyle}
                mode="flat"
                onChangeText={text => setName(text)}
                theme={theme}
            />
            <TextInput 
                label="Email"
                onFocus={()=>setEnableshift(true)}
                value={email}
                style={styles.inputStyle}
                mode="flat"
                onChangeText={text => setEmail(text)}
                theme={theme}
            />
            <TextInput 
                label="Position"
                onFocus={()=>setEnableshift(true)}
                value={position}
                style={styles.inputStyle}
                mode="flat"
                onChangeText={text => setPosition(text)}
                theme={theme}
            />
            <TextInput 
                label="Phone"
                onFocus={()=>setEnableshift(true)}
                value={phone}
                style={styles.inputStyle}
                keyboardType="number-pad"
                mode="flat"
                onChangeText={text => setPhone(text)}
                theme={theme}
            />
            <TextInput 
                label="Salary"
                onFocus={()=>setEnableshift(true)}
                value={salary}
                style={styles.inputStyle}
                mode="flat"
                onChangeText={text => setSalary(text)}
                theme={theme}
            />
            <Button 
                icon={image==""?"upload":"check"} 
                style={styles.inputStyle} 
                mode="contained"  
                theme={theme} 
                onPress={()=>setModal(true)} 
                >
                Upload image
            </Button>
            {route.params?
            <Button 
                icon="content-save" 
                style={styles.inputStyle} 
                mode="contained"  
                theme={theme} 
                onPress={()=>updateDetails() } 
                >
                update details
            </Button>
            :
            <Button 
                icon="content-save" 
                style={styles.inputStyle} 
                mode="contained"  
                theme={theme} 
                onPress={()=>submitData() } 
                >
                save
            </Button>
            }
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
            >
                <View style={styles.modelView}>
                    <View style={styles.modelButtonView}>
                        <Button 
                            mode="contained" 
                            icon="camera"
                            theme={theme} 
                            onPress={()=>pickFromCamera() } >
                            camera
                        </Button>
                        <Button 
                            mode="contained" 
                            icon="image-area"
                            theme={theme} 
                            onPress={()=>pickFromGallery()} >
                            gallery
                        </Button>
                    </View>
                    <Button theme={theme} onPress={()=>setModal(false)} >
                        cancel
                    </Button>
                </View>
            </Modal>
        </View>
        </KeyboardAvoidingView>
    )
}

export default CreateEmployee
const theme = {
    colors:{
        primary:"cyan"
    }
}
const styles = StyleSheet.create({
    root : {
        flex:1,
        backgroundColor:"#191919",
        paddingTop:5
    },
    inputStyle : {
        margin:5
    },
    modelButtonView : {
        flexDirection:"row",
        justifyContent:"space-around",
        padding:10
    },
    modelView : {
        position:"absolute",
        bottom:2,
        width:"100%",
        backgroundColor:"#fff"
    }
});