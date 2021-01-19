import fs from "fs"
import os from "os"
import path from "path"

const CANONICAL_BINARY = "go-npm-test"

const knownWindowsPackages: Record<string, string> = {
	"win32 x64 LE": "windows-64.exe",
}

const knownUnixlikePackages: Record<string, string> = {
	"darwin x64 LE": "darwin-64",
	"darwin arm64 LE": "darwin-64", // Forward to darwin-64
	"linux x64 LE": "linux-64",
}

function createCanonicalBinary(binary: string) {
	const src = path.join(__dirname, "bin", binary)
	const dst = path.join(__dirname, "bin", CANONICAL_BINARY)
	fs.copyFileSync(src, dst)
	fs.chmodSync(dst, 0o755)
}

function run() {
	const platformKey = `${process.platform} ${os.arch()} ${os.endianness()}`

	const binary = knownUnixlikePackages[platformKey] || knownWindowsPackages[platformKey]
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
