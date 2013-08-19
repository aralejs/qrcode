REPORTER = spec
url = tests/runner.html

install:
	rm -fr _theme
	git clone git://github.com/aralejs/nico-arale.git _theme
	./node_modules/.bin/nico build --theme _theme -C _theme/nico.js

test: install
	./node_modules/.bin/mocha-browser _site/tests/runner.html -S --reporter $(REPORTER)

test-cov:
	./node_modules/.bin/jscoverage src _site/src-cov
	./node_modules/.bin/mocha-browser _site/tests/runner.html?cov -S -R html-cov > coverage.html

coverage:
	@rm -fr _site/src-cov
	@jscoverage --encoding=utf8 src _site/src-cov
	@$(MAKE) test reporter=json-cov url=tests/runner.html?coverage=1 | node $(THEME)/html-cov.js > tests/coverage.html
	@echo "Build coverage to tests/coverage.html"


.PHONY: build-doc debug server publish clean test coverage

