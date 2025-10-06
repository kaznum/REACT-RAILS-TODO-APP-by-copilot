FROM ruby:3.2

RUN apt-get update -qq && \
    apt-get install -y build-essential libsqlite3-dev nodejs npm ca-certificates && \
    update-ca-certificates

WORKDIR /app

COPY Gemfile ./
RUN bundle install

COPY . .

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
