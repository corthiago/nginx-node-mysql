const express = require('express')
const { Repository } = require('./repository')

const app = express()
const port = 3000

app.get('/', async (req, res) => {

  const people = await Repository.query('select * from people')

  const html = `
    <h1>Full Cycle Rocks!</h1>
    <ul>
      ${people.map(p => `<li>${p.name}</li>`).join('')}
    </ul>
  `;

  res.send(html);

})

app.listen(port, ()=>{

  console.log(`app running on port ${port}`)

  Repository.query(`create table if not exists people (id int not null auto_increment, name varchar(50), primary key (id))`)
  Repository.query(`insert into people(name) values('thiago'), ('mili'), ('ruppert'), ('gordurinha')`)

})