const Bull = require('bull')

const myFirstQueue = new Bull('my-first-queue');

const job = myFirstQueue.add({
  foo: 'bar'
});

myFirstQueue.process((job, done) => {
  console.log(job.data)
  done();
});

myFirstQueue.on('completed', async(job, result) => {
  console.log(`Job completed with result ${job.id} ${JSON.stringify(job.data)}`);
  await job.remove()
})