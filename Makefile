VERSION = $(shell cat version.txt)

################################################################################

build-all:
	make -j4 \
		build-neutral \
		build-darwin \
		build-linux \
		build-windows

build-neutral:
	cd npm/go-npm-test && npm version --allow-same-version "$(VERSION)"

build-darwin:
	cd npm/go-npm-test-darwin-64 && npm version "$(VERSION)" --allow-same-version
	GOOS=darwin GOARCH=amd64 go build "-ldflags=-s -w" -o npm/go-npm-test-darwin-64/bin/go-npm-test cmd/main.go

build-linux:
	cd npm/go-npm-test-linux-64 && npm version "$(VERSION)" --allow-same-version
	GOOS=linux GOARCH=amd64 go build "-ldflags=-s -w" -o npm/go-npm-test-linux-64/bin/go-npm-test cmd/main.go

build-windows:
	cd npm/go-npm-test-windows-64 && npm version "$(VERSION)" --allow-same-version
	GOOS=windows GOARCH=amd64 go build "-ldflags=-s -w" -o npm/go-npm-test-windows-64/bin/go-npm-test.exe cmd/main.go

################################################################################

publish-neutral:
	cd npm/go-npm-test && npm publish --access public

publish-darwin:
	cd npm/go-npm-test-darwin-64 && npm publish --access public

publish-linux:
	cd npm/go-npm-test-linux-64 && npm publish --access public

publish-windows:
	cd npm/go-npm-test-windows-64 && npm publish --access public

################################################################################

clean:
	rm npm/go-npm-test-darwin-64/bin/go-npm-test
	rm npm/go-npm-test-linux-64/bin/go-npm-test
	rm npm/go-npm-test-windows-64/bin/go-npm-test.exe

################################################################################

publish-all:
	make -j4 \
		publish-neutral
		publish-darwin
		publish-linux
		publish-windows
