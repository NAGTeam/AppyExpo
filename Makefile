## Thanks to Nadim Kobeissi for such a revelation!!!

build:
	@/bin/echo "[expo2015] Installing dependencies ..."
	@bower install
	@/bin/echo ""

lint:
	@/bin/echo "[expo2015] Linting ..."
	@node_modules/.bin/jshint --verbose --config .jshintrc \
		src/js/*.js
	@/bin/echo ""
