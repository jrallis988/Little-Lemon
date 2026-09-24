module.exports = {
  Platform: { OS: 'ios', select: (o: Record<string, unknown>) => o.ios ?? o.default },
};
