import GifViewer from './components/GifGame'
import './App.css'

function RemixBtn(){

}
function ShowGifs(){
  return(
    <div>
        <GifViewer />
        <GifViewer/>
        <GifViewer/>
    </div>

  )};
function App() {

  return (
    <>
      <div>
        <ShowGifs/>
      </div>
    </>
  )
}

export default  App
