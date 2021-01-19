run:
	GOOS=darwin GOARCH=amd64 go build -o bin/go-npm-test_darwin_amd64
	GOOS=linux GOARCH=amd64 go build -o bin/go-npm-test_linux_amd64
	GOOS=windows GOARCH=amd64 go build -o bin/go-npm-test_windows_amd64

clean:
	rm bin/go-npm-test_darwin_amd64
	rm bin/go-npm-test_linux_amd64
	rm bin/go-npm-test_windows_amd64
