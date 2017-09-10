const express = require('express');
const app = express();
const path = require('path');

const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/my_db');

const User = conn.define('user', {
  name: conn.Sequelize.STRING
});

const Thing = conn.define('thing', {
  name: conn.Sequelize.STRING
});

const UserThing = conn.define('user_thing', {
});

UserThing.belongsTo(User);
UserThing.belongsTo(Thing);

User.hasMany(UserThing);
Thing.hasMany(UserThing);

conn.sync({ force: true })
  .then(()=> {
    return Promise.all([
      User.create({ name: 'moe' }),
      User.create({ name: 'larry' }),
      User.create({ name: 'curly' }),
      Thing.create({ name: 'foo' }),
      Thing.create({ name: 'bar' }),
      Thing.create({ name: 'bazz' }),
      User.create({ name: 'shep' }),
    ])
    .then(([moe, larry, curly, foo, bar, bazz])=> {
      return Promise.all([
        UserThing.create({ userId: moe.id, thingId: foo.id }),
        UserThing.create({ userId: moe.id, thingId: foo.id }),
        UserThing.create({ userId: moe.id, thingId: foo.id }),
        UserThing.create({ userId: larry.id, thingId: bar.id }),
        UserThing.create({ userId: larry.id, thingId: bazz.id }),
        UserThing.create({ userId: curly.id, thingId: bazz.id })
      ]);

    });
  })

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/users', (req, res, next)=> {
  User.findAll({
    include: [
      {
        model: UserThing,
        include: [ Thing, User ]
      }
    ]
  })
  .then( users => res.send(users))
  .catch(next);
});

app.get('/api/users/:id', (req, res, next)=> {
  User.findById(req.params.id, {
    include: [
      {
        model: UserThing,
        include: [ Thing, User ]
      }
    ]
  })
  .then( users => res.send(users))
  .catch(next);
});

app.get('/api/things', (req, res, next)=> {
  Thing.findAll({
    include: [
      {
        model: UserThing,
        include: [ User, Thing ]
      }
    ]
  })
  .then( users => res.send(users))
  .catch(next);
});

app.listen(process.env.PORT || 3000);
