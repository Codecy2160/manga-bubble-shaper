/*
 * Decompiled with Jsxer
 * Version: 1.4.0
 * JSXBIN 2.0
 */

#target photoshop;

function charCount(str) {
    if(str === undefined) return;
    var raw = str.replace(/[^\w\s\u2026]/gmi, "").replace(/(?<!\W)i(?<!\W)/gmi, "");
    var puncHalf = str.replace(/[\w\s]/gmi, "").replace(/[\u2026\?]/gmi, "");
    var puncFull = str.replace(/[^\u2026\?]/gmi, "");
    var noXBar = str.replace(/(?<!\S)i(?!\S)/gmi, "").replace(/[^i]/gmi, "");
    return raw.length + (puncHalf.length * 0.5) + puncFull.length + (noXBar.length * 0.5);
}

function shaper(array) {
    var split = array;
    var totalLen = 0;
    var extreme = 0;
    for(var i = 0; i < split.length; i++) if(split[i].length > extreme) extreme = split[i].length;
    for(var i = 0; i < split.length; i += 1) totalLen += split[i].length;
    var mean = totalLen / wordCount;
    var median = (split.length % 2) === 0 ? 0 : Math.floor(split.length / 2);
    var next = median > 0 ? median + 1 : split.length / 2;
    var prev = median > 0 ? median - 1 : (split.length / 2) - 1;
    var singleMedian = (wordCount % 2) === 1 ? true : false;
    var bounds = layer.height;
    var breakCount = 0;
    if(layer.kind === TextType.POINTTEXT) {
        var lines = layer.contents.split("\r");
        if(lines.length > 1) {
            for(var i = 0; i < split.length; i += 1) {
                if(charCount(lines[i]) > extreme) extreme = charCount(lines[i]);
                else {
                    var ext = (Math.pow(mean, 2) * Math.asin(wordCount / totalLen) * 2) + 1;
                    var reme = (Math.sqrt(mean) / Math.sqrt(totalLen)) * 3.14;
                    extreme = Math.round(ext + reme);
                }
            }
        }
        else {
            var ext = (Math.pow(mean, 2) * Math.asin(wordCount / totalLen) * 2) + 1;
            var reme = (Math.sqrt(mean) / Math.sqrt(totalLen)) * 3.14;
            extreme = Math.round(ext + reme);
        }
    } 
    else {
        if(layer.kind === TextType.PARAGRAPHTEXT) {
            activeDocument.activeLayer.name = "Kenzoku";
            var state = activeDocument.historyStates.length - 1;
            layer.kind = TextType.POINTTEXT;
            breakCount = layer.content.split("\r").length;
            try {
                activeDocument.activeHistoryState = activeDocument.historyStates[state];
                var parBreaks = layer.contents.indexOf("\r") !== -1 ? layer.contents.match(/[\r]/gmi).length : 0;
                layer.contents = "OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO";
                for(var i = 0; i <= parBreaks.length; i += 1) layer.contents += "\r O";
                layer.kind = TextType.POINTTEXT;
                var lines = layer.contents.split("\r");
                extreme = lines[0].length - 1;
                try {
                    activeDocument.activeHistoryState = activeDocument.historyStates[state];

                } 
                catch (error) {
                    alert("Failed to fallback prior history state!\nCheck for missing edits within the past 5 minutes.");
                }
                layer.kind = TextType.PARAGRAPHTEXT;
            } 
            catch (error) {
                alert("Failed to fallback prior history state!\nCheck for missing edits within the past 5 minutes.");
            }
        }
    } $.writeln("Max Line Length: ", extreme);
    if((singleMedian) && (split[median] !== undefined)) {
        while(true) {
            if((charCount(split[prev]) + charCount(split[median]) + charCount(split[next])) <= extreme) {
                var nextLine = "";
                var splitCopy = [];
                for(var j = 0; j < split.length; j += 1) splitCopy.push(split[j]);
                var comparator = split[next] + " " + split[next + 1];
                if((next + 1) <= (splitCopy.length - 1)) {
                    while(true) {
                        var mockNext = next;
                        if((charCount(splitCopy[mockNext]) + charCount(splitCopy[mockNext + 1])) <= charCount(comparator)) {
                            splitCopy[mockNext] += " " + splitCopy[mockNext + 1];
                            splitCopy.splice(mockNext + 1, 1);
                        } else {
                            nextLine = splitCopy[mockNext];
                            break;
                        }
                    }
                }
                if((nextLine !== "") && (charCount(split[prev - i]) > (extreme * 0.25))) {
                    if(((2.75 < (charCount(comparator) / charCount(nextLine))) || ((charCount(comparator) / charCount(nextLine)) < 0.75)) || (charCount(nextLine) <= (charCount(split[prev - i]) + 2))) {
                        break;
                    }
                }
                nextLine = "";
                splitCopy = [];
                for(var j = 0; j < split.length; j += 1) splitCopy.push(split[j]);
                comparator = split[prev - 1] + " " + split[prev];
                if((prev - 1) >= 0) {
                    while(true) {
                        var mockPrev = prev;
                        var mockMedian = median;
                        var mockNext = next;
                        if((charCount(splitCopy[mockPrev - 1]) + charCount(splitCopy[mockPrev])) <= charCount(comparator)) {
                            splitCopy[mockPrev - 1] += " " + splitCopy[mockPrev];
                            splitCopy.splice(mockPrev, 1);
                            mockMedian--;
                            mockPrev--;
                            mockNext--;
                        } else {
                            nextLine = splitCopy[mockPrev];
                            break;
                        }
                    }
                }
                if((nextLine !== "") && (charCount(split[prev - i]) > (extreme * 0.25))) {
                    if(((2.75 < (charCount(comparator) / charCount(nextLine))) || ((charCount(comparator) / charCount(nextLine)) < 0.75)) || (charCount(nextLine) <= (charCount(split[prev - i]) + 2))) {
                        break;
                    }
                }
                split[median] += " " + split[next];
                split.splice(next, 1);
                split[prev] += " " + split[median];
                split.splice(median, 1);
                median--;
                prev--;
                next--;
            } else if((((charCount(split[median]) + charCount(split[next])) <= extreme) && ((charCount(split[prev]) + charCount(split[median])) <= extreme)) && ((charCount(split[prev]) + charCount(split[prev - 1])) > extreme)) {
                var nextLine = "";
                var splitCopy = [];
                for(var j = 0; j < split.length; j += 1) splitCopy.push(split[j]);
                var comparator = split[prev - 1] + " " + split[prev];
                if((prev - 2) >= 0) {
                    while(true) {
                        var mockPrev = prev;
                        var mockMedian = median;
                        var mockNext = next;
                        if((charCount(splitCopy[mockPrev - 1]) + charCount(splitCopy[mockPrev])) <= charCount(comparator)) {
                            splitCopy[mockPrev - 1] += " " + splitCopy[mockPrev];
                            splitCopy.splice(mockPrev, 1);
                            mockMedian--;
                            mockPrev--;
                            mockNext--;
                        } else {
                            nextLine = splitCopy[mockPrev];
                            break;
                        }
                    }
                }
                if((nextLine !== "") && (charCount(split[prev - i]) > (extreme * 0.25))) {
                    if(((2.75 < (charCount(comparator) / charCount(nextLine))) || ((charCount(comparator) / charCount(nextLine)) < 0.75)) || (charCount(nextLine) <= (charCount(split[prev - i]) + 2))) {
                        break;
                    }
                }
                split[prev] += " " + split[median];
                split.splice(median, 1);
                median--;
                prev--;
                next--;
            } else if((charCount(split[median]) + charCount(split[next])) <= extreme) {
                var nextLine = "";
                var splitCopy = [];
                for(var j = 0; j < split.length; j += 1) splitCopy.push(split[j]);
                var comparator = split[next] + " " + split[next + 1];
                if((next + 1) <= (split.length - 1)) {
                    while(true) {
                        var mockNext = next;
                        if((charCount(splitCopy[mockNext]) + charCount(splitCopy[mockNext + 1])) <= charCount(comparator)) {
                            splitCopy[mockNext] += " " + splitCopy[mockNext + 1];
                            splitCopy.splice(mockNext + 1, 1);
                        } else {
                            nextLine = splitCopy[mockNext];
                            break;
                        }
                    }
                }
                if((nextLine !== "") && (charCount(split[prev - i]) > (extreme * 0.25))) {
                    if(((2.75 < (charCount(comparator) / charCount(nextLine))) || ((charCount(comparator) / charCount(nextLine)) < 0.75)) || (charCount(nextLine) <= (charCount(split[prev - i]) + 2))) {
                        break;
                    }
                }
                split[median] += " " + split[next];
                split.splice(next, 1);
            } else if((charCount(split[prev]) + charCount(split[median])) <= extreme) {
                var nextLine = "";
                var splitCopy = [];
                for(var j = 0; j < split.length; j += 1) splitCopy.push(split[j]);
                var comparator = split[prev - 1] + " " + split[prev];
                if((prev - 2) >= 0) {
                    while(true) {
                        var mockPrev = prev;
                        var mockMedian = median;
                        var mockNext = next;
                        if((charCount(splitCopy[mockPrev - 1]) + charCount(splitCopy[mockPrev])) <= charCount(comparator)) {
                            splitCopy[mockPrev - 1] += " " + splitCopy[mockPrev];
                            splitCopy.splice(mockPrev, 1);
                            mockMedian--;
                            mockPrev--;
                            mockNext--;
                        } else {
                            nextLine = splitCopy[mockPrev];
                            break;
                        }
                    }
                }
                if((nextLine !== "") && (charCount(split[prev - i]) > (extreme * 0.25))) {
                    if(((2.75 < (charCount(comparator) / charCount(nextLine))) || ((charCount(comparator) / charCount(nextLine)) < 0.75)) || (charCount(nextLine) <= (charCount(split[prev - i]) + 2))) {
                        break;
                    }
                }
                split[prev] += " " + split[median];
                split.splice(median, 1);
                median--;
                prev--;
                next--;
            } else {
                break;
            }
        }
    }
    var nextCycles = split.length - next;
    for(var i = 0; i < nextCycles; i += 1) {
        var nextExtreme = singleMedian ? charCount(split[median]) : extreme;
        if(((next + i) - 1) > (split.length - 1)) break;
        nextExtreme = i > 0 ? charCount(split[(next + i) - 1]) : nextExtreme;
        if((nextExtreme + 1) < extreme) nextExtreme++;
        while(true) {
            if(((next + i + 1) <= (split.length - 1)) && ((charCount(split[next + i]) + charCount(split[next + i + 1])) <= nextExtreme)) {
                var nextLine = "";
                var splitCopy = [];
                for(var j = 0; j < split.length; j += 1) splitCopy.push(split[j]);
                var comparator = split[next + i] + " " + split[next + i + 1];
                if(((next + i + 2) <= split.length) && (i > 0)) {
                    while(true) {
                        var mockNext = next;
                        if((charCount(splitCopy[mockNext + i + 1]) + charCount(splitCopy[mockNext + i + 2])) <= charCount(comparator)) {
                            splitCopy[mockNext + i + 1] += " " + splitCopy[mockNext + i + 2];
                            splitCopy.splice(mockNext + i + 2, 1);
                        } else {
                            nextLine = splitCopy[mockNext + i + 1];
                            break;
                        }
                    }
                }
                if((nextLine !== "") && (charCount(split[prev - i]) > (extreme * 0.25))) {
                    if(((2.75 < (charCount(comparator) / charCount(nextLine))) || ((charCount(comparator) / charCount(nextLine)) < 0.75)) || (charCount(nextLine) <= (charCount(split[prev - i]) + 2))) {
                        break;
                    }
                }
                split[next + i] += " " + split[next + i + 1];
                split.splice(next + i + 1, 1);
            } else break;
        }
    }
    var prevCycles = split.length - prev;
    for(var i = 0; i < prevCycles; i += 1) {
        var prevExtreme = singleMedian ? charCount(split[median]) : extreme;
        if(((prev - i) - 1) < 0) break;
        prevExtreme = i > 0 ? charCount(split[(prev - i) + 1]) : prevExtreme;
        if((prevExtreme + 1) < extreme) prevExtreme++;
        while(true) {
            if((((prev - i) - 1) >= 0) && ((charCount(split[prev - i]) + charCount(split[(prev - i) - 1])) <= prevExtreme)) {
                var nextLine = "";
                var splitCopy = [];
                for(var j = 0; j < split.length; j += 1) splitCopy.push(split[j]);
                var comparator = split[(prev - i) - 1] + " " + split[prev - i];
                if((((prev - i) - 2) >= 0) && (i > 0)) {
                    while(true) {
                        var mockPrev = prev;
                        if((charCount(splitCopy[(mockPrev - i) - 1]) + charCount(splitCopy[(mockPrev - i) - 2])) <= charCount(comparator)) {
                            splitCopy[(mockPrev - i) - 2] += " " + splitCopy[(mockPrev - i) - 1];
                            splitCopy.splice((mockPrev - i) - 1, 1);
                            mockPrev--;
                        } else {
                            nextLine = splitCopy[(mockPrev - i) - 2];
                            break;
                        }
                    }
                }
                if((nextLine !== "") && (charCount(split[prev - i]) > (extreme * 0.25))) {
                    if(((2.75 < (charCount(comparator) / charCount(nextLine))) || ((charCount(comparator) / charCount(nextLine)) < 0.75)) || (charCount(nextLine) <= (charCount(split[prev - i]) + 2))) {
                        break;
                    }
                }
                split[(prev - i) - 1] += " " + split[prev - i];
                split.splice(prev - i, 1);
                median--;
                prev--;
                next--;
            } else break;
        }
    }
    var lineCount = split.length;
    for(var i = 0; i < lineCount; i += 1) {
        try {
            var j = i + 1;
            var x = (lineCount - i) - 1;
            var y = x - 1;
            if(i === 0) {
                if(((charCount(split[j + 1]) + 2) >= (charCount(split[i]) + charCount(split[j]))) && ((charCount(split[i]) + charCount(split[j])) <= extreme)) {
                    split[i] += " " + split[j];
                    split.splice(j, 1);
                    median--;
                    prev--;
                    next--;
                }
            } else if(i === (lineCount - 1)) {
                if(((charCount(split[i - 1]) + 2) >= (charCount(split[i]) + charCount(split[j]))) && ((charCount(split[i]) + charCount(split[j])) <= extreme)) {
                    split[i] += " " + split[j];
                    split.splice(j, 1);
                    median--;
                    prev--;
                    next--;
                }
            } else {
                if((((charCount(split[i]) + charCount(split[j])) <= (charCount(split[i - 1]) + 2)) && ((charCount(split[j + 1]) + 2) >= (charCount(split[i]) + charCount(split[j])))) && ((charCount(split[i]) + charCount(split[j])) <= extreme)) {
                    split[i] += " " + split[j];
                    split.splice(j, 1);
                    median--;
                    prev--;
                    next--;
                    lineCount--;
                } else {
                    if(((charCount(split[i]) + charCount(split[j])) <= (charCount(split[x]) + 2)) && ((charCount(split[y]) + charCount(split[x])) <= extreme)) {
                        split[i] += " " + split[j];
                        split.splice(j, 1);
                        lineCount--;
                    }
                }
            }
        } catch (error) {
            continue;
        }
    }
    for(var i = 0; i < split.length; i += 1) {
        if(!split[i].startsWith(" ")) {
            if((split[i].endsWith("\u2026")) || (split[i].endsWith("..."))) {
                split[i] = " " + split[i];
            }
        }
    }
    if(layer.kind === TextType.PARAGRAPHTEXT) {
        if(split.length - 1 === breakCount) layer.height = bounds;
        else {
            var lineHeight = bounds / (breakCount + 1);
            var newBounds = lineHeight * split.length;
            layer.height = newBounds;
        }
    }
    $.writeln("Input:\n", split.join(''), "\n\nMax Line Length: ", extreme, "\n\nOutput:\n", split.join("\r").split("\r \r").join("\r"));
}
String.prototype.endsWith = (function(str) {
    return this.substring(this.length - str.length, this.length) === str;
});
String.prototype.startsWith = (function(str) {
    return this.substring(0, this.length) === str;
});
var layer = app.activeDocument.activeLayer.textItem;
var text = layer.contents.replace(/[^\S\n\r]+$/gmi, " ");
var toArray = text.split(/\s/);
var wordCount = toArray.length;
// layer.contents = shaper(toArray);
$.writeln(text, " ", toArray);
shaper(toArray);