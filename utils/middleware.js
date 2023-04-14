const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization');
  if( auth && auth.startsWith('Bearer '))
    req.token = auth.replace('Bearer ', '');
  else req.token = null;

  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformed id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).send({ error: error.message });
  }

  next(error);
};

module.exports = {
  tokenExtractor,
  unknownEndpoint,
  errorHandler
};