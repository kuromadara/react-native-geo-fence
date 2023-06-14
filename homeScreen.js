import  React, {Component} from 'react';
import {View, Text} from 'react-native';

import Example from './example'


export default class homeScreen extends Component{
    render(){
        console.warn(Example.user)
        return(
            
            <View>
                <Text>
                    profile
                </Text>
            </View> 
        );
    }
}
// const Home = () => {
//     return(
//         <View>
//             <Text>
//                     profile
//             </Text>
//         </View>
//     )
// }
// export default Home