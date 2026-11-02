FROM ruby:3.2
WORKDIR /srv/jekyll
COPY Gemfile* ./
RUN bundle install --jobs 4 --retry 3
EXPOSE 1313 35729
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--port", "1313", "--livereload", "--force_polling", "--destination", "/tmp/_site"]
