const tf = require('@tensorflow/tfjs'); //?

async function neuralNetwork() {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [2], activation: 'tanh' }));
  model.compile({ loss: tf.losses.meanSquaredError, optimizer: 'sgd' });

  const x = tf.tensor([[0, 0], [0, 1], [1, 0], [1, 1]] );
  const y = tf.tensor([[0], [0], [0], [1]]); // operador ADN
  const z = tf.tensor([[0, 0], [0, 1], [1, 0], [1, 1]]) // z como entrada;

  let train = await model.fit(x, y, { epochs: 750 });
  console.log(`taxa de error: ${parseFloat(train.history.loss[0]).toFixed(4)}`);
  let output = model.predict(z).round();
  output.print(); //?
}

neuralNetwork();