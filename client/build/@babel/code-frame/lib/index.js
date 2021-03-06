"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.codeFrameColumns = codeFrameColumns;
exports.default = _default;

var _highlight = require("@babel/highlight");

var deprecationWarningShown = false;

function getDefs(chalk) {
  return {
    gutter: chalk.grey,
    marker: chalk.red.bold,
    message: chalk.red.bold
  };
}

var NEWLINE = /\r\n|[\n\r\u2028\u2029]/;

function getMarkerLines(loc, source, opts) {
  var startLoc = Object.assign({
    column: 0,
    line: -1
  }, loc.start);
  var endLoc = Object.assign({}, startLoc, loc.end);

  var _ref = opts || {},
      _ref$linesAbove = _ref.linesAbove,
      linesAbove = _ref$linesAbove === undefined ? 2 : _ref$linesAbove,
      _ref$linesBelow = _ref.linesBelow,
      linesBelow = _ref$linesBelow === undefined ? 3 : _ref$linesBelow;

  var startLine = startLoc.line;
  var startColumn = startLoc.column;
  var endLine = endLoc.line;
  var endColumn = endLoc.column;
  var start = Math.max(startLine - (linesAbove + 1), 0);
  var end = Math.min(source.length, endLine + linesBelow);

  if (startLine === -1) {
    start = 0;
  }

  if (endLine === -1) {
    end = source.length;
  }

  var lineDiff = endLine - startLine;
  var markerLines = {};

  if (lineDiff) {
    for (var i = 0; i <= lineDiff; i++) {
      var lineNumber = i + startLine;

      if (!startColumn) {
        markerLines[lineNumber] = true;
      } else if (i === 0) {
        var sourceLength = source[lineNumber - 1].length;
        markerLines[lineNumber] = [startColumn, sourceLength - startColumn + 1];
      } else if (i === lineDiff) {
        markerLines[lineNumber] = [0, endColumn];
      } else {
        var _sourceLength = source[lineNumber - i].length;
        markerLines[lineNumber] = [0, _sourceLength];
      }
    }
  } else {
    if (startColumn === endColumn) {
      if (startColumn) {
        markerLines[startLine] = [startColumn, 0];
      } else {
        markerLines[startLine] = true;
      }
    } else {
      markerLines[startLine] = [startColumn, endColumn - startColumn];
    }
  }

  return {
    start: start,
    end: end,
    markerLines: markerLines
  };
}

function codeFrameColumns(rawLines, loc) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var highlighted = (opts.highlightCode || opts.forceColor) && (0, _highlight.shouldHighlight)(opts);
  var chalk = (0, _highlight.getChalk)(opts);
  var defs = getDefs(chalk);

  var maybeHighlight = function maybeHighlight(chalkFn, string) {
    return highlighted ? chalkFn(string) : string;
  };

  var lines = rawLines.split(NEWLINE);

  var _getMarkerLines = getMarkerLines(loc, lines, opts),
      start = _getMarkerLines.start,
      end = _getMarkerLines.end,
      markerLines = _getMarkerLines.markerLines;

  var hasColumns = loc.start && typeof loc.start.column === "number";
  var numberMaxWidth = String(end).length;
  var highlightedLines = highlighted ? (0, _highlight.default)(rawLines, opts) : rawLines;
  var frame = highlightedLines.split(NEWLINE).slice(start, end).map(function (line, index) {
    var number = start + 1 + index;
    var paddedNumber = (" " + number).slice(-numberMaxWidth);
    var gutter = " " + paddedNumber + " |";
    var hasMarker = markerLines[number];
    var lastMarkerLine = !markerLines[number + 1];

    if (hasMarker) {
      var markerLine = "";

      if (Array.isArray(hasMarker)) {
        var markerSpacing = line.slice(0, Math.max(hasMarker[0] - 1, 0)).replace(/[^\t]/g, " ");
        var numberOfMarkers = hasMarker[1] || 1;
        markerLine = ["\n ", maybeHighlight(defs.gutter, gutter.replace(/\d/g, " ")), " ", markerSpacing, maybeHighlight(defs.marker, "^").repeat(numberOfMarkers)].join("");

        if (lastMarkerLine && opts.message) {
          markerLine += " " + maybeHighlight(defs.message, opts.message);
        }
      }

      return [maybeHighlight(defs.marker, ">"), maybeHighlight(defs.gutter, gutter), line.length > 0 ? " " + line : "", markerLine].join("");
    } else {
      return " " + maybeHighlight(defs.gutter, gutter) + (line.length > 0 ? " " + line : "");
    }
  }).join("\n");

  if (opts.message && !hasColumns) {
    frame = "" + " ".repeat(numberMaxWidth + 1) + opts.message + "\n" + frame;
  }

  if (highlighted) {
    return chalk.reset(frame);
  } else {
    return frame;
  }
}

function _default(rawLines, lineNumber, colNumber) {
  var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (!deprecationWarningShown) {
    deprecationWarningShown = true;
    var message = "Passing lineNumber and colNumber is deprecated to @babel/code-frame. Please use `codeFrameColumns`.";

    if (process.emitWarning) {
      process.emitWarning(message, "DeprecationWarning");
    } else {
      var deprecationError = new Error(message);
      deprecationError.name = "DeprecationWarning";
      console.warn(new Error(message));
    }
  }

  colNumber = Math.max(colNumber, 0);
  var location = {
    start: {
      column: colNumber,
      line: lineNumber
    }
  };
  return codeFrameColumns(rawLines, location, opts);
}