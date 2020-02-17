import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import * as routes from './routes';

const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/ping', function(req, res) {
  return res.send('pong');
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/api/events/:year/:month', routes.loadEvents);

app.post('/api/createEvent', routes.createEvent);

app.put('/api/editEvent', routes.editEvent);

app.delete('/api/delete/:eventDate/:eventId', routes.deleteEvent);


app.listen(process.env.PORT || 8080);
