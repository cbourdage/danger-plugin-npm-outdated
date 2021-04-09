"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = npmOutdated;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var exec = require("child_process").exec;

var formatOutdatedPackages = function formatOutdatedPackages() {
  var outdatedPackages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var packageNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var headers = ["| Package | Current | Wanted | latest |", "|---------|---------|--------|--------|"];
  var content = packageNames.map(function (packageName) {
    var _outdatedPackages$pac = outdatedPackages[packageName],
        current = _outdatedPackages$pac.current,
        wanted = _outdatedPackages$pac.wanted,
        latest = _outdatedPackages$pac.latest;
    return "| ".concat(packageName, " | ").concat(current, " | ").concat(wanted, " | ").concat(latest, " |");
  });
  return headers.concat(content).join("\n");
};

var execP = function execP(outdatedCommand) {
  return new Promise(function (resolve, reject) {
    var execOptions = {
      maxBuffer: 10 * 1024 * 1024
    };
    exec(outdatedCommand, execOptions, function (error, stdout, stderr) {
      if (stdout) {
        resolve(JSON.parse(stdout));
      }

      if (error !== null) {
        reject(error);
      }
    });
  });
};

function npmOutdated() {
  return _npmOutdated.apply(this, arguments);
}

function _npmOutdated() {
  _npmOutdated = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var options,
        exclude,
        outdatedCommand,
        outdatedPackages,
        packageNames,
        packagesTable,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
            exclude = options && options.exclude || [];

            if (!(exclude && !Array.isArray(exclude))) {
              _context.next = 4;
              break;
            }

            throw new TypeError('exclude option must be of type string[] containing package names to exclude');

          case 4:
            outdatedCommand = "npm outdated --json";
            _context.prev = 5;
            _context.next = 8;
            return execP(outdatedCommand);

          case 8:
            outdatedPackages = _context.sent;
            packageNames = Object.keys(outdatedPackages).filter(function (packageName) {
              return !exclude.includes(packageName);
            });

            if (packageNames.length) {
              packagesTable = formatOutdatedPackages(outdatedPackages, packageNames);
              warn("You have ".concat(packageNames.length, " outdated packages"));
              markdown("\n\n<details>\n    <summary>Outdated Packages</summary>\n\n".concat(packagesTable, "\n\n</details>\n\n\n    "));
            }

            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](5);
            fail("npm audit plugin error: " + error.message);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 13]]);
  }));
  return _npmOutdated.apply(this, arguments);
}