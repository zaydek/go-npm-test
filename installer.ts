const fs = require("fs")
const os = require("os")
const path = require("path")

const CANONICAL_BINARY = "go-npm-test"

const knownWindowsBinaries: Record<string, string> = {
	"win32 x64 LE": "windows-64.exe",
}

const knownUnixlikeBinaries: Record<string, string> = {
	"darwin x64 LE": "darwin-64",
	"darwin arm64 LE": "darwin-64", // Forward to darwin-64
	"linux x64 LE": "linux-64",
}

// Resolves absolute bin paths for a name.
function bin(name: string) {
	return path.join(__dirname, "bin", name)
}

function createCanonicalBinary(binary: string) {
	const src = bin(binary)
	const dst = bin(CANONICAL_BINARY)

	fs.copyFileSync(src, dst)
	fs.chmodSync(dst, 0o755)

	fs.rmSync(bin("darwin-64"))
	fs.rmSync(bin("linux-64"))
	fs.rmSync(bin("windows-64.exe"))
}

function run() {
	const platformKey = `${process.platform} ${os.arch()} ${os.endianness()}`

	const binary = knownUnixlikeBinaries[platformKey] || knownWindowsBinaries[platformKey]
	if (!binary) {
		console.error(`unsupported platform: ${platformKey}`)
		process.exit(1)
	}

	// prettier-ignore
	try {
		createCanonicalBinary(binary)
	} catch (err) {
		throw new Error("an unexpected error occurred: " +
      ((err && err.message) || err))
	}
}

run()
