import { AppRegistry, UIManager } from 'react-native';
import App from './src/app';

UIManager.setLayoutAnimationEnabledExperimental(true);
AppRegistry.registerComponent('reduxtest', () => App);
