require 'rubygems'
require 'sinatra'

configure do
end

before do
  sleep 1
end

get '/' do
  erb :index
end

# returns an html list of famous french women
get '/french_women' do
  @women = ["Joan of Arc", "Marie Antoinette", "Coco Chanel", 
            "Brigitte Bardot", "Marie Curie"]
  erb :"_french_women"
end

# create a fake french woman
post '/create' do
  %Q{You submitted the french food "#{params["food"]["name"]}"}
end

