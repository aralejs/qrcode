REPORTER = spec

install:
	rm -fr _theme
	git clone git://github.com/aralejs/nico-arale.git _theme
	./node_modules/.bin/nico build --theme _theme -C _theme/nico.js

test: install
	./node_modules/.bin/mocha-browser _site/tests/runner.html -S --reporter $(REPORTER)

test-cov:
	./node_modules/.bin/jscoverage src _site/src-cov
	./node_modules/.bin/mocha-browser _site/tests/runner.html?cov -S -R html-cov > coverage.html

.PHONY: install test test-cov

