const Sequelize = require('sequelize');
const _conn = new Sequelize(process.env.DATABASE_URL);

const User = _conn.define('user', {
  name: Sequelize.STRING
});

const Page = _conn.define('page', {
  name: Sequelize.STRING,
  content: Sequelize.STRING
});

const Tag = _conn.define('tag', {
  name: Sequelize.STRING
});

Page.belongsTo(User);
User.hasMany(Page);

Page.belongsToMany(Tag, { through: 'pagesTags', foreignKey: 'pageId'});

Page.generatePageFromFormData = function(item) {
  const { title, username, tags, content } = item;
  return User.findOne({ where: { name: username }})
      .then(user => {
       if (user) {
         return user;
       }
       return User.create({ name: username });
      })
      .then(user => {
        return Page.create({ title: title });
      })
      .then(page => {
        return Promise.all(tags.split(' ').map(name => {
          return Tag.findOne({ where: { name }})
            .then(tag => {
              if(tag)
                return tag;
              return Tag.create({ name });
            })
        }))
      })
      .then(tags => {
        return page
      })
}

const sync = () => {
  return _conn.sync({ force: true })
}

const data = [
  {
    userName: 'moe',
    title: 'i love bitcoin',
    content: 'because...',
    tags: 'love bitcoin'
  },
  {
    userName: 'moe',
    title: 'i hate bitcoin',
    content: 'because...',
    tags: 'hate bitcoin'
  },
  {
    userName: 'larry',
    title: 'JavaScript is great',
    content: 'JavaScript is great cos...',
    tags: 'JavaScript grat'
  }
]

const seed = () => {
  return data.reduce((memo, item) => {
    return memo.then(() => Page.generatePageFromFormData(data[item]));
  }, Promise.resolve());
}

module.exports = {
  sync,
  models: {
    User,
    Page,
    Tag
  }
}
