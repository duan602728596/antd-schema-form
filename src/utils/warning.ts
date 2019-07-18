if (process.env.NODE_ENV === 'development') {
  module.exports = function(msg: string): void {
    console.error(msg);
  };
} else {
  module.exports = (msg: string): void => undefined;
}