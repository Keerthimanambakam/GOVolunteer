import { useState } from "react"
import { Modal } from "./Modal"
import { AnimatePresence } from "framer-motion";
function App() {
  const [value,setValue] = useState(false);
  const clickHandler = () => {
    setValue((prevValue) => !(prevValue))
  }
  const onClick = (val) => {
    setValue(val);
  }
  return (
    <>
    <div className="bg-blue-500 h-screen bg-opacity-30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center py-3">
          <button onClick={clickHandler} className="w-32 h-10 p-2 bg-green-500 hover:bg-green-200 rounded-xl ">Open Modal</button>
        </div>
      </div>
    </div>
    {console.log(value)}
    <AnimatePresence>
    {value && <Modal onClose={onClick}/>}
    </AnimatePresence>
    </>
  )
}

export default App
