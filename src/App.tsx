import './App.css'
import Text from './Components/Text'
// import Div from './Components/Div';

function App() {

  return (
    <>
      <div style={{
        display: 'grid',
        placeItems: 'center',
        width: '100vw',
        height: '250vh',
      }}>
        <Text type='random' content='Typing Test' duration={50} />
      </div>
    </>
  )
}

export default App
