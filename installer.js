const fs = require("fs")
const os = require("os")
const path = require("path")

const CANONICAL_BINARY = "go-npm-test"

const supported = {
	"darwin arm64 LE": "darwin-64", // Forward to darwin-64
	"darwin x64 LE": "darwin-64",
	"linux x64 LE": "linux-64",
	"win32 x64 LE": "windows-64.exe",
}

// Resolves to an absolute binary path.
function bin(name) {
	return path.join(__dirname, "bin", name)
}

function createCanonicalBinary(binary) {
	const src = bin(binary)
	const dst = bin(CANONICAL_BINARY)
	fs.copyFileSync(src, dst)
	fs.chmodSync(dst, 0o755)
}

function run() {
	const platformKey = `${process.platform} ${os.arch()} ${os.endianness()}`
	const binary = supported[platformKey]
	if (!binary) {
		throw new Error(`unsupported platform: ${platformKey}`)
	}
	try {
		createCanonicalBinary(binary)
	} catch (err) {
		throw new Error("an unexpected error occurred: " + err.message)
	}
}

run()
