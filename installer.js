var fs = require("fs");
var os = require("os");
var path = require("path");
var CANONICAL_BINARY = "go-npm-test";
var knownWindowsPackages = {
    "win32 x64 LE": "windows-64.exe"
};
var knownUnixlikePackages = {
    "darwin x64 LE": "darwin-64",
    "darwin arm64 LE": "darwin-64",
    "linux x64 LE": "linux-64"
};
function createCanonicalBinary(binary) {
    var src = path.join(__dirname, "bin", binary);
    var dst = path.join(__dirname, "bin", CANONICAL_BINARY);
    fs.copyFileSync(src, dst);
    fs.chmodSync(dst, 493);
    for (var _i = 0, _a = ["darwin-64", "linux-64", "windows-64.exe"]; _i < _a.length; _i++) {
        var each = _a[_i];
        fs.rmSync(each);
    }
}
function run() {
    var platformKey = process.platform + " " + os.arch() + " " + os.endianness();
    var binary = knownUnixlikePackages[platformKey] || knownWindowsPackages[platformKey];
    if (!binary) {
        console.error("unsupported platform: " + platformKey);
        process.exit(1);
    }
    // prettier-ignore
    try {
        createCanonicalBinary(binary);
    }
    catch (err) {
        throw new Error("an unexpected error occurred: " +
            ((err && err.message) || err));
    }
}
run();
