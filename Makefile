## Thanks to Nadim Kobeissi for such a revelation!!!

lint:
	@/bin/echo -n "[appyExpo] Linting ..."
	@node_modules/.bin/jshint --verbose --config .jshintrc \
		src/js/*.js
	@/bin/echo ""
