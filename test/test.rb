require 'rubygems'
require 'sinatra'

configure do
  set :public, File.join(File.dirname(__FILE__), "..")
end

get '/' do
  erb :index
end

# returns an html list of famous french women
get '/french_women' do
  @women = ["Joan of Arc", "Marie Antoinette", "Coco Chanel", 
            "Brigitte Bardot", "Marie Curie"]
  sleep 1
  erb :"_french_women"
end

