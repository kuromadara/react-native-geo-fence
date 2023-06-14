import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import ExampleScreen from './example';
import HomeScreen from './homeScreen'

const App = createStackNavigator(
  {
    ExampleScreen: {screen: ExampleScreen},
    HomeScreen: {screen: HomeScreen},
  }
);

export default createAppContainer(App);
// class App extends Component {
//   render() {
//     return <ExampleScreen />;
//   }
// }

// export default App;
