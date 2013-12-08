module.exports = doto

function doto (target, steps, callback) {
  if (callback) {
    return doto.async(target, steps, callback);
  } else {
    return doto.sync(target, steps);
  }
}

doto.sync = function (target, steps) {
  for (var i = 0, len = steps.length; i < len; i++) {
    apply(steps[i], target);
  }
  return target;
}

doto.async = function (target, steps, done) {
  var i = 0;
  next();

  function next (err) {
    if (err) return done(err);
    var step = steps[i++]
    if (!step) done(null, err);
    else try {
      apply(step, target, next);
    } catch (err) {
      done(err);
    }
  }
}

function apply (step, target, next) {
  if (typeof step == 'function') {
    return next ? step(target, next) : step(target)
  } else {
    var args = step.slice(1)
    args.unshift(target)
    if (next) args.push(next)
    return step[0].apply(null, args)
  }
}
