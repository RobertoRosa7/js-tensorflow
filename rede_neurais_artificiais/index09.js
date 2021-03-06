const tf = require('@tensorflow/tfjs');

const model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'softplus' }));
model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

const x = tf.tensor([1, 0], [2, 1]);
const y = tf.tensor([[0], [1]]);
const z = tf.tensor([1]) // z como entrada;

// epochs que pode ser considerado como back propagation
model.fit(x, y, { epochs: 750 }).then(() => {
  let output = model.predict(z);
  // output = Number(parseFloat(output).toFixed(0));
  // output = tf.tensor(output);
  output.print();
});

/*
A função de activação softplus coloca números negativos entre 0 e 1;
*/