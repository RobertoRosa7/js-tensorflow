const tf = require('@tensorflow/tfjs');
/*
A função de activação relu coloca números negativos em 0;
*/

const model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu' }));
model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

const x = tf.tensor([1, 0], [2, 1]);
const y = tf.tensor([[0], [1]]);
const z = tf.tensor([1]) // z como entrada;

// epochs que pode ser considerado como back propagation
model.fit(x, y, { epochs: 750 }).then(() => {
  let output = model.predict(z);
  output.print();
});