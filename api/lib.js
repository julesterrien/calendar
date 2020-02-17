import redisLib from 'async-redis';

const client = redisLib.createClient();

client.on('connect', function() {
  console.log('connected to redis');
});
 
client.on("error", function(error) {
  console.error('redis error', error);
});

export const redis = client;
