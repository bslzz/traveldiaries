module.exports = (mongoose) => {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('connected', () => {
    console.log('Connected to the DB');
  });

  db.on('error', (err) => {
    console.log(`Error connecting to the DB : ${err}`);
  });
};
