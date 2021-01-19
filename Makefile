build:
	make -j3 \
		build-darwin \
		build-linux \
		build-windows

build-darwin:
	GOOS=darwin GOARCH=amd64 go build "-ldflags=-s -w" -o bin/darwin-64 cmd/main.go

build-linux:
	GOOS=linux GOARCH=amd64 go build "-ldflags=-s -w" -o bin/linux-64 cmd/main.go

build-windows:
	GOOS=windows GOARCH=amd64 go build "-ldflags=-s -w" -o bin/windows-64.exe cmd/main.go

publish:
	npm publish

clean:
	rm bin/darwin-64
	rm bin/linux-64
	rm bin/windows-64.exe
