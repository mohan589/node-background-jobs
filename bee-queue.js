const Queue = require('bee-queue');
const queue = new Queue('example');

const job = queue.createJob({x: 2, y: 3})
job.save();
job.on('succeeded', (result) => {
  console.log(`Received result for job ${job.id}: ${result}`);
  queue.removeJob(job.id)
  .then(() => console.log(`Job ${job.id} was removed`));
});

// Process jobs from as many servers or processes as you like
queue.process(function (job, done) {
  console.log(`Processing job ${job.id}`);
  return done(null, job.data.x + job.data.y);
});