import { Provider } from 'react-redux';
import { mainStore } from './mainStore';
import './App.css';
import MainScreen from './statuses/components/MainScreen';

function App() {
  return (
    <Provider store={mainStore}>
      <MainScreen />
    </Provider>
  );
}

export default App;
