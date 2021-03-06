const tf = require('@tensorflow/tfjs'); //?

async function neuralNetwork() {
  let model = null;
  let taxa = 1;
  const x = tf.tensor([[0, 0], [0, 1], [1, 0], [1, 1]]);
  const y = tf.tensor([[0], [1], [1], [0]]); // operador OR
  const z = tf.tensor([[0, 0], [0, 1], [1, 0], [1, 1]]) // z como entrada;

  while (taxa > 0.1) {
    model = tf.sequential();
    model.add(tf.layers.dense({ units: 2, inputShape: [2], activation: 'tanh' }));
    model.add(tf.layers.dense({ units: 1, inputShape: [2], activation: 'sigmoid' }));
    model.compile({ loss: tf.losses.meanSquaredError, optimizer: tf.train.rmsprop(.05) });

    for (let i = 1; i <= 1000; i++) {
      let train = await model.fit(x, y);
      taxa = parseFloat(train.history.loss[0]).toFixed(4);
      if (i % 10 === 0) {
        console.log(`taxa de error: ${taxa}`);
      }
    }
  }
  let output = model.predict(z).round();
  output.print(); //?
}

neuralNetwork();