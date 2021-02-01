build:
	make -j3 \
		build-darwin \
		build-linux \
		build-windows

build-darwin:
	GOOS=darwin GOARCH=amd64 go build "-ldflags=-s -w" -o=bin/darwin-64 main.go

build-linux:
	GOOS=linux GOARCH=amd64 go build "-ldflags=-s -w" -o=bin/linux-64 main.go

build-windows:
	GOOS=windows GOARCH=amd64 go build "-ldflags=-s -w" -o=bin/windows-64.exe main.go

clean:
	rm -rf bin/

