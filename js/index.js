
const colorPicker = document.getElementById('colorPicker')
const colorDisplay = document.getElementById('colorDisplay');

//inicializar red neuronal
const net = new brain.NeuralNetwork();

//entrenar red neuronal, dar ejemplos cuando el text
//debe ser blanco o negro de acuerdo al color del div colorDisplay

net.train([
  //si la entrada es negra, el texto debe ser blanco (salida 1)
  { input: {rojo: 0,verde: 0,azul: 0}, output: {color: 1}},

  //si la entrada es blanca, el texto debe ser negro (salida 0)
  {input: { rojo: 1, verde: 1, azul: 1 }, output: { color: 0}}
])

const updateColor = () => {
  colorDisplay.style.backgroundColor = colorPicker.value
  colorPicker.addEventListener('change', updateColor) 

  //Pasar a formato RGB 
  const colorString = colorPicker.value
  const rgbValues = colorString.match(/\d+/g);

  //tomar el color elegido por el usuario para que la red neuronal nos prodiga
  //cual es el mejor color de texto a usar

  const entrada = {
    rojo: parseInt(rgbValues[0]) / 255,
    verde: parseInt(rgbValues[1]) / 255,
    azul: parseInt(rgbValues[2]) / 255
  }
  
  const resultadoNeuronal = net.run(entrada)
  console.log("resultadoNeuronal", resultadoNeuronal)
  
  //Si el resultado es mayor que .5: cambia el color del texto a blanco

  if(resultadoNeuronal.color > .5) {
    colorDisplay.style.color = 'white' 
  } else {
    colorDisplay.style.color = 'black'
  }
}

updateColor();
